import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useCart, CartItemI } from '../context/CartContext';
import CartItem from '../components/navigation/CartItem';
import DeleteConfirmModal from '../components/navigation/DeleteConfirmModal';
import ToastSuccess from '../components/navigation/ToastSuccess';
import OutOfStockModal from '../components/navigation/OutOfStockModal';
import CartHeader from '../components/headers/HeaderCart';

const CartScreen: React.FC = () => {
  const { items, removeSelected } = useCart();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [showOutOfStock, setShowOutOfStock] = React.useState(false);

  // const hasChecked = items.some((item) => item.checked);

  const selectedItems = items.filter(item => item.checked);
  const totalAmount = selectedItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);


  const grouped = items.reduce((acc, item) => {
    if (!acc[item.brand_id]) acc[item.brand_id] = { brand: item.brand, items: [] };
    acc[item.brand_id].items.push(item);
    return acc;
  }, {} as Record<string, { brand: string; items: CartItemI[] }>);

  const handleConfirmDelete = () => {
    removeSelected();
    setModalVisible(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (items.length === 0) {
    return (
        <View style={{ flex: 1 }}>
            <CartHeader />
            <View style={styles.containerEmpty}>
                <Image
                source={require('../assets/images/cart_large.png')}
                style={styles.cartImage}
                resizeMode="contain"
                />
                <Text style={styles.emptyText}>Giỏ hàng của bạn còn trống</Text>

                <LinearGradient
                colors={['rgba(244, 35, 132, 1)', 'rgba(241, 33, 90, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                >
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>MUA NGAY</Text>
                </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Header có callback xoá */}
      <CartHeader onDeletePress={() => setModalVisible(true)} />

      {/* Toast ✅ */}
      {showToast && <ToastSuccess message="Xoá thành công" />}

      {/* Confirm Modal ✅ */}
      <DeleteConfirmModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* Nội dung cart */}
      <ScrollView style={styles.container}>
        {Object.entries(grouped).map(([brand, group]) => (
          <View key={brand} style={styles.group}>
            <View style={styles.brandRow}>
              <Image
                source={require('../assets/images/store.png')}
                style={styles.brandIcon}
              />
              <Text style={styles.brand}>{group.brand}</Text>
            </View>
            {group.items.map((item) => (
              <CartItem key={item.id} item={item} onOutOfStock={() => setShowOutOfStock(true)} />

            ))}
          </View>
        ))}
      </ScrollView>
      {selectedItems.length > 0 && (
  <View style={styles.footer}>
    <Text style={styles.totalText}>
      Tổng thanh toán: <Text style={styles.totalAmount}>đ{totalAmount.toLocaleString()}</Text>
    </Text>
    <TouchableOpacity style={styles.buyButton}>
      <Text style={styles.buyText}>Mua hàng ({selectedItems.length})</Text>
    </TouchableOpacity>
  </View>
)}

      <OutOfStockModal visible={showOutOfStock} onClose={() => setShowOutOfStock(false)} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    marginTop: 15,
  },
  containerEmpty: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  group: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  brandIcon: {
    width: 16,
    height: 16,
    tintColor: '#f4436c',
    marginRight: 4,
  },
  brand: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#f4436c',
  },
  cartImage: {
    marginTop: 80,
    width: 100,
    height: 100,
    tintColor: '#f4436c',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 14,
    color: '#323232',
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  totalText: {
    fontSize: 14,
    color: '#333',
  },
  totalAmount: {
    color: '#f4436c',
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#f4436c',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
});

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import OutOfStockModal from './OutOfStockModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToCart } from '../apis/Cart';
import { useCart } from '../context/CartContext';

type Product = {
  id: string;
  image: string;
  name: string;
  price: number;
  discountPrice?: number;
  stock: number;
  options: { category: string; values: string[] }[];
};

type Props = {
  visible: boolean;
  onClose: () => void;
  product: Product;
  onAddToCart: (item: {
    productId: string;
    option: { category: string; value: string }[];
    quantity: number;
  }) => void;
};

const AddToCartModal: React.FC<Props> = ({ visible, onClose, product, onAddToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<{ [category: string]: string }>({});
  const [showStockModal, setShowStockModal] = useState(false);
  const { reloadCart } = useCart(); 

  const isReadyToAdd = product.options.every(
    (group) => selectedOptions[group.category]
  );

  const handleAddToCart = async () => {
    const selectedAttributes = Object.entries(selectedOptions).map(([category, value]) => ({
      category,
      value,
    }));

    try {
        const userJson = await AsyncStorage.getItem('user');
        const user = userJson ? JSON.parse(userJson) : null;
    
        if (!user || !user._id) throw new Error('Bạn chưa đăng nhập');

        console.log('Dữ liệu gửi lên BE:', {
            userId: user._id,
            product_id: product.id,
            quantity,
            selectedAttributes,
          });

      const response = await addToCart( user._id, product.id, quantity, selectedAttributes);
      ToastAndroid.show('Đã thêm vào giỏ hàng!', ToastAndroid.SHORT);
      onClose();
      setSelectedOptions({});
      setQuantity(1);
    //   reloadCart();
    } catch (err: any) {
      console.error('Thêm giỏ hàng thất bại:', err);
      Alert.alert('Lỗi', err?.response?.data?.message || 'Không thể thêm vào giỏ hàng');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.price}>
                ₫{(product.discountPrice ?? product.price).toLocaleString()}
              </Text>
              {product.discountPrice && (
                <Text style={styles.oldPrice}>₫{product.price.toLocaleString()}</Text>
              )}
              <Text style={styles.stock}>Kho: {product.stock}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                onClose();
                setSelectedOptions({});
                setQuantity(1);
              }}
            >
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Options */}
          <Text style={styles.labelType}>Phân loại</Text>
          {product.options.map((group) => (
            <View key={group.category}>
              <Text style={[styles.label]}>{group.category}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionWrap}>
                {group.values.map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    style={[
                      styles.option,
                      selectedOptions[group.category] === opt && styles.optionSelected,
                    ]}
                    onPress={() =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [group.category]: opt,
                      }))
                    }
                  >
                    <Text>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}

          {/* Quantity */}
          <View style={styles.quantityRow}>
            <Text style={styles.label}>Số lượng</Text>
            <View style={styles.qtyBox}>
              <TouchableOpacity onPress={() => setQuantity((q) => Math.max(1, q - 1))}>
                <Text style={styles.qtyBtn}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qty}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  if (quantity < product.stock) {
                    setQuantity(quantity + 1);
                  } else {
                    setShowStockModal(true);
                  }
                }}
              >
                <Text style={styles.qtyBtn}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add button */}
          <TouchableOpacity
            onPress={handleAddToCart}
            disabled={!isReadyToAdd}
            style={[
              styles.addButton,
              !isReadyToAdd && { backgroundColor: '#ccc' },
            ]}
          >
            <Text style={styles.addButtonText}>Thêm vào Giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal cảnh báo hết hàng */}
      <OutOfStockModal
        visible={showStockModal}
        onClose={() => setShowStockModal(false)}
        stock={product.stock}
      />
    </Modal>
  );
};

export default AddToCartModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { width: 80, height: 80, borderRadius: 10 },
  info: { flex: 1, marginLeft: 10 },
  price: { fontSize: 18, color: 'red', fontWeight: 'bold' },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    fontSize: 14,
    marginTop: 4,
  },
  stock: { fontSize: 12, color: '#666', marginTop: 4 },
  close: { fontSize: 18, padding: 8 },
  optionWrap: { marginVertical: 4 },
  quantityRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    fontSize: 20,
    backgroundColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  qty: { marginHorizontal: 12, fontSize: 16 },
  warning: { color: 'red', marginTop: 8, fontSize: 12 },
  addButton: {
    marginTop: 20,
    backgroundColor: '#f50057',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  optionSelected: {
    backgroundColor: '#FF90B3',
    borderColor: '#FF90B3',
  },
  labelType: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 16,
  },
  label: {
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 4,
  },
});

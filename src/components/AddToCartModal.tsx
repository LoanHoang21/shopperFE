import React, { useEffect, useState } from 'react';
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
  variants: {
    attributes: { category: string; value: string }[];
    price: number;
    quantity: number;
    discount: number;
    sale_quantity: number;
    image: string;
    _id: string;
    attribution_ids: string[]
  }[];
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
  const [outOfStock, setoutOfStock] = useState(false);
  const [existingCartItemQty , setExistingCartItemQty ] = useState(0);
  const { reloadCart, items } = useCart(); 

  const isReadyToAdd = product.options.every(
    (group) => selectedOptions[group.category]
  );

  const handleAddToCart = async () => {
    try {
        const userJson = await AsyncStorage.getItem('user');
        const user = userJson ? JSON.parse(userJson) : null;
    
        if (!user || !user._id) throw new Error('Bạn chưa đăng nhập');

        console.log('Dữ liệu gửi lên BE:', {
            userId: user._id,
            product_id: product.id,
            quantity,
            variantId: selectedVariant?._id,
          });

      const response = await addToCart( user._id, product.id, quantity, selectedVariant?._id);
      ToastAndroid.show('Đã thêm vào giỏ hàng!', ToastAndroid.SHORT);
      onClose();
      setSelectedOptions({});
      setQuantity(1);
      setoutOfStock(false)
    } catch (err: any) {
      console.error('Thêm giỏ hàng thất bại:', err);
      Alert.alert('Lỗi', err?.response?.data?.message || 'Không thể thêm vào giỏ hàng');
    }
  };

  const selectedVariant = React.useMemo(() => {
    return product.variants?.find((v) =>
      v.attributes.every((attr) => selectedOptions[attr.category] === attr.value)
    );
  }, [selectedOptions, product.variants]);

  useEffect(() => {
    if(selectedVariant){
        console.log('selectedVariant',selectedVariant)
        setQuantity(1);
        if(selectedVariant?.quantity === 0 || selectedVariant?.quantity === selectedVariant?.sale_quantity){
            setoutOfStock(true)
        }
        else{
            setoutOfStock(false)
        }

        const existingCartQty = items?.reduce((acc, item) => {
          if (item.variantId === selectedVariant?._id) {
            return acc + item.quantity;
          }
          return acc;
        }, 0) || 0;

        setExistingCartItemQty(existingCartQty)
    }
  }, [selectedVariant]);

  

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Image source={{ uri: selectedVariant?.image || product.image }} style={styles.image} />
            {selectedVariant ? (
                <View style={styles.info}>
                <Text style={styles.price}>
                    ₫{((selectedVariant?.discount? selectedVariant?.price * (100-selectedVariant?.discount) /100:selectedVariant?.price) ?? product.price).toLocaleString()}
                    </Text>
                    {selectedVariant?.discount || product.discountPrice ? (
                    <Text style={styles.oldPrice}>₫{( selectedVariant?.price ?? product.price).toLocaleString()}</Text>
                    ) : null}
                <Text style={styles.stock}>Kho: {selectedVariant?.sale_quantity ? selectedVariant?.quantity - selectedVariant?.sale_quantity :  selectedVariant?.quantity}</Text>
            </View>
            )
            :
            (
                <View style={styles.info}>
                    </View>
            )
        }
    
            <TouchableOpacity
              onPress={() => {
                onClose();
                setSelectedOptions({});
                setQuantity(1);
                setoutOfStock(false)
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
                  const availableQty = selectedVariant?.sale_quantity ? selectedVariant?.quantity - selectedVariant?.sale_quantity : selectedVariant?.quantity ?? product.stock
                  const remainingQty = availableQty - existingCartItemQty;

                    if (quantity < remainingQty) {
                        setQuantity(quantity + 1);
                      } else {
                        setShowStockModal(true);
                      }
                }}
                disabled={!selectedVariant}
              >
                <Text style={styles.qtyBtn}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {outOfStock && (
            <Text style={{ color: 'red', marginTop: 8 }}>
                Sản phẩm với lựa chọn này hiện đã hết hàng.
            </Text>
            )}

          {/* Add button */}
          <TouchableOpacity
            onPress={handleAddToCart}
            disabled={!isReadyToAdd || outOfStock}
            style={[
              styles.addButton,
              (!isReadyToAdd || outOfStock) && { backgroundColor: '#ccc' },
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
        stock={selectedVariant?.sale_quantity ? selectedVariant?.quantity - selectedVariant?.sale_quantity : selectedVariant?.quantity}
        existingCartItemQty={existingCartItemQty}
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

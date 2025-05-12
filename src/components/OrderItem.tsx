import React, { use } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import OrderProduct from './OrderProduct';
import { CartProductItem } from '../screens/payment/Payment';
import Icon from '@react-native-vector-icons/ant-design';
import { Alert } from 'react-native';
import axios from 'axios';
import { Modal, Pressable } from 'react-native';
import { API_BASE_URL } from '../utils/const';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNotiOrder } from '../apis/Noti';
import { getDetailUser } from '../apis/User';

type OrderItemProps = {
  // shopName: string;
  status: string;
  products: CartProductItem[];
  totalPrice: number;
  orderId?: string;
  onUpdate: () => void;
  payUrl?: string;
};

const OrderItem = ({ status, products, totalPrice, orderId, onUpdate, payUrl }: OrderItemProps) => {
  const [showModal, setShowModal] = React.useState(false);
  const [showModalConfirm, setShowModalConfirm] = React.useState(false);

  const handleCancelOrder = async () => {
    try {
      const res = await axios.put(`${API_BASE_URL}/order/${orderId}/status`, {
        status: 'cancelled',
      });

      // Tạo thông báo cho Shop
      // senderId, receiverId, orderId, name, image, description, fcmToken
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const res1 = await getDetailUser(products[0]?.product_id?.product_id?.category_id.shop_id.user_id);
        console.log(">>>>> test hủy đơn hàng", products[0]?.product_id?.product_id?.category_id.shop_id,
          orderId,
          'Thông báo hủy đơn hàng',
          products[0]?.product_id?.image || '',
          `Đơn hàng ${orderId} đã hủy bởi người mua`,
          res1.data.DT.fcm_token);
        await createNotiOrder(user._id,
          products[0]?.product_id?.product_id?.category_id.shop_id,
          orderId,
          'Thông báo hủy đơn hàng',
          products[0]?.product_id?.image || '',
          `Đơn hàng ${orderId} đã hủy bởi người mua`,
          res1.data.DT.fcm_token
        );
      }

      if (res.data?.status === 'OK') {
        Alert.alert('Thành công', 'Đơn hàng đã được hủy');
        onUpdate();
      } else {
        Alert.alert('Thất bại', 'Không thể hủy đơn hàng');
      }
    } catch (err) {
      console.error('Hủy đơn hàng lỗi:', err);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi hủy đơn');
    }
  };

  const handleConfirmReceiveOrder = async () => {
    try {
      console.log("comppp")
      const res = await axios.put(`${API_BASE_URL}/order/${orderId}/status`, {
        status: 'completed',
      });
      console.log(res.data);
      // Tạo thông báo cho Shop - Xác nhận đã nhận được hàng
      // senderId, receiverId, orderId, name, image, description, fcmToken
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
      
        const res2 = await getDetailUser(products[0]?.product_id?.product_id?.category_id.shop_id.user_id);
        console.log("Thông tin thông báo người dùng", user._id,
          products[0]?.product_id?.product_id?.category_id.shop_id,
          orderId,
          'Thông báo đơn hàng hoàn thành',
          products[0]?.product_id?.image || '',
          `Đơn hàng ${orderId} đã được người mua xác nhận đã nhận được hàng`,
          res2.data.DT.fcm_token);
        await createNotiOrder(user._id,
          products[0]?.product_id?.product_id?.category_id.shop_id,
          orderId,
          'Thông báo đơn hàng hoàn thành',
          products[0]?.product_id?.image || '',
          `Đơn hàng ${orderId} đã được người mua xác nhận đã nhận được hàng`,
          res2.data.DT.fcm_token
        );
      }
      if (res.data?.status === 'OK') {
        Alert.alert('Thành công', 'Đơn hàng đã hoàn thành');
        onUpdate();
      } else {
        Alert.alert('Thất bại', 'Không thể xác nhận hoàn thành đơn hàng');
      }
    } catch (err) {
      console.error('Tạo thông báo hoàn thành lỗi:', err);
      // Alert.alert('Lỗi', 'Đã xảy ra lỗi khi hủy đơn');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.shopName}><Icon name="shop" size={20} color="#F1215A" />{products[0]?.product_id?.product_id?.category_id.shop_id.name}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>

      {products.map((product, index) => (
        <OrderProduct
          key={index}
          name={product.product_id?.product_id?.name || 'Sản phẩm'}
          variant={product.type}
          quantity={product.quantity}
          originalPrice={product.product_id?.price}
          salePrice={
            product.product_id?.price
              ? product.product_id.price * (1 - (product.product_id?.discount || 0) / 100)
              : 0
          }
          imageUrl={product.product_id?.image || ''}
        />
      ))}

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text>Tổng số tiền ({products.length} sản phẩm): </Text>
          <Text style={styles.totalPrice}>₫{totalPrice.toLocaleString('vi-VN')}</Text>
        </View>

        <View style={styles.buttonRow}>
          {status === 'Chờ xác nhận' && (
            <>
              <TouchableOpacity style={styles.contactButton}>
                <Text>Liên hệ shop</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(true)}>
                <Text style={styles.cancelText}>Hủy đơn hàng</Text>
              </TouchableOpacity>

            </>
          )}

          <Modal
            transparent
            visible={showModal}
            animationType="fade"
            onRequestClose={() => setShowModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Xác nhận hủy đơn hàng</Text>
                <Text style={{ marginBottom: 20 }}>Bạn có chắc chắn muốn hủy đơn hàng này không?</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                  <Pressable onPress={() => setShowModal(false)} style={styles.modalCancel}>
                    <Text>Đóng</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setShowModal(false);
                      handleCancelOrder();
                    }}
                    style={styles.modalConfirm}
                  >
                    <Text style={{ color: 'white' }}>Xác nhận</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>


          {status === 'Đã xác nhận' && (
            <TouchableOpacity style={styles.contactButton}>
              <Text>Liên hệ shop</Text>
            </TouchableOpacity>
          )}

          {status === 'Đang vận chuyển' && (
            <>
              <TouchableOpacity style={styles.contactButton}>
                <Text>Liên hệ shop</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelText}>Theo dõi đơn</Text>
              </TouchableOpacity>
            </>
          )}

          {status === 'Đã giao hàng' && (
            <>
              <TouchableOpacity style={styles.contactButton}>
                <Text>Liên hệ shop</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => {setShowModalConfirm(true)}}>
                <Text style={styles.cancelText}>Đã nhận hàng</Text>
              </TouchableOpacity>
            </>
          )}

          <Modal
            transparent
            visible={showModalConfirm}
            animationType="fade"
            onRequestClose={() => setShowModalConfirm(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Xác nhận nhận đơn hàng</Text>
                <Text style={{ marginBottom: 20 }}>Bạn có chắc chắn muốn xác nhận đơn hàng này không?</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                  <Pressable onPress={() => setShowModalConfirm(false)} style={styles.modalCancel}>
                    <Text>Đóng</Text>
                  </Pressable>
                  <TouchableOpacity
                    onPress={() => {
                      setShowModalConfirm(false);
                      handleConfirmReceiveOrder();
                    }}
                    style={styles.modalConfirm}
                  >
                    <Text style={{ color: 'white' }}>Xác nhận</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {status === 'Đã hoàn thành' && (
            <>
              <TouchableOpacity style={styles.contactButton}>
                <Text>Đánh giá</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelText}>Mua lại</Text>
              </TouchableOpacity>
            </>
          )}

          {status === 'Hủy' && (
            <TouchableOpacity style={styles.contactButton}>
              <Text>Mua lại</Text>
            </TouchableOpacity>
          )}

          {status === 'Chưa thanh toán' && (
            <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL(payUrl || '')}>
              <Text>Thanh toán ngay</Text>
            </TouchableOpacity>
          )}
        </View>

      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 15,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shopName: {
    color: '#e53935',
    fontWeight: '600',
  },
  status: {
    color: 'red',
  },
  footer: {
    justifyContent: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  totalPrice: {
    color: '#e53935',
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  contactButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#e53935',
    padding: 10,
    borderRadius: 5,
  },
  cancelText: {
    color: '#e53935',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    elevation: 5,
  },
  modalCancel: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#eee',
  },
  modalConfirm: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e53935',
  },

});

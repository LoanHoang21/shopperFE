import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import OrderTabbar from '../components/OrderTabbar';
import OrderItem from '../components/OrderItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../utils/const';

import { CartProductItem } from './payment/Payment';

export type OrderType = {
  _id: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'unpaid';
  products: CartProductItem[];
  quantity: number;
  total_price: number;
  createdAt: string;
  updatedAt: string;
  customer_id: any;
  address_id: any;
  voucher_id?: any;
  shipment_id?: any;
  payment_method_id?: any;
  shop_id: string;
  payment_status: string;
  payUrl?: string;
};

const Order = () => {
  const [tabIndex, setTabIndex] = useState('Chờ xác nhận');
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Error reading user from AsyncStorage', e);
      return null;
    }
  };

  const fetchOrders = async () => {
    try {
      const userData = await getUserInfo();
      if (!userData) return;
      const res = await axios.get(
        `${API_BASE_URL}/order/by-customer/${userData._id}`
      );

      if (res.data?.status === 'OK') {
        setOrders(res.data.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const mapTabToStatus = (tab: string) => {
    switch (tab) {
      case 'Chờ xác nhận':
        return 'pending';
      case 'Đã xác nhận':
        return 'confirmed';
      case 'Đang giao':
        return 'shipped';
      case 'Đã nhận':
        return 'delivered';
      case 'Hủy':
        return 'cancelled';
      case 'Chưa thanh toán':
        return 'unpaid';
      default:
        return 'pending';
    }
  };

  const filteredOrders = orders.filter(order => {
    return order.status === mapTabToStatus(tabIndex);
  });
  
  const handleUpdateSuccess = () => {
    fetchOrders();
  };

  return (
    <ScrollView style={styles.container}>
      <OrderTabbar onClick={tab => setTabIndex(tab)} />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : filteredOrders.length === 0 ? (
        <EmptyOrder />
      ) : (
        filteredOrders.map((order, index) => {
          // console.log('order', order);
          return (
            <OrderItem
              key={index}
              status={tabIndex}
              totalPrice={order.total_price}
              products={order.products}
              orderId={order._id}
              onUpdate={handleUpdateSuccess}
              payUrl={order.payUrl}
            />

          )
})
      )}
    </ScrollView>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
});

const EmptyOrder = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        backgroundColor: '#fff',
      }}>
      <Image
        source={require('../assets/images/order-image/empty-order.png')}
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />
      <Text style={{ fontWeight: '700' }}>Bạn chưa có đơn hàng nào</Text>
    </View>
  );
};

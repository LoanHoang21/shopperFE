import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllOrderById, updateStatusOrder} from '../apis/OrderAdmin';
import { createNotiOrder } from '../apis/Noti';

// const API_BASE = 'http://localhost:3001/api/order'; // Đổi thành địa chỉ backend thật nếu cần

// Map status từ DB sang tiếng Việt
const statusMap: Record<string, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang vận chuyển',
  delivered: 'Đã giao hàng',
  completed: 'Đã hoàn thành',
  cancelled: 'Đã hủy đơn',
};

// Flow chuyển trạng thái
const statusFlow: Record<string, string> = {
  pending: 'confirmed',
  confirmed: 'shipping',
  shipping: 'delivered',
  delivered: 'completed',
};

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        try {
          const res = await getAllOrderById(user._id);
          if (res && res.data && +res.data.EC === 0) {
            setOrders(res.data.DT);
          } else {
            Alert.alert('Lỗi', res.data.EM);
          }
        } catch (e) {
          Alert.alert('Lỗi', 'Không thể lấy danh sách đơn hàng.');
        } finally {
          setLoading(false);
        }
      }
    } catch (e) {
      console.error('Lỗi khi lấy dữ liệu:', e);
    }
  };

  const getNextStatusCode = (currentStatus: string) => {
    return statusFlow[currentStatus] || currentStatus;
  };
  const updateOrderStatus = async (orderId: string, currentStatus: string) => {
    const nextStatus = getNextStatusCode(currentStatus);
  
    if (nextStatus === currentStatus) {
      Alert.alert('Thông báo', 'Đơn hàng đã hoàn tất không thể cập nhật tiếp.');
      return;
    }
  
    try {
      const res = await updateStatusOrder(orderId, nextStatus);
  
      if (res.data && +res.data.EC === 0) {
        // Lấy thông tin user từ AsyncStorage
        const userData = await AsyncStorage.getItem('user');
        if (!userData) return;
        const user = JSON.parse(userData);
  
        // Lấy lại thông tin đơn hàng để lấy ảnh sản phẩm
        const orderRes = await getAllOrderById(user._id);
        const orders = orderRes?.data?.DT || [];
        const currentOrder = orders.find((o: any) => o._id === orderId);
        
        // Lấy ảnh sản phẩm đầu tiên trong đơn hàng
        const image = currentOrder?.products?.[0]?.image || '';
  
        // Tính ngày hôm sau (dùng cho phần completed)
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const formattedTomorrow = tomorrow.toLocaleDateString('vi-VN');
  
        // Tạo thông báo tương ứng
        let notifications: any = [];
  
        switch (nextStatus) {
          case 'confirmed':
            notifications.push({
              name: "Xác nhận đơn hàng",
              description: `Đơn hàng ${orderId} đã được người bán xác nhận. Bạn sẽ sớm nhận được thông báo khi đơn hàng bắt đầu vận chuyển.`,
              image: image, // Thêm image
            });
            break;
  
          case 'shipping':
            notifications.push({
              name: "Đang vận chuyển",
              description: `Đơn hàng ${orderId} đã rời khỏi kho và đang được vận chuyển đến bạn. Vui lòng giữ điện thoại để nhận hàng nhé!`,
              image: image, // Thêm image
            });
            break;
  
          case 'delivered':
            notifications.push({
              name: "Bạn có đơn hàng đang trên đường giao đến",
              description: `Đơn hàng ${orderId} đang trên đường giao đến. Mong bạn vui lòng chú ý điện thoại nhé! 😊`,
              image: image, // Thêm image
            });
            break;
  
          case 'completed':
            notifications = [
              {
                name: "Xác nhận đã nhận hàng",
                description: `Vui lòng xác nhận bạn đã nhận được đơn hàng ${orderId} để chúng tôi đảm bảo đơn hàng đã hoàn tất và an toàn.`,
                image: image, // Thêm image
              },
              {
                name: "Giao kiện hàng thành công",
                description: `Kiện hàng từ đơn vận chuyển VC001 của đơn hàng ${orderId} đã giao thành công đến bạn.`,
                image: image, // Thêm image
              },
              {
                name: "Nhắc nhở: Bạn đã nhận được hàng chưa?",
                description: `Nếu bạn chưa nhận được hàng hoặc gặp vấn đề với đơn hàng ${orderId}, hãy liên hệ hỗ trợ trước ngày ${formattedTomorrow}.`,
                image: image, // Thêm image
              },
              {
                name: "Đơn hàng đã hoàn tất",
                description: `Đơn hàng ${orderId} đã hoàn thành. Bạn hãy đánh giá sản phẩm trước ngày ${formattedTomorrow} để giúp người dùng khác hiểu rõ hơn về sản phẩm nhé!`,
                image: image, // Thêm image
              },
            ];
            break;
        }
  
        // Lấy token FCM
        const fcmToken = await AsyncStorage.getItem('fcmToken');
        // Gửi từng thông báo lên server
        for (const noti of notifications) {
          console.log(user._id, user._id, orderId, noti.name, noti.image, noti.description, fcmToken);
          await createNotiOrder(user._id, user._id, orderId, noti.name, noti.image, noti.description, fcmToken || '');
        }
  
        Alert.alert('Thành công', 'Cập nhật trạng thái đơn hàng và gửi thông báo thành công.');
        fetchOrders(); // Refresh lại danh sách đơn
      } else {
        Alert.alert('Lỗi', res.data.EM || 'Không thể cập nhật trạng thái.');
      }
    } catch (error: any) {
      Alert.alert('Lỗi>>>', error.message || 'Có lỗi xảy ra khi cập nhật.');
    }
  };
  

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderItem = ({item}: {item: any}) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderId}>Order ID: {item._id}</Text>
      <Text style={styles.orderId}>Sender ID: {item.customer_id}</Text>
      <Text style={styles.orderId}>Received ID: {item.customer_id}</Text>
      <Text>Created: {new Date(item.created_at).toLocaleString()}</Text>
      <Text>Status: {statusMap[item.status] || 'Không xác định'}</Text>
      <Text style={{fontWeight: 'bold', marginTop: 6}}>Products:</Text>
      {item.products?.map((p: any, i: number) => (
        <View key={i} style={styles.productItem}>
          <Image source={{uri: p.image}} style={styles.productImage} />
          <Text>
            {p.name} x{p.quantity}
          </Text>
        </View>
      ))}
      <TouchableOpacity
        style={styles.statusButton}
        onPress={() => updateOrderStatus(item._id, item.status)}>
        <Text style={styles.statusButtonText}>
          Trạng thái: {statusMap[item.status] || 'Không xác định'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#007AFF" style={{marginTop: 50}} />
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      contentContainerStyle={{padding: 16}}
    />
  );
};

export default OrderAdmin;

const styles = StyleSheet.create({
  orderItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  orderId: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 6,
  },
  statusButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  statusButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
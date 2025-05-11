import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet, TextInput, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllOrder, updateStatusOrder} from '../../apis/OrderShop';
import { createNotiOrder } from '../../apis/Noti';
import { getDetailUser } from '../../apis/User';
import { image_default } from '../../utils/const';
import { getShopByUserId } from '../../apis/Shop';

const statusMap: Record<string, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang vận chuyển',
  delivered: 'Đã giao hàng',
  completed: 'Đã hoàn thành',
  cancelled: 'Đã hủy đơn',
};

const statusFlow: Record<string, string> = {
  pending: 'confirmed',
  confirmed: 'shipping',
  shipping: 'delivered',
  delivered: 'completed',
  // cancelled: 'cancelled',
};

const tabs = [
  {label: 'Tất cả', value: 'Tất cả'},
  {label: 'Chờ xác nhận', value: 'pending'},
  {label: 'Đã xác nhận', value: 'confirmed'},
  {label: 'Đang vận chuyển', value: 'shipping'},
  {label: 'Đã giao hàng', value: 'delivered'},
  {label: 'Đã hoàn thành', value: 'completed'},
  {label: 'Đã hủy đơn', value: 'cancelled'},
];

const OrderShop = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('Tất cả');

  const fetchOrders = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const shop = await getShopByUserId(user._id);
        // const res = await getAllOrderById(user._id);
        const res = await getAllOrder(shop.data.DT._id);
        if (res?.data?.EC === 0) {
          setOrders(res.data.DT);
          setFilteredOrders(res.data.DT);
        } else {
          Alert.alert('Lỗi', res.data.EM);
        }
      }
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể lấy danh sách đơn hàng.');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  const filterOrders = () => {
    const text = searchText.toLowerCase();
    const filtered = orders.filter((order: any) => {
      const matchText =
        order._id?.toLowerCase().includes(text) ||
        order.customer_email?.toLowerCase().includes(text) ||
        order.customer_phone?.toLowerCase().includes(text);

      const matchStatus =
        selectedTab === 'Tất cả' || order.status === selectedTab;

      return matchText && matchStatus;
    });
    setFilteredOrders(filtered);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchText, selectedTab, orders]);

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
      if (res?.data?.EC === 0) {
        const userData = await AsyncStorage.getItem('user');
        const user = JSON.parse(userData || '{}');
        const shop = await getShopByUserId(user._id);
        const orderRes = await getAllOrder(shop.data.DT._id);
        const orderss = orderRes?.data?.DT || [];
        const currentOrder = orderss.find((o: any) => o._id === orderId);
        const image = currentOrder?.products?.[0]?.product_id.image || image_default;
        const receiverId = currentOrder.customer_id || '';
        const receiverRes = await getDetailUser(receiverId);
        const receiver = receiverRes.data.DT;
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 2);
        const formattedTomorrow = tomorrow.toLocaleDateString('vi-VN');

        let notifications: any = [];

        switch (nextStatus) {
          case 'confirmed':
            notifications.push({
              name: 'Xác nhận đơn hàng',
              description: `Đơn hàng ${orderId} đã được người bán xác nhận. Bạn sẽ sớm nhận được thông báo khi đơn hàng bắt đầu vận chuyển.`,
              image: image,
            });
            break;

          case 'shipping':
            notifications.push({
              name: 'Đang vận chuyển',
              description: `Đơn hàng ${orderId} đã rời khỏi kho và đang được vận chuyển đến bạn. Vui lòng giữ điện thoại để nhận hàng nhé!`,
              image: image,
            });
            break;

          case 'delivered':
            notifications.push(
              // name: 'Bạn có đơn hàng đang trên đường giao đến',
              // description: `Đơn hàng ${orderId} đang trên đường giao đến. Mong bạn vui lòng chú ý điện thoại nhé! 😊`,
              // image: image,
              {
                name: 'Giao kiện hàng thành công',
                description: `Kiện hàng từ đơn vận chuyển của đơn hàng ${orderId} đã giao thành công đến bạn.`,
                image: image,
              },
              {
                name: 'Xác nhận đã nhận hàng',
                description: `Vui lòng xác nhận bạn đã nhận được đơn hàng ${orderId} để chúng tôi đảm bảo đơn hàng đã hoàn tất và an toàn bạn nhé 😊`,
                image: image,
            });
            break;

          case 'completed':
            notifications = [
              // {
              //   name: 'Xác nhận đã nhận hàng',
              //   description: `Vui lòng xác nhận bạn đã nhận được đơn hàng ${orderId} để chúng tôi đảm bảo đơn hàng đã hoàn tất và an toàn.`,
              //   image: image,
              // },
              {
                name: 'Nhắc nhở: Bạn đã nhận được hàng chưa?',
                description: `Nếu bạn chưa nhận được hàng hoặc gặp vấn đề với đơn hàng ${orderId}, hãy liên hệ hỗ trợ trước ngày ${formattedTomorrow}.`,
                image: image,
              },
              {
                name: 'Đơn hàng đã hoàn tất',
                description: `Đơn hàng ${orderId} đã hoàn thành. Bạn hãy đánh giá sản phẩm trước ngày ${formattedTomorrow} để giúp người dùng khác hiểu rõ hơn về sản phẩm nhé!`,
                image: image,
              },
            ];
            break;
        }

        for (const noti of notifications) {
          await createNotiOrder(user._id, receiverId, orderId,noti.name,noti.image,noti.description,receiver.fcm_token);
        }
        Alert.alert(
          'Thành công',
          'Cập nhật trạng thái và gửi thông báo thành công.',
        );
        fetchOrders();
      } else {
        Alert.alert('Lỗi', res.data.EM || 'Không thể cập nhật trạng thái.');
      }
    } catch (error: any) {
      Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra khi cập nhật.');
    }
  };

  const renderItem = ({item}: {item: any}) => {
    const isDisabled =
      item.status === 'delivered' ||
      item.status === 'completed' ||
      item.status === 'cancelled';
    const buttonColor = isDisabled ? '#4CAF50' : '#F1215A'; // xanh hoặc đỏ

    // let totalAmount = 0;

    const productViews = item.products?.map((p: any, i: number) => {
      const product = p.product_id;
      const quantity = p.quantity;
      // const price = product.price || 0;
      // const discount = product.discount;
  
      // const hasDiscount = discount !== undefined && discount !== null;
      // const salePrice = hasDiscount ? price * (1 - discount / 100) : price;
      // const totalProduct = salePrice * quantity;
      // totalAmount += totalProduct;
  
      return (
        <View key={i} style={styles.productItem}>
          <Image source={{uri: product.image}} style={styles.productImage} />
          <View style={styles.productInfo}>
            <View style={styles.rowBetween}>
              <Text style={styles.productName} numberOfLines={2}>
                {product.product_id.name}
              </Text>
              <Text style={styles.quantityText}>x{quantity}</Text>
            </View>
  
            <View style={styles.rowBetween}>
              {/* {hasDiscount && (
                <Text style={styles.oldPrice}>₫{price?.toLocaleString()}</Text>
              )}
              <Text style={styles.salePrice}>₫{Math.round(salePrice).toLocaleString()}</Text> */}
              <Text>Mã sản phẩm: {product._id}</Text>
            </View>
          </View>
        </View>
      );
    });
  
    // // Tính giảm giá theo voucher
    // let discountValue = 0;
    // let tempDiscount = 0;
    // const voucher = item.voucher_id;
    // if (voucher && typeof voucher === 'object' && totalAmount >= voucher.min_order_value * 1000 ) {
    //   if (voucher.discount_type === 'Phần trăm') {
    //     tempDiscount = totalAmount * (voucher.discount_value / 100);
    //   } else if (voucher.discount_type === 'Tiền') {
    //     tempDiscount = voucher.discount_value * 1000;
    //   }
    //   if (tempDiscount > voucher.max_discount_value*1000){
    //     discountValue = voucher.max_discount_value*1000;
    //   }else{
    //     discountValue = tempDiscount;
    //   }
    // }

    // const finalTotal = totalAmount - discountValue;
  
    return (
      <View style={styles.orderItem}>
        <Text style={styles.orderId}>Mã đơn hàng: {item._id}</Text>
        <Text style={styles.orderId}>Mã khách hàng: {item.customer_id}</Text>
        <Text>Ngày tạo: {new Date(item.createdAt).toLocaleString()}</Text>
        <Text>Ngày cập nhật: {new Date(item.updatedAt).toLocaleString()}</Text>
        <Text style={{fontWeight: 'bold', marginTop: 6}}>Sản phẩm:</Text>
  
        {productViews}
  
        <View style={styles.totalDetailOrder}>
          {/* <Text style={styles.totalLabelMain}>Chi tiết thanh toán</Text> */}
          {/* <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tổng tiền hàng</Text>
            <Text style={styles.totalAmount}>₫{Math.round(totalAmount).toLocaleString()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Số tiền giảm giá (voucher)</Text>
            <Text style={styles.totalAmount}>₫{Math.round(discountValue).toLocaleString()}</Text>
          </View> */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabelMain}>Tổng thanh toán ({item.quantity} sản phẩm): </Text>
            {/* <Text style={styles.totalAmount}>₫{Math.round(finalTotal).toLocaleString()}</Text> */}
            <Text style={styles.totalAmount}>₫{Math.round(item.total_price).toLocaleString()}</Text>
          </View>
        </View>
  
        <TouchableOpacity
          style={[styles.statusButton, {backgroundColor: buttonColor}]}
          onPress={() => {
            if (!isDisabled) {
              updateOrderStatus(item._id, item.status);
            }
          }}
          disabled={isDisabled}>
          <Text style={styles.statusButtonText}>
            Trạng thái: {statusMap[item.status] || 'Không xác định'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // if (loading) {
  //   return (
  //     <ActivityIndicator size="large" color="#007AFF" style={{marginTop: 50}} />
  //   );
  // }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal: 12}}>
        <TextInput
          placeholder="Tìm theo mã đơn hàng"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.value}
              style={[
                styles.tabItem,
                selectedTab === tab.value && styles.activeTab,
              ]}
              onPress={() => setSelectedTab(tab.value)}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab.value && {color: '#fff'},
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={{padding: 16, paddingBottom: 100}}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginTop: 20}}>
            Không có đơn hàng nào.
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default OrderShop;

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
    marginVertical: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 6,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  productName: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    marginRight: 8,
    fontWeight: '500',
  },
  quantityText: {
    fontSize: 15,
    color: '#333',
  },
  oldPrice: {
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  salePrice: {
    color: '#f5225c',
    fontWeight: 'bold',
    fontSize: 15,
  },
  totalDetailOrder: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  // totalLabelMain: {
  //   fontSize: 16,
  //   fontWeight: '500',
  //   color: '#000',
  // },

  totalLabelMain: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },

  // totalLabel: {
  //   fontSize: 15,
  //   color: '#000',
  //   fontWeight:"500",
  // },
  totalAmount: {
    fontSize: 15,
    color: '#f5225c',
    fontWeight: 'bold',
  },

  statusButton: {
    marginTop: 10,
    backgroundColor: '#F1215A',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  statusButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchInput: {
    marginTop: 12,
    marginBottom: 8,
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    // marginBottom: 8,
  },
  tabItem: {
    paddingHorizontal: 12,
    height: 36,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
    color: '#333',
  },
  activeTab: {
    backgroundColor: '#F1215A',
  },
});

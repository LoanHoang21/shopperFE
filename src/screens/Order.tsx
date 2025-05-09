import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useState} from 'react';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { Icon } from 'react-native-elements';
import OrderTabbar from '../components/OrderTabbar';
import OrderItem from '../components/OrderItem';

// type OrderRouteProp = RouteProp<RootStackParamList, 'order'>;

const orderList = [
  {
    shopName: 'Happy Bedding',
    status: 'Chờ xác nhận',
    products: [
      {
        name: 'Bộ ga gối Cotton',
        variant: 'Kích thước: M8-2m, Caro xanh nhạt',
        quantity: 2,
        originalPrice: 205000,
        salePrice: 169000,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9aM8aQyWtcV41nBhSw4JDBEI8QernSD5mw&s',
      },
      {
        name: 'Chăn lông mềm',
        variant: 'Màu: Xanh pastel',
        quantity: 1,
        originalPrice: 399000,
        salePrice: 315000,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9aM8aQyWtcV41nBhSw4JDBEI8QernSD5mw&s',
      },
    ],
  },
  {
    shopName: 'Gối Ôm Cute',
    status: 'Chờ xác nhận',
    products: [
      {
        name: 'Gối ôm hình gấu',
        variant: 'Hình: Gấu trúc',
        quantity: 3,
        originalPrice: 150000,
        salePrice: 120000,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9aM8aQyWtcV41nBhSw4JDBEI8QernSD5mw&s',
      },
    ],
  },
];

const Order = () => {
  // const route = useRoute<OrderRouteProp>();
  // const { id } = route.params;
  const [tabIndex, setTabIndex] = useState<string>('Chờ xác nhận');

  return (
    <ScrollView style={stylesOrder.container}>
      <OrderTabbar
        onClick={tab => {
          setTabIndex(tab);
        }}
      />

      <Text>{tabIndex}</Text>

      {orderList.map((order, index) => (
        <OrderItem key={index} {...order} />
      ))}

      {/* <EmptyOrder /> */}
    </ScrollView>
  );
};

export default Order;

const stylesOrder = StyleSheet.create({
  container: {},
  text: {fontSize: 24},
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
      <Text style={{ fontWeight: '700'}}>Bạn chưa có đơn hàng nào</Text>
    </View>
  );
};
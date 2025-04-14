import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
// import OrderTabbar from '../components/OrderTabBar';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { Icon } from 'react-native-elements';



type OrderRouteProp = RouteProp<RootStackParamList, 'order'>;

const Order = () => {
  const route = useRoute<OrderRouteProp>();
  const { id } = route.params;

  return (
    <View style={stylesOrder.container}>
      <OrderTabbar />

    </View>
  );
};

export default Order;

const stylesOrder = StyleSheet.create({
  container: {  },
  text: { fontSize: 24 },
});

import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const tabList = ['Chờ xác nhận', 'Chờ lấy hàng', 'Chờ giao hàng', 'Đã giao'];

const OrderTabbar = () => {
  const [activeTab, setActiveTab] = useState(2);

  return (
    <View style={stylesTab.container}>
      {tabList.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={stylesTab.tab}
          onPress={() => setActiveTab(index)}
        >
          <Text style={[stylesTab.tabText, activeTab === index && stylesTab.activeText]}>
            {tab}
          </Text>
          {activeTab === index && <View style={stylesTab.underline} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

// const screenWidth = Dimensions.get('window').width;

const stylesTab = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    paddingVertical: 10,
    gap: 2,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    color: 'black',
    fontSize: 13,
  },
  activeText: {
    fontWeight: 'bold',
    color: '#F1215A',
  },
  underline: {
    marginTop: 10,
    height: 1,
    backgroundColor: '#F1215A',
    width: '100%',
  },
});

import { Image } from 'react-native';

type OrderItemProps = {
  name: string;
  variant: string;
  quantity: number;
  originalPrice: number;
  salePrice: number;
  imageUrl: string;
};

const formatCurrency = (value: number) => {
  // return `₫${value.toLocaleString('vi-VN')}`;
  return value;
};

const OrderItemCard = ({
  name,
  variant,
  quantity,
  originalPrice,
  salePrice,
  imageUrl,
}: OrderItemProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.variant}>{variant}</Text>
          <Text style={styles.quantity}>x{quantity}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.originalPrice}>{formatCurrency(originalPrice)}</Text>
            <Text style={styles.salePrice}>{formatCurrency(salePrice)}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.total}>
        Tổng số tiền ({quantity} sản phẩm):{' '}
        <Text style={styles.salePrice}>{formatCurrency(salePrice * quantity)}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#222',
  },
  variant: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  quantity: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 13,
    color: '#333',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  originalPrice: {
    fontSize: 13,
    color: '#aaa',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  salePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e53935',
  },
  total: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
});

export default OrderItemCard;



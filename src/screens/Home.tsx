
import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import MenuItem from '../components/MenuItem';
import ProductCard, { Product } from '../components/ProductCard';
import QuickMenuItem from '../components/QuickMenuItem';

const menuData = [
  {
    label: 'Thanh toán',
    icon: require('../assets/pay.png'),
    borderColor: '#f44336',
  },
  {
    label: 'Food',
    icon: require('../assets/food.png'),
    borderColor: '#0d47a1',
  },
  {
    label: 'Mã giảm giá',
    icon: require('../assets/voucher.png'),
    borderColor: '#00bfa5',
  },
  {
    label: 'Top mua hàng',
    icon: require('../assets/crown.png'),
    borderColor: '#fbc02d',
  },
  {
    label: 'Đơn hàng',
    icon: require('../assets/order.png'),
    borderColor: '#f06292',
  },
];

const data: Product[] = Array(20).fill({
  title: 'Bộ ga gối và vỏ chăn',
  price: '169.000',
  oldPrice: '205.000',
  tag: 'Chăn ga Pre',
  rating: '4.5',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9aM8aQyWtcV41nBhSw4JDBEI8QernSD5mw&s',
});


const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Menu */}
      <View style={styles.quickMenuRow}>
        {menuData.map((item, index) => (
          <QuickMenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            borderColor={item.borderColor}
          />
        ))}
      </View>

      {/* Product List */}
      <FlatList
        data={data}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingTop: 16 }}
        renderItem={({ item }) => <ProductCard item={item}  />}
        keyExtractor={(_, i) => i.toString()}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 10,
  },
  tab: {
    fontWeight: '600',
    fontSize: 14,
  },
  quickMenuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});
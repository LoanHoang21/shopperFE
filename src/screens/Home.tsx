
import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import MenuItem from '../components/MenuItem';
import ProductCard, { Product } from '../components/ProductCard';
import QuickMenuItem from '../components/QuickMenuItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
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




const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3001/api/product/getAll');


        setProducts(response.data.data); // vì dữ liệu nằm trong `data.data`
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <View style={styles.container}>
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
        data={products}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingTop: 16 }}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
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
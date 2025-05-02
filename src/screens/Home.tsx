import React, { useEffect, useState } from 'react';
import { View, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ProductCard, { Product } from '../components/ProductCard';
import QuickMenuItem from '../components/QuickMenuItem';
import {NavigationProp, useNavigation} from '@react-navigation/native';
// import HomeBottom from '../components/bottomTab/HomeBottom';
import axios from 'axios';
import { RootStackParamList } from '../types/data';

const menuData = [
  {
    label: 'Thanh toán',
    icon: require('../assets/images/pay.png'),
    borderColor: '#f44336',
  },
  {
    label: 'Food',
    icon: require('../assets/images/food.png'),
    borderColor: '#0d47a1',
  },
  {
    label: 'Mã giảm giá',
    icon: require('../assets/images/voucher.png'),
    borderColor: '#00bfa5',
  },
  {
    label: 'Top mua hàng',
    icon: require('../assets/images/crown.png'),
    borderColor: '#fbc02d',
  },
  {
    label: 'Đơn hàng',
    icon: require('../assets/images/order.png'),
    borderColor: '#f06292',
  },
];

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
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
    <>
      <ScrollView style={styles.container}>
      {/* Menu */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.quickMenuRow}>
          {menuData.map((item, index) => {
            if (item.label === 'Đơn hàng') {
              return (
                <TouchableOpacity
                  key={index}
                  // onPress={() => navigation.navigate('order')}>
                    onPress={() => navigation.navigate('orderAdmin')}>
                  <QuickMenuItem
                    icon={item.icon}
                    label={item.label}
                    borderColor={item.borderColor}
                  />
                </TouchableOpacity>
              );
            } else if (item.label === 'Mã giảm giá') {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate('voucher')}>
                  <QuickMenuItem
                    icon={item.icon}
                    label={item.label}
                    borderColor={item.borderColor}
                  />
                </TouchableOpacity>
              );
            } else {
              return (
                <QuickMenuItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  borderColor={item.borderColor}
                />
              );
            }
          })}
        </View>
    </ScrollView>
    <Text onPress={() => navigation.navigate('payment')}>Sang Payment</Text>
      {/* Product List */}
      <FlatList
        data={products}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingTop: 16 }}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item._id}
      />
    </ScrollView>
    {/* <HomeBottom/> */}
    </>
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
    overflow: 'scroll',
  },
});
// import React from 'react';
// import {View, Text, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// const Home = () => {
//   type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;
//   const navigation = useNavigation<NavigationProp>();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>🏠 Đây là trang Home</Text>
//       <Button
//         title="Đi tới Giỏ hàng 123"
//         onPress={() => navigation.navigate('order', {id: 1234})}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
//   text: {fontSize: 20, marginBottom: 16},
// });

// export default Home;
import React from 'react';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native';
import ProductCard, { Product } from '../components/navigation/ProductCard';
import QuickMenuItem from '../components/navigation/QuickMenuItem';
import HomeBottom from '../components/bottomTab/HomeBottom';

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

const data: Product[] = Array(20).fill({
  title: 'Bộ ga gối và vỏ chăn',
  price: '169.000',
  oldPrice: '205.000',
  tag: 'Chăn ga Pre',
  rating: '4.5',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9aM8aQyWtcV41nBhSw4JDBEI8QernSD5mw&s',
});

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <ScrollView style={styles.container}>
      {/* Menu */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
      </ScrollView>

        <Text onPress={() => navigation.navigate('payment')}>Sang Payment</Text>
      {/* Product List */}
      <FlatList
        data={data}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingTop: 16 }}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(_, i) => i.toString()}
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

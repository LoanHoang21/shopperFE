import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ProductCard, {Product} from '../components/navigation/ProductCard';
import QuickMenuItem from '../components/navigation/QuickMenuItem';
import HomeBottom from '../components/bottomTab/HomeBottom';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HandleNotification} from '../utils/handleNotification';

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
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9aM8aQyWtcV41nBhSw4JDBEI8QernSD5mw&s',
});

const HomeScreen: React.FC = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  return (
    <>
      <ScrollView style={styles.container}>
        {/* Menu */}
        <View style={styles.quickMenuRow}>
          {menuData.map((item, index) => {
            if (item.label === 'Đơn hàng') {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate('order')}>
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

        {/* Product List */}
        <FlatList
          data={data}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={{paddingTop: 16}}
          renderItem={({item}) => <ProductCard item={item} />}
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
  },
});

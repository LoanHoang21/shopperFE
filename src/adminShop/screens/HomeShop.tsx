import React, {useEffect, useState, useCallback} from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, RefreshControl, StyleSheet } from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {useNavigation} from '@react-navigation/native';
import Card from '../components/Card';
import {getAllCustomer, getAllOrder} from '../../apis/OrderShop';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getShopByUserId} from '../../apis/Shop';

const screenWidth = Dimensions.get('window').width;

const HomeShop = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  type PieItem = {
    name: string;
    population: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
  };

  const [pieData, setPieData] = useState<PieItem[]>([]);

  const [stats, setStats] = useState([
    {label: 'Đơn hàng', value: 0, bg: '#DFF6FF'},
    {label: 'Doanh thu', value: '₫0', bg: '#C1F2B0'},
    {label: 'Khách hàng', value: 0, bg: '#FFE6E6'},
    {label: 'Sản phẩm', value: 0, bg: '#FFF6C3'},
  ]);

  const fetchStats = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const shopInfor = await getShopByUserId(user._id);

        const resOrders = await getAllOrder(shopInfor.data.DT._id);
        const resCustomers = await getAllCustomer(shopInfor.data.DT._id);

        const orderList = resOrders.data.DT || [];
        const customerQuantityList = resCustomers.data.DT || [];
        let pending = 0;
        let confirmed = 0;
        let shipping = 0;
        let delivered = 0;
        let completed = 0;
        let cancelled = 0;
        let totalRevenue = 0;
        let totalProductSale = 0;

        orderList.forEach((order: any) => {
          if (order.status !== 'cancelled') {
            totalRevenue += order.total_price || 0;
            totalProductSale += order.quantity || 0;
          }
          switch (order.status) {
            case 'pending':
              pending++;
              break;
            case 'confirmed':
              confirmed++;
              break;
            case 'shipping':
              shipping++;
              break;
            case 'delivered':
              delivered++;
              break;
            case 'completed':
              completed++;
              break;
            case 'cancelled':
              cancelled++;
              break;
          }
        });

        // Cập nhật dữ liệu biểu đồ tròn
        // 7 trạng thái đơn hàng: Chờ xác nhận, Đã xác nhận, Đang vận chuyển, Đã giao hàng, Đã hoàn thành, Đã hủy đơn
        setPieData([
          {
            name: 'Chờ xác nhận',
            population: pending,
            color: '#F42384',
            legendFontColor: '#333',
            legendFontSize: 14,
          },
          {
            name: 'Đã xác nhận',
            population: confirmed,
            color: '#FFD700',
            legendFontColor: '#333',
            legendFontSize: 14,
          },
          {
            name: 'Đang vận chuyển',
            population: shipping,
            color: '#87CEEB',
            legendFontColor: '#333',
            legendFontSize: 14,
          },
          {
            name: 'Đã giao hàng',
            population: delivered,
            color: 'gray',
            legendFontColor: '#333',
            legendFontSize: 14,
          },
          {
            name: 'Đã hoàn thành',
            population: completed,
            color: 'green',
            legendFontColor: '#333',
            legendFontSize: 14,
          },
          {
            name: 'Đã hủy đơn',
            population: cancelled,
            color: 'red',
            legendFontColor: '#333',
            legendFontSize: 14,
          },
        ]);

        setStats([
          {label: 'Đơn hàng', value: orderList.length, bg: '#DFF6FF'},
          {
            label: 'Doanh thu',
            value: `₫${totalRevenue.toLocaleString()}`,
            bg: '#C1F2B0',
          },
          {
            label: 'Khách hàng',
            value: customerQuantityList.length,
            bg: '#FFE6E6',
          },
          {label: 'Sản phẩm đã bán', value: totalProductSale, bg: '#FFF6C3'},
        ]);
      }
    } catch (error) {
      console.log('Lỗi lấy thống kê:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchStats().finally(() => setRefreshing(false));
  }, []);

  const actions = [
    {title: 'Quản lý sản phẩm', route: 'productShop'},
    {title: 'Quản lý đơn hàng', route: 'orderShop'},
    {title: 'Quản lý mã giảm giá', route: 'voucherShop'},
    {title: 'Quản lý thông báo', route: 'notiTypeShop'},
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.contain}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text style={styles.title}>Trang quản lý</Text>

      <View
        style={styles.cardContain}>
        {stats.map((item, index) => (
          <Card
            key={index}
            style={{width: '48%', marginBottom: 16, backgroundColor: item.bg}}>
            <Text style={styles.cardLabel}>{item.label}</Text>
            <Text style={styles.cardValue}>{item.value}</Text>
          </Card>
        ))}
      </View>

      <Text style={styles.titleActionQuick}>Tỷ lệ trạng thái đơn hàng</Text>

      <PieChart
        data={pieData}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          color: () => `rgba(0, 0, 0, 0.5)`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="10"
        absolute
      />

      <Text style={styles.titleActionQuick}>Hành động nhanh</Text>

      {actions.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(item.route as never)}
          style={styles.actionQuick}>
          <Text style={{fontSize: 16}}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default HomeShop;

const styles = StyleSheet.create({
  contain: {padding: 16, backgroundColor: '#fff'},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  cardContain: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardLabel: {fontSize: 16, color: '#555'},
  cardValue: { fontSize: 20, fontWeight: 'bold' },
  titleActionQuick: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 25,
    marginBottom: 10,
  },
  actionQuick: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
});

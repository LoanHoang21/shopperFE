import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import { getAllOrder } from '../../apis/OrderAdmin';
import { getAllUser } from '../../apis/User';
import { getAllProduct } from '../../apis/Product';

const screenWidth = Dimensions.get('window').width;

const HomeAdmin = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const [stats, setStats] = useState([
    { label: 'Đơn hàng', value: 0, bg: '#DFF6FF' },
    { label: 'Doanh thu', value: '₫0', bg: '#C1F2B0' },
    { label: 'Người dùng', value: 0, bg: '#FFE6E6' },
    { label: 'Sản phẩm', value: 0, bg: '#FFF6C3' },
  ]);

  const [pieData, setPieData] = useState([]);

  const fetchStats = async () => {
    try {
      const resOrders = await getAllOrder();
      const resUsers = await getAllUser();
      const resProducts = await getAllProduct();

      const orderList = resOrders.data.DT || [];
      const userList = resUsers.data.DT || [];
      const productList = resProducts.data.data || [];

      let pending = 0;
      let confirmed = 0;
      let shipping = 0;
      let delivered = 0;
      let completed = 0;
      let cancelled = 0;
      let totalRevenue = 0;

      orderList.forEach((order: any) => {
        totalRevenue += order.total_price || 0;
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
        { label: 'Đơn hàng', value: orderList.length, bg: '#DFF6FF' },
        { label: 'Doanh thu', value: `₫${totalRevenue.toLocaleString()}`, bg: '#C1F2B0' },
        { label: 'Người dùng', value: userList.length, bg: '#FFE6E6' },
        { label: 'Sản phẩm', value: productList.length, bg: '#FFF6C3' },
      ]);
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
    { title: 'Quản lý sản phẩm', route: 'productAdmin' },
    { title: 'Quản lý đơn hàng', route: 'orderAdmin' },
    { title: 'Quản lý người dùng', route: 'userAdmin' },
    { title: 'Quản lý mã giảm giá', route: 'voucherAdmin' },
  ];

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16, backgroundColor: '#fff' }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Trang quản lý</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {stats.map((item, index) => (
          <Card key={index} style={{ width: '48%', marginBottom: 16, backgroundColor: item.bg }}>
            <Text style={{ fontSize: 16, color: '#555' }}>{item.label}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.value}</Text>
          </Card>
        ))}
      </View>

      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 10 }}>
        Tỷ lệ trạng thái đơn hàng
      </Text>

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

      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 30, marginBottom: 10 }}>
        Hành động nhanh
      </Text>

      {actions.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(item.route as never)}
          style={{
            backgroundColor: '#f2f2f2',
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 16 }}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default HomeAdmin;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getAllVoucher } from '../apis/Voucher';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/data';

export interface Voucher {
  _id: string;
  code: string;
  image: string;
  description: string;
  discount_type: string;
  discount_value: number;
  min_order_value: number;
  max_discount_value: number;
  start_date: string;
  end_date: string;
  max_user: number;
  user_count: number;
  type_voucher: string;
}

const tabs = [
  { label: 'Tất cả', value: 'Tất cả' },
  { label: 'Shopper', value: 'Shopper' },
  { label: 'Shop', value: 'Shop' },
  { label: 'Sắp hết hạn', value: 'Sắp hết hạn' },
];

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const isExpiringSoon = (startDate: string, endDate: string) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = (end.getTime() - today.getTime()) / (1000 * 3600 * 24);
  return diff <= 3 && diff >= 0 && start <= today;
};

type VoucherRouteProp = RouteProp<RootStackParamList, 'payment'>;


const VoucherScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Tất cả');
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
const route = useRoute<VoucherRouteProp>();
const { product, paymentMethodId } = route.params;


  const getAllVouchers = async () => {
    try {
      const res = await getAllVoucher();
      if (res?.data?.EC === 0) {
        setVouchers(res.data.DT);
      } else {
        Alert.alert('Lỗi', res.data.EM);
      }
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể lấy danh sách voucher.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllVouchers();
  }, []);

  const filterVouchers = () => {
    return vouchers.filter(v => {
      if (selectedTab === 'Tất cả') return true;
      if (selectedTab === 'Sắp hết hạn') return isExpiringSoon(v.start_date, v.end_date);
      return v.type_voucher === selectedTab;
    });
  };

  const renderVoucher = ({ item }: { item: Voucher }) => {
    const isExpired = new Date(item.end_date) < new Date();
    const isStarted = new Date(item.start_date) > new Date();
    const isFull = item.user_count >= item.max_user;
    // const isSoon = isExpiringSoon(item.end_date);

    let actionLabel = 'Dùng ngay';
    let actionColor = '#FF3366';
    if (isExpired) {
      actionLabel = 'Hết hạn';
      actionColor = '#ccc';
    } else if (isFull) {
      actionLabel = 'Hết mã';
      actionColor = '#ccc';
    }
    else if (isStarted) {
      actionLabel = 'Dùng sau';
      actionColor = '#F55539';
    }

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>
            {item.discount_type === 'Phần trăm'
              ? `Giảm ${item.discount_value}%`
              : `Giảm ${item.discount_value.toLocaleString()}K`}
            {item.max_discount_value
              ? ` giảm tối đa ${item.max_discount_value.toLocaleString()}K`
              : ''}
          </Text>
          <Text style={styles.desc}>
            Đơn Tối Thiểu {item.min_order_value.toLocaleString()}K. {item.description}
          </Text>
          {new Date(item.start_date).getTime() < Date.now() ? (
            <Text style={styles.subDesc}>Đã dùng: {item.user_count}/{item.max_user}. HSD: {formatDate(item.end_date)}</Text>
          ) : (
            <Text style={styles.subDesc}>Có hiệu lực từ: {formatDate(item.start_date)}. HSD: {formatDate(item.end_date)}</Text>
          )}

        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: actionColor }]}
          disabled={isExpired || isFull}
          onPress={() => {
            navigation.navigate('payment', {
              voucherId: item._id,
              product,
              paymentMethodId,
            });
          }}
          >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderTab = (tab: { label: string; value: string }) => {
    const isActive = selectedTab === tab.value;
    return (
      <TouchableOpacity
        key={tab.value}
        onPress={() => setSelectedTab(tab.value)}
        style={styles.tabButton}>
        <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
          {tab.label}
        </Text>
        {isActive && <View style={styles.tabUnderline} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>{tabs.map(renderTab)}</View>
      {loading ? (
        <ActivityIndicator size="large" color="#FF3366" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filterVouchers()}
          keyExtractor={item => item._id}
          renderItem={renderVoucher}
          contentContainerStyle={{ padding: 12 }}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 40 }}>Không có mã nào</Text>
          }
        />
      )}
    </View>
  );
};

export default VoucherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  tabButton: {
    alignItems: 'center',
    paddingBottom: 6,
  },
  tabText: {
    fontSize: 14,
    // color: '#666',
  },
  tabTextActive: {
    fontWeight: 'bold',
    color: '#FF3366',
  },
  tabUnderline: {
    marginTop: 4,
    height: 2,
    backgroundColor: '#FF3366',
    width: 60,
    borderRadius: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 90,
    height: '100%',
    marginRight: 12,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    paddingVertical: 12,
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
    marginBottom: 4,
  },
  desc: {
    fontSize: 13,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#534B4B',
  },
  subDesc: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#534B4B',
  },
  button: {
    paddingVertical: 35,
    borderRadius: 8,
    marginLeft: 8,
    height: '100%',
    width: 50,
  },
  buttonText: {
    flex: 1,
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});

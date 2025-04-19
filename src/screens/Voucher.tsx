import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

interface Voucher {
  id: number;
  code: string;
  image: string;
  description: string;
  discountType: string;
  discountValue: number;
  minOrderValue: number;
  maxDiscountValue: number;
  startDate: string;
  endDate: string;
  maxUser: number;
  userCount: number;
  type: string;
}

const vouchers: Voucher[] = [
  {
    id: 1,
    code: 'VOUCHER2025',
    image: 'https://via.placeholder.com/60',
    description: 'Áp dụng khi thanh toán bằng ví.',
    discountType: 'percent',
    discountValue: 8,
    minOrderValue: 120000,
    maxDiscountValue: 40000,
    startDate: '2025-04-10',
    endDate: '2025-04-30',
    maxUser: 1000,
    userCount: 320,
    type: 'Shopper',
  },
  {
    id: 2,
    code: 'FREESHIP2025',
    image: 'https://via.placeholder.com/60',
    description: 'Miễn phí vận chuyển đơn từ 150k.',
    discountType: 'fixed',
    discountValue: 30000,
    minOrderValue: 150000,
    maxDiscountValue: 30000,
    startDate: '2025-04-10',
    endDate: '2025-04-20',
    maxUser: 1000,
    userCount: 999,
    type: 'Shop',
  },
  // ... thêm các voucher khác
];

const tabs = ['Tất cả', 'Shopper', 'Shop', 'Sắp hết hạn'];

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const isExpiringSoon = (endDate: string) => {
  const today = new Date();
  const end = new Date(endDate);
  const diff = (end.getTime() - today.getTime()) / (1000 * 3600 * 24);
  return diff <= 3 && diff >= 0;
};

const VoucherListWithTabs = () => {
  const [selectedTab, setSelectedTab] = useState('Tất cả');

  const filteredVouchers = vouchers.filter((voucher) => {
    if (selectedTab === 'Tất cả') return true;
    if (selectedTab === 'Sắp hết hạn') return isExpiringSoon(voucher.endDate);
    return voucher.type === selectedTab;
  });

  const renderVoucher = ({ item }: { item: Voucher }) => {
    const isExpired = new Date(item.endDate) < new Date();
    const isFull = item.userCount >= item.maxUser;
    const actionLabel = isExpired || isFull ? 'Hết mã' : 'Dùng ngay';
    const actionColor = isExpired || isFull ? '#ccc' : '#FF3366';

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>
            {item.discountType === 'percent'
              ? `Giảm ${item.discountValue}%`
              : `Giảm ${item.discountValue.toLocaleString()}đ`}
            {item.maxDiscountValue ? `, tối đa ${item.maxDiscountValue.toLocaleString()}đ` : ''}
          </Text>
          <Text style={styles.desc}>{item.description}</Text>
          <Text style={styles.condition}>
            Đơn tối thiểu {item.minOrderValue.toLocaleString()}đ · HSD:{' '}
            {formatDate(item.startDate)} - {formatDate(item.endDate)}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: actionColor }]}
          disabled={isExpired || isFull}
        >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderTab = (tab: string) => {
    const isActive = selectedTab === tab;
    return (
      <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)} style={styles.tabButton}>
        <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
        {isActive && <View style={styles.tabUnderline} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map(renderTab)}
      </View>
      <FlatList
        data={filteredVouchers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVoucher}
        contentContainerStyle={{ padding: 12 }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 40 }}>Không có mã nào</Text>
        }
      />
    </View>
  );
};

export default VoucherListWithTabs;

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
    color: '#666',
  },
  tabTextActive: {
    fontWeight: 'bold',
    color: '#FF3366',
  },
  tabUnderline: {
    marginTop: 4,
    height: 2,
    backgroundColor: '#FF3366',
    width: 30,
    borderRadius: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 15,
    marginBottom: 4,
  },
  desc: {
    color: '#555',
    fontSize: 13,
    marginBottom: 4,
  },
  condition: {
    fontSize: 12,
    color: '#888',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

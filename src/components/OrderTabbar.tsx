import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const tabList = ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao', 'Đã nhận', 'Hủy', 'Chưa thanh toán'];

type OrderTabbarProps = {
  onClick?: (tabValue: string, tabIndex: number) => void;
};

const OrderTabbar = ({ onClick }: OrderTabbarProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ScrollView
      horizontal={true}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsHorizontalScrollIndicator={false}
    >
    {tabList.map((tab, index) => (
      <TouchableOpacity
        key={index}
        style={styles.tab}
        onPress={() => {
          setActiveTab(index);
          onClick?.(tab, index);
        }}
      >
        <Text style={[styles.tabText, activeTab === index && styles.activeText]}>
          {tab}
        </Text>
        {activeTab === index && <View style={styles.underline} />}
      </TouchableOpacity>
    ))}
    </ScrollView>
  );
};

export default OrderTabbar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tab: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    height: 2,
    backgroundColor: '#F1215A',
    width: '100%',
  },
});

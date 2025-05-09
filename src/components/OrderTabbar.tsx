import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Scroll } from 'react-native';

const tabList = ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao', 'Đã nhận', 'Hủy'];

type OrderTabbarProps = {
  onClick?: (tabValue: string, tabIndex: number) => void;
};

const OrderTabbar = ({ onClick }: OrderTabbarProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={styles.container}>
      {tabList.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab}
          onPress={() => {
            setActiveTab(index);
            onClick?.(tab, index); // gọi callback nếu có
          }}
        >
          <Text style={[styles.tabText, activeTab === index && styles.activeText]}>
            {tab}
          </Text>
          {activeTab === index && <View style={styles.underline} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OrderTabbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
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

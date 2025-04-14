import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const tabList = ['Chờ xác nhận', 'Chờ lấy hàng', 'Chờ giao hàng', 'Đã giao'];

const OrderTabbar = () => {
  const [activeTab, setActiveTab] = useState(2);

  return (
    <View style={styles.container}>
      {tabList.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab}
          onPress={() => setActiveTab(index)}
        >
          {/* <Text style={[styles.tabText, activeTab === index && styles.activeText]}>
            {tab}
          </Text>
          {activeTab === index && <View style={styles.underline} />} */}
        </TouchableOpacity>
      ))}
    </View>
  );
};

// const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    color: '#1952A5',
    fontSize: 14,
  },
  activeText: {
    fontWeight: 'bold',
  },
  underline: {
    marginTop: 4,
    height: 2,
    backgroundColor: '#1952A5',
    width: '100%',
  },
});

export default OrderTabbar;

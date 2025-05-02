import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const tabList = ['Chờ xác nhận', 'Chờ lấy hàng', 'Chờ giao hàng', 'Đã giao'];

type OrderTabbarProps = {
  onClick?: (tabValue: string, tabIndex: number) => void;
};

const OrderTabbar = ({ onClick }: OrderTabbarProps) => {
  const [activeTab, setActiveTab] = useState(2);

  return (
    <View style={stylesTab.container}>
      {tabList.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={stylesTab.tab}
          onPress={() => {
            setActiveTab(index);
            console.log(`Clicked tab: ${tab} (${index})`);
            onClick?.(tab, index); // gọi callback nếu có
          }}
        >
          <Text style={[stylesTab.tabText, activeTab === index && stylesTab.activeText]}>
            {tab}
          </Text>
          {activeTab === index && <View style={stylesTab.underline} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};


export default OrderTabbar;

// const screenWidth = Dimensions.get('window').width;

const stylesTab = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    paddingVertical: 10,
    gap: 2,
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
    height: 1,
    backgroundColor: '#F1215A',
    width: '100%',
  },
});
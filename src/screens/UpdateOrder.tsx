import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from '@react-native-vector-icons/ant-design';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../types/data';

const UpdateOrder = () => {
  // const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [expandedOrderIds, setExpandedOrderIds] = useState<number[]>([]);

  const toggleTimeline = (id: number) => {
    setExpandedOrderIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const orderUpdates = [
    {
      id: 1,
      image: require('../assets/images/products/1.png'),
      title: 'Đơn hàng đã hoàn tất',
      desc: 'Đơn hàng DH002 đã hoàn thành. Bạn hãy đánh giá sản phẩm trước ngày 28-02-2025...',
      created_at: '09:00 - 10/04/2025',
      status: 'completed',
      steps: [
        {
          title: 'Nhắc nhở: Bạn đã nhận được hàng chưa?',
          time: '10:15 - 11/04/2025',
        },
        {title: 'Giao kiện hàng thành công', time: '09:00 - 11/04/2025'},
        {title: 'Xác nhận đã nhận hàng', time: '13:00 - 10/04/2025'},
        {
          title: 'Bạn có đơn hàng đang trên đường giao đến',
          time: '11:00 - 10/04/2025',
        },
        {title: 'Đang vận chuyển', time: '10:00 - 10/04/2025'},
        {title: 'Xác nhận đơn hàng', time: '09:00 - 10/04/2025'},
      ],
    },
    {
      id: 2,
      image: require('../assets/images/products/2.png'),
      title: 'Đơn hàng đang giao',
      desc: 'Đơn hàng DH003 đang được giao. Dự kiến đến vào ngày 15-04-2025...',
      created_at: '08:30 - 12/04/2025',
      status: 'delivering',
      steps: [
        {title: 'Xác nhận đơn hàng', time: '08:30 - 12/04/2025'},
        {title: 'Đang xử lý', time: '09:00 - 12/04/2025'},
        {title: 'Đã bàn giao cho đơn vị vận chuyển', time: '12:00 - 12/04/2025'},
        {title: 'Đang vận chuyển', time: '13:30 - 12/04/2025'},
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{paddingHorizontal: 10}}>
          {orderUpdates.map(order => (
            <View key={order.id} style={styles.orderBox}>
              <TouchableWithoutFeedback onPress={() => toggleTimeline(order.id)}>
                <View style={styles.orderHeader}>
                  <Image source={order.image} style={styles.orderImage} />
                  <View style={{flex: 1}}>
                    <Text style={styles.orderTitle}>{order.title}</Text>
                    <Text style={styles.orderDesc}>{order.desc}</Text>
                    <Text style={styles.orderTime}>{order.created_at}</Text>
                  </View>
                  <Icon
                    name={expandedOrderIds.includes(order.id) ? 'up' : 'down'}
                    size={16}
                    color="#ff3366"
                    style={styles.expandIcon}
                  />
                </View>
              </TouchableWithoutFeedback>

              {expandedOrderIds.includes(order.id) && (
                <View style={styles.timelineWrapper}>
                  {order.steps.map((step, index) => (
                    <View key={index} style={styles.timelineItem}>
                      <View style={styles.timelineDot} />
                      {index !== order.steps.length - 1 && (
                        <View style={styles.timelineLine} />
                      )}
                      <View style={styles.timelineContent}>
                        <Text style={styles.timelineText}>{step.title}</Text>
                        <Text style={styles.timelineTime}>{step.time}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default UpdateOrder;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E7E1E1'},
  quickList: {marginTop: 10},
  quickItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
  },
  quickLeft: {flexDirection: 'row', alignItems: 'center'},
  quickType: {fontSize: 16, fontWeight: 'bold'},
  quickDesc: {fontSize: 13, color: '#777'},
  quickRight: {
    flexDirection: 'row',
    gap: 6,
  },
  quantity: {
    backgroundColor: '#ff3366',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  quantityText: {color: '#fff', fontSize: 12},

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  sectionTitle: {fontSize: 18, fontWeight: 'bold'},
  seeAll: {fontSize: 14, color: '#ff3366'},

  orderBox: {
    marginTop: 10,
    backgroundColor: '#fdfdfd',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  orderHeader: {flexDirection: 'row', marginBottom: 10},
  orderImage: {width: 60, height: 60, borderRadius: 10, marginRight: 10},
  orderTitle: {fontSize: 16, fontWeight: 'bold'},
  orderDesc: {fontSize: 13, color: '#444'},
  orderTime: {
    fontSize: 12, 
    color: '#888',
  },

  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  timelineHeaderText: {fontSize: 16, fontWeight: 'bold'},
  expandIcon: {marginTop: 5},

  timelineWrapper: {marginLeft: 20, paddingVertical: 10},
  timelineItem: {position: 'relative', paddingLeft: 20, marginBottom: 20},
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff3366',
    position: 'absolute',
    left: 0,
    top: 4,
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: '#ff3366',
    position: 'absolute',
    left: 4,
    top: 14,
  },
  timelineContent: {marginLeft: 10},
  timelineText: {fontSize: 14, fontWeight: '500'},
  timelineTime: {fontSize: 12, color: '#777'},
});

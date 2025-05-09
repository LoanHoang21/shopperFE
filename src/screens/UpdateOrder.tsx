import React, { useState, useEffect } from 'react';
import { View,Text,StyleSheet,ScrollView,Image,TouchableWithoutFeedback,RefreshControl,TouchableOpacity} from 'react-native';
import Icon from '@react-native-vector-icons/ant-design';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllNotiType } from '../apis/NotiType';
import { getNotiUpdateOrder } from '../apis/Noti';
import { useNavigation } from '@react-navigation/native';

const NotiType = () => {
  const navigation = useNavigation();
  const [expandedOrderIds, setExpandedOrderIds] = useState<number[]>([]);
  const [orderUpdates, setOrderUpdates] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrderUpdates = async () => {
    const userData = await AsyncStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    if (!user?._id) {return;}

    const typeRes = await getAllNotiType();
    const notiTypes = typeRes.data?.DT || [];
    const updateType = notiTypes.find((type: any) => type.name === 'Cập nhật đơn hàng');
    if (!updateType) {return;}

    const res = await getNotiUpdateOrder(user._id, updateType._id);
    const data = res.data?.DT || [];

    const formatted = data.map((group: any, index: number) => {
      const notis = group.notiOrder || [];
      const [firstNoti, ...otherNotis] = notis;

      return {
        id: index + 1,
        image: firstNoti?.image || 'https://res.cloudinary.com/dr0ncakbs/image/upload/v1745094764/6_qhcsdo.jpg',
        title: firstNoti?.name || 'Cập nhật đơn hàng',
        desc: firstNoti?.description || '',
        created_at: new Date(firstNoti?.createdAt).toLocaleString('vi-VN'),
        steps: otherNotis.map((n: any) => ({
          title: n.name,
          desc: n.description,
          time: new Date(n.createdAt).toLocaleString('vi-VN'),
        })),
      };
    });

    setOrderUpdates(formatted);
  };

  useEffect(() => {
    fetchOrderUpdates();
  }, []);

  const toggleTimeline = (id: number) => {
    setExpandedOrderIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrderUpdates();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.wrapper}>
      {orderUpdates.length > 0 ? (
            orderUpdates.map(order => (
              <View key={order.id} style={styles.orderBox}>
                <TouchableWithoutFeedback
                  onPress={() => toggleTimeline(order.id)}>
                  <View style={styles.orderHeader}>
                    <Image
                      source={{uri: order.image}}
                      style={styles.orderImage}
                    />
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
                    {order.steps.map((step: any, index: any) => (
                      <View key={index} style={styles.timelineItem}>
                        <View style={styles.timelineDot} />
                          <View style={styles.timelineLine} />
                          <View style={styles.timelineContent}>
                            <Text style={styles.timelineText}>{step.title}</Text>
                            <Text style={styles.orderDesc}>{step.desc}</Text>
                            <Text style={styles.timelineTime}>{step.time}</Text>
                          </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))
          ) : (
              <View style={styles.containerEmpty}>
                  <Image
                  source={require('../assets/images/cart_large.png')}
                  style={styles.cartImage}
                  resizeMode="contain"
                  />
                  <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('home')}}>
                      <Text style={styles.buttonText}>Mua sắm ngay</Text>
                  </TouchableOpacity>
              </View>
          )}
      </View>
    </ScrollView>
  );
};

export default NotiType;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E7E1E1' },
  wrapper: { paddingHorizontal: 10, paddingVertical: 12 },
  orderBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    elevation: 2,
  },
  orderHeader: {flexDirection: 'row', marginBottom: 10},
  orderImage: {width: 60, height: 60, borderRadius: 10, marginRight: 10},
  orderTitle: {fontSize: 16, fontWeight: 'bold'},
  orderDesc: {color: '#534B4B', fontStyle:'italic'},
  orderTime: {fontSize: 12, color: '#888'},
  expandIcon: { marginTop: 5 },
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
    height: 115,
    backgroundColor: '#ff3366',
    position: 'absolute',
    left: 4,
    top: 14,
  },
  timelineContent: {marginLeft: 10},
  timelineText: {fontSize: 15, fontWeight: '500'},
  timelineTime: {fontSize: 12, color: '#777'},
  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  cartImage: {
    width: 80,
    height: 80,
    tintColor: '#F1215A',
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderColor: '#F1215A',
    borderWidth: 1.5,
    borderRadius: 10,
  },
  buttonText: {
    color: '#F1215A',
    fontSize: 15,
  },
});

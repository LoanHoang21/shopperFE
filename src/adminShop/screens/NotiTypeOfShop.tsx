import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl} from 'react-native';
import Icon from '@react-native-vector-icons/ant-design';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getAllNotiType, getQuantityNoti} from '../../apis/NotiType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '../../types/data';

interface INotiType {
  _id: string;
  image: string;
  name: string;
  description: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  quantity: number;
}

const NotiTypeOfShop = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [typeNotis, setTypeNotis] = useState<INotiType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState(null);
  // const [orderUpdates, setOrderUpdates] = useState<any[]>([]);

  const fetchUserId = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserId(user._id);
      return user._id;
    }
    return null;
  };

  // const fetchOrderUpdates = async (userIdLocal: string, notitypes: INotiType[]) => {
  //   try {
  //     const updateNotiType = notitypes.find(type => type.name === 'Cập nhật đơn hàng');
  //     if (!updateNotiType) {return;}

  //     const res = await getTwoNotiUpdateOrderLastest(userIdLocal, updateNotiType._id);
  //     const data = res.data?.DT || [];

  //     // Duyệt qua từng nhóm thông báo theo order_id
  //     const formatted = data.map((group: any, index: number) => {
  //       const notis = group.notiOrder || [];
  //       const [firstNoti, ...otherNotis] = notis;

  //       return {
  //         id: index + 1,
  //         image: firstNoti?.image || 'https://res.cloudinary.com/dr0ncakbs/image/upload/v1746369375/default_pyru0w.png',
  //         title: firstNoti?.name || 'Cập nhật đơn hàng',
  //         desc: firstNoti?.description || '',
  //         created_at: new Date(firstNoti?.createdAt).toLocaleString('vi-VN'),
  //         steps: otherNotis.map((n: any) => ({
  //           title: n.name,
  //           desc: n.description,
  //           time: new Date(n.createdAt).toLocaleString('vi-VN'),
  //         })),
  //       };
  //     });
  //     setOrderUpdates(formatted);
  //   } catch (error) {
  //     console.error('Lỗi khi lấy cập nhật đơn hàng:', error);
  //   }
  // };

  const fetchNotiTypesWithQuantity = async () => {
    try {
      const [userIdLocal, response] = await Promise.all([
        fetchUserId(),
        getAllNotiType(),
      ]);

      if (!userIdLocal) return;

      const notiTypes = response.data.DT;

      // Lấy số lượng thông báo cho từng loại
      const notiWithQuantities = await Promise.all(
        notiTypes.map(async (item: INotiType) => {
          try {
            const quantityRes = await getQuantityNoti(userIdLocal, item._id);
            return {...item, quantity: quantityRes.data.DT || 0};
          } catch (error) {
            console.error('Lỗi khi lấy số lượng thông báo:', error);
            return {...item, quantity: 0};
          }
        }),
      );
      setTypeNotis(notiWithQuantities);
      // fetchOrderUpdates(userIdLocal, notiWithQuantities);
    } catch (error) {
      console.error('Lỗi khi fetch dữ liệu:', error);
    }
  };

  useEffect(() => {
    fetchNotiTypesWithQuantity();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotiTypesWithQuantity().finally(() => setRefreshing(false));
  }, []);

  // const toggleTimeline = (id: number) => {
  //   setExpandedOrderIds(prev =>
  //     prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
  //   );
  // };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{paddingHorizontal: 10}}>
          <View style={styles.quickList}>
            {typeNotis.map(item => (
              <TouchableOpacity
                key={item._id}
                onPress={() =>
                  navigation.navigate('notiTypeDetailsOfShop', {
                    _id: item._id,
                    name: item.name,
                  })
                }>
                {/* {item.name !== 'Cập nhật đơn hàng' && ( */}
                  <View style={styles.quickItem}>
                    <View style={styles.quickLeft}>
                      <Image source={{uri: item.image}} style={styles.image} />
                      <View style={styles.quickContent}>
                        <Text style={styles.quickType}>{item.name}</Text>
                        <Text style={styles.quickDesc}>Xem ngay các thông báo <Text style = {{color: 'blue'}}>{item.name}</Text> tại đây</Text>
                      </View>
                    </View>
                    <View style={styles.quickRight}>
                      <View style={styles.quantity}>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                      </View>
                      <Icon name="arrow-right" size={18} color="#777" />
                    </View>
                  </View>
                {/* )} */}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

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
  quickLeft: {flexDirection: 'row', gap: 12, alignItems: 'center', flex: 1},
  image: {width: 45, height: 45, borderRadius: 8},
  quickContent: {
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  quickType: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
    flexWrap: 'wrap',
    width: '100%',
  },
  quickDesc: {
    color: '#534B4B',
    flexShrink: 1,
    flexWrap: 'wrap',
    width: '100%',
  },
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
  seeAll: {color: '#ff3366'},

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
  orderDesc: {color: '#534B4B', fontStyle:'italic'},
  orderTime: {fontSize: 12, color: '#888'},

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

export default NotiTypeOfShop;

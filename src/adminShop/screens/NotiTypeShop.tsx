import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert,TouchableWithoutFeedback } from 'react-native';
import {getAllNotiType} from '../../apis/NotiType';
import { useNavigation } from '@react-navigation/native';

interface INotiType {
  _id: string;
  image: string;
  name: string;
  description: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

const NotiTypeShop = () => {
  const navigation = useNavigation();
  const [notiTypes, setNotiTypes] = useState<INotiType[]>([]);

  const fetchData = async () => {
    try {
      const res = await getAllNotiType();
      if (res && res.data) {
        setNotiTypes(res.data.DT);
      } else {
        Alert.alert('Lỗi', 'Không thể tải dữ liệu');
      }
    } catch (error) {
      console.error('Lỗi khi lấy loại thông báo:', error);
      Alert.alert('Lỗi', 'Không thể kết nối đến server');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusStyle = (status: number) => {
    return status === 1 ? styles.active : styles.inactive;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {notiTypes.map(item => (
          <TouchableWithoutFeedback
            key={item._id}
            onPress={() => navigation.navigate('notiShop', {
              _id: item._id,
              name: item.name,
            })}
          >
          <View
            key={item._id}
            style={[styles.itemContainer, getStatusStyle(item.status)]}>
            <View style={styles.leftContainer}>
              {/* <View style={styles.borderImage}> */}
              <Image source={{uri: item.image}} style={styles.image} />
              {/* </View> */}
              <View style={{flexShrink: 1}}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#f9f9f9'},
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  addButton: {
    alignSelf: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#fff',
  },
  leftContainer: {flexDirection: 'row', gap: 15, alignItems: 'center', flex: 1},
  // borderImage: {borderRadius: 50, borderWidth: 1, padding: 8},
  image: {width: 45, height: 45},
  name: {fontSize: 18, fontWeight: 'bold'},
  description: {fontSize: 14, flexWrap: 'wrap'},
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  active: {backgroundColor: '#e6f4ea'},
  inactive: {backgroundColor: '#f0f0f0'},
});

export default NotiTypeShop;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import NotiTypeModel from './NotiTypeModel';

interface INotiType {
  _id: string;
  image: string;
  name: string;
  description: string;
  status: number;
  quantity: number;
}

const NotiTypeAdmin = () => {
  const [notiTypes, setNotiTypes] = useState<INotiType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotiType, setSelectedNotiType] = useState<INotiType | null>(null);

  // Fake data for now
  useEffect(() => {
    const fakeData: INotiType[] = [
      {
        _id: '1',
        image: 'https://cdn-icons-png.flaticon.com/512/8244/8244689.png',
        name: 'Khuyến mãi',
        description: 'Mã giảm giá, ưu đãi mới nhất mỗi ngày',
        status: 1,
        quantity: 20,
      },
      {
        _id: '2',
        image: 'https://cdn-icons-png.flaticon.com/512/1827/1827504.png',
        name: 'Cập nhật',
        description: 'Cập nhật các thay đổi và chính sách',
        status: 0,
        quantity: 3,
      },
      {
        _id: '3',
        image: 'https://cdn-icons-png.flaticon.com/512/190/190406.png',
        name: 'Nhắc nhở',
        description: 'Nhắc nhở đánh giá, mua hàng sớm',
        status: 1,
        quantity: 7,
      },
    ];
    setNotiTypes(fakeData);
  }, []);

  const handleAdd = () => {
    setSelectedNotiType(null);
    setModalVisible(true);
  };

  const handleEdit = (noti: INotiType) => {
    setSelectedNotiType(noti);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setNotiTypes((prev) => prev.filter((noti) => noti._id !== id));
  };

  const getStatusStyle = (status: number) => {
    return status === 1 ? styles.active : styles.inactive;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh sách loại thông báo</Text>
        <TouchableOpacity onPress={handleAdd}>
          <Icon name="pluscircleo" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {notiTypes.map((item) => (
          <View key={item._id} style={[styles.itemContainer, getStatusStyle(item.status)]}>
            <View style={styles.leftContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Icon name="edit" size={20} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item._id)}>
                <Icon name="delete" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <NotiTypeModel
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSuccess={() => {}}
        initialData={selectedNotiType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
  },
  leftContainer: { flexDirection: 'row', gap: 10 },
  image: { width: 40, height: 40, borderRadius: 8 },
  name: { fontSize: 16, fontWeight: 'bold' },
  description: { fontSize: 13, color: '#666' },
  rightContainer: { alignItems: 'flex-end', gap: 8 },
  quantity: { fontSize: 14, color: '#333' },
  active: { backgroundColor: '#d4edda' },
  inactive: { backgroundColor: '#e2e3e5' },
});

export default NotiTypeAdmin;

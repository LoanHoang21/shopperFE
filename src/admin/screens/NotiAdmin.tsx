import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '@react-native-vector-icons/ant-design';
import IconFontawesome from '@react-native-vector-icons/fontawesome';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteNotiByAdmin, getAllNotiBySenderIdAndNotiType} from '../../apis/Noti';
import { RootStackParamList } from '../../types/data';
import HeaderNotificationAdmin from '../components/headers/HeaderNotificationAdmin';
import NotiModel from './NotiModel';
import DeleteConfirmModal from '../components/DeleteConfirmModel';

export interface INoti {
    _id: string;
    name: string;
    image: string;
    image_sub: string[];
    description: string;
    notitype_id: string;
    order_id?: string;
    receiver_id: string;
    sender_id: string;
    is_read: boolean;
    createdAt: string;
    updatedAt: string;
  }

const NotiAdmin = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNoti, setSelectedNoti] = useState<INoti | null>(
        null,
    );
    const [refreshing, setRefreshing] = useState(false);
    const [notis, setNotis] = useState<INoti[]>([]);
    type NotiRouteProp = RouteProp<RootStackParamList, 'notiAdmin'>;
    // type NotiRouteProp = RouteProp<RootStackParamList, 'notiAdmin'>;
    type NavigationType = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationType>();
    const route = useRoute<NotiRouteProp>();
    const notiTypeId = route.params?._id;
    const [filter, setFilter] = useState<string>('all'); // Trạng thái lọc
    const [userId, setUserId] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [notiIdDelete, setNotiIdDelete] = useState<string | null>(null);

    const fetchUserId = async () => {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUserId(user._id);
          return user._id;
        }
        return null;
      };
      const getAllNoti = useCallback(async () => {
        try {
            const uid = await fetchUserId();
            if (!uid) {return;}

            const res = await getAllNotiBySenderIdAndNotiType(uid, notiTypeId);
            if (res?.data?.DT) {
                setNotis(res.data.DT);
            }
        } catch (e) {
            console.log('Lấy tất cả thông báo theo loại thông báo thất bại', e);
        }
    }, [notiTypeId]);

    useEffect(() => {
    getAllNoti();
}, [notiTypeId, getAllNoti]);

const handleRefresh = async () => {
    setRefreshing(true);
    await getAllNoti();
    setRefreshing(false);
};

  const handleAdd = () => {
    setSelectedNoti(null);
    setModalVisible(true);
    setIsEdit(false);
  };

  const handleEdit = (noti: INoti) => {
    setSelectedNoti(noti);
    setModalVisible(true);
    setIsEdit(true);
  };

    const handleDelete = (id: string) => {
        setNotiIdDelete(id);
        setDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        if (notiIdDelete) {
            try {
                const res = await deleteNotiByAdmin(notiIdDelete);
                if (res && res.data.EC === 0) {
                  setNotis(prev => prev.filter(noti => noti._id !== notiIdDelete));
                } else {
                  Alert.alert('Lỗi', 'Xóa thông báo thất bại.');
                }
              } catch (error) {
                Alert.alert('Lỗi', 'Đã có lỗi xảy ra.');
              } finally {
                setDeleteModalVisible(false);
                setNotiIdDelete(null);
              }
        }
      };

      const cancelDelete = () => {
        setDeleteModalVisible(false);
        setNotiIdDelete(null);
      };

    const filterNotisByTime = useCallback((noti: any) => {
        const today = new Date();
        const notiDate = new Date(noti.updatedAt);  // Sử dụng định dạng ngày tháng

        switch (filter) {
            case 'today':
                return today.toDateString() === notiDate.toDateString();
            case 'this_week':
                const day = today.getDay();
                const diffToSunday = today.getDate() - day;
                const startOfWeek = new Date(today);
                startOfWeek.setDate(diffToSunday);
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                return notiDate >= startOfWeek && notiDate <= endOfWeek;
            case 'this_month':
                return (
                    today.getMonth() === notiDate.getMonth() &&
                    today.getFullYear() === notiDate.getFullYear()
                );
            // case 'read':
            //     return noti.is_read;
            // case 'unread':
            //     return !noti.is_read;
            case 'all':
            default:
                return true;
        }
    }, [filter]);

    const filterNotisTime = notis.filter(noti => {
        const isTypeMatch = noti.notitype_id === notiTypeId;
        return isTypeMatch && filterNotisByTime(noti);
    });

    const filterOptions = [
        { label: 'Tất cả thông báo', value: 'all' },
        { label: 'Thông báo hôm nay', value: 'today' },
        { label: 'Thông báo tuần này', value: 'this_week' },
        { label: 'Thông báo tháng này', value: 'this_month' },
    ];

    const renderItem = ({ item }: { item: INoti }) => {
        return (
            <TouchableOpacity>
                <View style={styles.quickItem}>
                    <View style={styles.quickLeft}>
                        <Image
                            source={{uri: item.image}}
                            style={styles.mainImage}
                            resizeMode="contain"
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.quickType}>{item.name}</Text>
                            <Text style={styles.quickDesc}>{item.description}</Text>
                            <View style={styles.subImagesContainer}>
                                {item.image_sub.map((imgSrc, index) => (
                                    <Image key={index} source={{uri: imgSrc}} style={styles.subImage} />
                                ))}
                            </View>
                            <Text style={styles.time}>{new Date(item.updatedAt).toLocaleString('vi-VN')}</Text>
                        </View>
                    </View>
                    <View style={styles.quickRight}>
                        <TouchableOpacity style={styles.iconEdit} onPress={() => handleEdit(item)}>
                            <Icon name="edit" size={25} color = "blue"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconDelete} onPress={() => handleDelete(item._id)}>
                            <Icon name="delete" size={25} color={'red'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <HeaderNotificationAdmin/>,
        });
    }, []);

    return (
        <View style={styles.container}>
            {/* Thanh lọc */}
            <View style={styles.filterContainer}>
                <Dropdown
                    style={styles.dropdown}
                    data={filterOptions}
                    labelField="label"
                    valueField="value"
                    placeholder="Chọn bộ lọc"
                    value={filter}
                    onChange={(item) => setFilter(item.value)}
                    renderLeftIcon={() => (
                        <Icon name="filter" size={20} color="#666" style={{ marginRight: 5,}} />
                    )}
                />
            </View>
            <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
                <IconFontawesome name="plus-square-o" size={45} color="#ff3366" />
            </TouchableOpacity>
            <FlatList
                data={filterNotisTime}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.quickList}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            />
                <NotiModel
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSuccess={fetchUserId}
                    initialData={selectedNoti}
                    isEdit={isEdit}
                    notiTypeId = {notiTypeId}
                    senderId = {userId}
                />
                <DeleteConfirmModal
                    visible={deleteModalVisible}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />

        </View>
    );
};

export default NotiAdmin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    quickList: {
        marginTop: 10,
        paddingHorizontal: 10,
    },
    quickItem: {
        flexDirection: 'row',
        padding: 12,
        marginVertical: 6,
        borderRadius: 10,
        backgroundColor: '#DBF3FF',
        borderWidth: 0.2,
        borderColor: 'black',
    },
    quickLeft: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
    },
    mainImage: {
        width: 70,
        height: '100%',
        marginRight: 20,
    },
    quickType: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    quickDesc: {
        fontSize: 15,
        flexShrink: 1,
        flexWrap: 'wrap',
        fontStyle:'italic',
    },
    subImagesContainer: {
        flexDirection: 'row',
        marginTop: 8,
        gap: 6,
    },
    subImage: {
        borderRadius: 6,
    },
    time: {
        fontSize: 13,
        flexShrink: 1,
        flexWrap: 'wrap',
        fontStyle:'italic',
    },
    quickRight: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    iconArrow: {
        flex: 1,
        justifyContent: 'center',
    },
    iconEdit: {
        flex: 1,
        justifyContent: 'center',
    },
    iconDelete: {
        flex: 1,
        justifyContent: 'center',
    },
    dropdown: {
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 18,
        backgroundColor: '#fff',
    },
    filterContainer: {
        // marginHorizontal: 10,
        // marginTop: 10,
        // backgroundColor: 'white',
        // borderRadius: 8,
    },
    addButton: {
        paddingTop: 20,
        alignSelf: 'center',
    },
});

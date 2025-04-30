import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from '@react-native-vector-icons/ant-design';
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import AllReadModal from "../components/navigation/AllReadModal";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {Dropdown} from 'react-native-element-dropdown';
import HeaderNotification from "../components/headers/HeaderNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllNotiByNotiType, updateStatusNoti } from "../apis/Noti";

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
  

const NotiTypeDetails = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [notis, setNotis] = useState<INoti[]>([]);
    type NotiRouteProp = RouteProp<RootStackParamList, 'notiTypeDetails'>;
    type NavigationType = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationType>();
    const route = useRoute<NotiRouteProp>();
    const notiTypeId = route.params?._id;
    const [filter, setFilter] = useState<string>('all'); // Trạng thái lọc
    const [userId, setUserId] = useState(null);

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
            if (!uid) return;
    
            const res = await getAllNotiByNotiType(uid, notiTypeId);
            if (res?.data?.DT) {
                setNotis(res.data.DT);
            }
        } catch (e) {
            console.log("Lấy tất cả thông báo theo loại thông báo thất bại", e);
        }
    }, [notiTypeId]);
    
    useEffect(() => {
    getAllNoti();
}, [notiTypeId, getAllNoti]);  // Thêm getAllNoti vào danh sách phụ thuộc

const handleRefresh = async () => {
    setRefreshing(true);
    await getAllNoti();
    setRefreshing(false);
};
    // const filterNotis = notis.filter(noti => noti._id === notiTypeId);

    const handlePress = async (id: string) => {
        try {
            // Gọi API cập nhật trạng thái is_read = true
            await updateStatusNoti(id, true);
    
            // Cập nhật local state sau khi cập nhật thành công
            const updatedNotis = notis.map(noti =>
                noti._id === id ? { ...noti, is_read: true } : noti
            );
            setNotis(updatedNotis);
    
            // Điều hướng nếu cần
            navigation.navigate('voucher');
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái thông báo:', error);
        }
    };

    // const formatDate = (dateStr: string): string => {
    //     const date = new Date(dateStr); // Chuyển chuỗi thành đối tượng Date
        
    //     const day = String(date.getDate()).padStart(2, '0'); // Đảm bảo ngày có 2 chữ số
    //     const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tính từ 0)
    //     const year = date.getFullYear(); // Lấy năm
    //     const hours = String(date.getHours()).padStart(2, '0'); // Lấy giờ
    //     const minutes = String(date.getMinutes()).padStart(2, '0'); // Lấy phút
        
    //     // Định dạng theo kiểu '00:00 27-02-2025'
    //     return `${hours}:${minutes} ${day}-${month}-${year}`;
    // };
    
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
            case 'read':
                return noti.is_read;
            case 'unread':
                return !noti.is_read;
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
        { label: 'Thông báo đã đọc', value: 'read' },
        { label: 'Thông báo chưa đọc', value: 'unread' },
    ]; 

    const renderItem = ({ item }: { item: INoti }) => {
        return (
            <TouchableOpacity onPress={() => { handlePress(item._id); }}>
                <View style={[styles.quickItem, { backgroundColor: item.is_read ? 'white' : '#DBF3FF' }]}>
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
                        {item.is_read === false && (
                            <View style={styles.quantity}>
                                <Text style={styles.quantityText}>N</Text>
                            </View>
                        )}
                        <View style={styles.iconArrow}>
                            <Icon name="right" size={18} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    

    const handleMarkAllAsRead = () => {
        const updatedNotis = notis.map(noti =>
            filterNotisTime.some(filtered => filtered._id === noti._id)
                ? { ...noti, is_read: true }
                : noti
        );
        setNotis(updatedNotis);
        setModalVisible(false);
    };

    const itemCount = notis.length;
    // const unreadCount = notis.filter(noti => !noti.is_read).length;
    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <HeaderNotification 
            onOpenMarkAllModal={() => setModalVisible(true)}
            itemCount={itemCount}
            />,
        });
    }, [navigation, itemCount]);

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
            {/* Nút mở modal đánh dấu đã đọc tất cả */}
            {/* <TouchableOpacity
                style={styles.markAllButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.markAllText}>Đánh dấu tất cả đã đọc</Text>
            </TouchableOpacity> */}
            <FlatList
                data={filterNotisTime}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.quickList}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            />
            <AllReadModal
                visible={modalVisible}
                onConfirm={handleMarkAllAsRead}
                onCancel={() => setModalVisible(false)}
            />
        </View>
    );
};

export default NotiTypeDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7E1E1',
    },
    quickList: {
        marginTop: 10,
        paddingHorizontal: 10,
    },
    quickItem: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        padding: 12,
        marginVertical: 6,
        borderRadius: 10,
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
        // borderWidth: 2,
        // borderColor: 'green',
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
    quantity: {
        backgroundColor: '#ff3366',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    quantityText: {
        color: 'white',
        fontSize: 12,
        fontStyle:'italic',
    },
    iconArrow: {
        flex: 1,
        justifyContent: 'center',
    },
    markAllButton: {
        backgroundColor: '#ff3366',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10,
      },
    markAllText: {
        color: '#fff',
        fontWeight: '600',
    },
    dropdown: {
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 18,
        backgroundColor: '#fff',
        // marginHorizontal: 10,
        // marginTop: 10,
    },
    filterContainer: {
        // marginHorizontal: 10,
        // marginTop: 10,
        // backgroundColor: 'white',
        // borderRadius: 8,
    },
});

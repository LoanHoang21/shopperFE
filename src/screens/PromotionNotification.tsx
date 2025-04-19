import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from '@react-native-vector-icons/ant-design';
import React, { useCallback, useLayoutEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import AllReadModal from "../components/navigation/AllReadModal";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {Dropdown} from 'react-native-element-dropdown';
import HeaderNotification from "../components/headers/HeaderNotification";

interface INoti {
    id: number,
    name: string,
    desc: string,
    main_image: any,
    sub_image: {
        image1: any,
        image2: any,
        image3: any,
    },
    created_at: string,
    is_read: boolean,
    id_type_noti: number,
}

const PromotionNotification = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [notis, setNotis] = useState<INoti[]>([
        {
            id: 1,
            name: 'Đơn hàng đang vận chuyển',
            desc: 'Đơn hàng DH001 với mã vận đơn VC001 đã được người bán Happy Bedding giao cho đơn vị vận chuyển. Dự kiến được giao trong 1-2 ngày tới và để theo dõi trạng thái đơn hàng vui lòng truy cập vào mục Chi tiết đơn hàng',
            main_image: require("../assets/images/products/1.png"),
            sub_image: {
                image1: undefined,
                image3: undefined,
                image2: undefined,
            },
            created_at: "11:52 25-02-2025",
            is_read: false,
            id_type_noti: 2,
        },
        {
            id: 2,
            name: 'Chốt đơn sản phẩm thịnh hành',
            desc: 'hoangloan21112003 ơi, mua ngay Giày Búp Bê Lolita bán chạy nhất TẠI ĐÂY 👉',
            main_image: require("../assets/images/notification/1.png"),
            sub_image: {
                image1: require('../assets/images/products/4.png'),
                image2: require('../assets/images/products/5.png'),
                image3: require('../assets/images/products/6.png'),
            },
            created_at: "10:15 11/04/2025",
            is_read: true,
            id_type_noti: 3,
        },
        {
            id: 3,
            name: 'Chốt đơn sản phẩm thịnh hành',
            desc: 'hoangloan21112003 ơi, mua ngay Giày Búp Bê Lolita bán chạy nhất TẠI ĐÂY 👉',
            main_image: require("../assets/images/notification/1.png"),
            sub_image: {
                image1: require('../assets/images/products/6.png'),
                image2: require('../assets/images/products/7.png'),
                image3: require('../assets/images/products/8.png'),
            },
            created_at: "10:15 11/04/2025",
            is_read: false,
            id_type_noti: 3,
        },
        {
            id: 4,
            name: 'Chốt đơn sản phẩm thịnh hành',
            desc: 'hoangloan21112003 ơi, mua ngay Giày Búp Bê Lolita bán chạy nhất TẠI ĐÂY 👉',
            main_image: require("../assets/images/notification/1.png"),
            sub_image: {
                image1: require('../assets/images/products/6.png'),
                image2: require('../assets/images/products/7.png'),
                image3: require('../assets/images/products/8.png'),
            },
            created_at: "10:15 15/04/2025",
            is_read: false,
            id_type_noti: 1,
        },
        {
            id: 5,
            name: 'Đơn hàng đã hoàn tất',
            desc: 'Đơn hàng DH002 đã hoàn thành. Bạn hãy đánh giá sản phẩm trước ngày 28-02-2025 để nhận được ưu đãi cho lần mua hàng tiếp theo và giúp người dùng khác hiểu hơn về sản phẩm nhé!',
            main_image: require("../assets/images/products/2.png"),
            sub_image: {
                image1: undefined,
                image2: undefined,
                image3: undefined,
            },
            created_at: "00:00 24-02-2025",
            is_read: true,
            id_type_noti: 2,
        },
        {
            id: 6,
            name: 'Chốt đơn sản phẩm thịnh hành',
            desc: 'hoangloan21112003 ơi, mua ngay Giày Búp Bê Lolita bán chạy nhất TẠI ĐÂY 👉',
            main_image: require("../assets/images/notification/1.png"),
            sub_image: {
                image1: require('../assets/images/products/6.png'),
                image2: require('../assets/images/products/7.png'),
                image3: require('../assets/images/products/8.png'),
            },
            created_at: "10:15 11/04/2025",
            is_read: false,
            id_type_noti: 1,
        },
        {
            id: 7,
            name: 'Chốt đơn sản phẩm thịnh hành',
            desc: 'hoangloan21112003 ơi, mua ngay Giày Búp Bê Lolita bán chạy nhất TẠI ĐÂY 👉',
            main_image: require("../assets/images/notification/1.png"),
            sub_image: {
                image1: require('../assets/images/products/6.png'),
                image2: require('../assets/images/products/7.png'),
                image3: require('../assets/images/products/8.png'),
            },
            created_at: "10:15 11/04/2025",
            is_read: false,
            id_type_noti: 1,
        },
        {
            id: 8,
            name: '💖 Bạn ơi, Shopper cần bạn!',
            desc: 'Bạn đã từng nghe đến các chương trình siêu HOT ở Shopper chưa? Chia sẻ với Shopee TẠI ĐÂY nhé!',
            main_image: require("../assets/images/notification/default.png"),
            sub_image:{
                image1: undefined,
                image2: undefined,
                image3: undefined,
            },
            created_at: "00:00 24/02/2025",
            is_read: false,
            id_type_noti: 2,
        },
        {
            id: 9,
            name: '😊 Bạn thấy Shopper giao hàng thế nào?',
            desc: 'Chia sẻ ngay TẠI ĐÂY để có cơ hội nhận VOUCHER 200K nhé!',
            main_image: require("../assets/images/notification/default.png"),
            sub_image: {
                image1: undefined,
                image2: undefined,
                image3: undefined,
            },
            created_at: "18:06 23/02/2025",
            is_read: true,
            id_type_noti: 2,
        },
    ]);
    type NotiRouteProp = RouteProp<RootStackParamList, 'promotionNotification'>;
    type NavigationType = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationType>();
    const route = useRoute<NotiRouteProp>();
    const id_type_notification = route.params?.id;
    const [filter, setFilter] = useState<string>('all'); // Trạng thái lọc

    // const filterNotis = notis.filter(noti => noti.id_type_noti === id_type_notification);

    const handlePress = (id: number) => {
        // Cập nhật trạng thái is_read = true
        const updatedNotis = notis.map(noti =>
            noti.id === id ? { ...noti, is_read: true } : noti
        );
        setNotis(updatedNotis);

        // Điều hướng sang trang chi tiết (bạn đổi 'NotificationDetail' thành tên màn hình thật)
        // navigation.navigate('home');
    };

    const parseDate = (str: string) => {
        const [time, date] = str.split(' ');
        const [day, month, year] = date.split(/[-/]/);
        const [hour, minute] = time.split(':');
        return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
    };
    const filterNotisByTime = useCallback((noti: INoti) => {
        const today = new Date();
        const notiDate = parseDate(noti.created_at);

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
        const isTypeMatch = noti.id_type_noti === id_type_notification;
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

    const renderItem = ({ item }: { item: INoti }) => (
        <TouchableOpacity onPress={() => {handlePress(item.id)}}>
            <View style={[styles.quickItem, { backgroundColor: item.is_read ? 'white' : '#DBF3FF' }]}>
                <View style={styles.quickLeft}>
                    <Image
                        source={item.main_image}
                        style={styles.mainImage}
                        resizeMode="contain"
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.quickType}>{item.name}</Text>
                        <Text style={styles.quickDesc}>{item.desc}</Text>
                        <View style={styles.subImagesContainer}>
                            <Image source={item.sub_image.image1} style={styles.subImage} />
                            <Image source={item.sub_image.image2} style={styles.subImage} />
                            <Image source={item.sub_image.image3} style={styles.subImage} />
                        </View>
                        <Text>{item.created_at}</Text>
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

    const handleMarkAllAsRead = () => {
        const updatedNotis = notis.map(noti =>
            filterNotisTime.some(filtered => filtered.id === noti.id)
                ? { ...noti, is_read: true }
                : noti
        );
        setNotis(updatedNotis);
        setModalVisible(false);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <HeaderNotification onOpenMarkAllModal={() => setModalVisible(true)} />,
        });
    }, [navigation]);

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
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.quickList}
            />
            <AllReadModal
                visible={modalVisible}
                onConfirm={handleMarkAllAsRead}
                onCancel={() => setModalVisible(false)}
            />
        </View>
    );
};

export default PromotionNotification;

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
        justifyContent: 'space-between',
        alignItems: 'center',
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
        width: 50,
        height: 50,
        marginRight: 20,
    },
    quickType: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    quickDesc: {
        fontSize: 13,
        // color: '#777',
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
    quickRight: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
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

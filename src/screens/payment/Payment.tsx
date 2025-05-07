import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import OrderPayment from '../../components/OrderPayment';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/data';
import RadioList from '../../components/RadioList';
import { AddressData } from '../../components/AddressModal';
import AddressModal from '../../components/AddressModal';
import { getAddressByCustomerId, createOrUpdateAddress, updateAddress } from '../../apis/Address';
import { useState, useEffect, useRef } from 'react';

import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


type PaymentRouteProp = RouteProp<RootStackParamList, 'payment'>;

type PaymentMethodType = {
    _id: string;
    name: string;
    type: string;
};

const orderInfor = {
    shopName: 'Happy Bedding',
    status: 'Chờ xác nhận',
    products: [
        {
            name: 'Bộ ga gối Cotton',
            variant: 'Kích thước: M8-2m, Caro xanh nhạt',
            quantity: 2,
            originalPrice: 205000,
            salePrice: 169000,
            imageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9aM8aQyWtcV41nBhSw4JDBEI8QernSD5mw&s',
        },
        {
            name: 'Chăn lông mềm',
            variant: 'Màu: Xanh pastel',
            quantity: 1,
            originalPrice: 399000,
            salePrice: 315000,
            imageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9aM8aQyWtcV41nBhSw4JDBEI8QernSD5mw&s',
        },
    ],
}

const Payment = () => {
    const navigation = useNavigation();
    const route = useRoute<PaymentRouteProp>();
    const { paymentMethodId } = route.params || "681a1bde3427154ae2166ebd";
    console.log('PaymentMethodId:', paymentMethodId);
    const [showModal, setShowModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>({});
    const customerIdRef = useRef<string | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(null);
    const [loading, setLoading] = useState(true);

    const getUserInfo = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user');
            if (jsonValue !== null) {
                const user = JSON.parse(jsonValue);
                // console.log('User info:', user);
                return user;
            } else {
                console.log('No user found');
                return null;
            }
        } catch (e) {
            console.error('Error reading user from AsyncStorage', e);
            return null;
        }
    };

    useEffect(() => {
        const fetchPaymentMethod = async () => {
            if (!paymentMethodId) return;

            try {
                const res = await axios.get(`http://192.168.1.145:3001/api/payment-method/${paymentMethodId}`);
                setPaymentMethod(res.data?.data);
            } catch (err) {
                console.error('Lỗi khi lấy phương thức thanh toán:', err);
            }
        };

        fetchPaymentMethod();
    }, [paymentMethodId]);

    // 🧠 Lấy địa chỉ khi mở màn
    useEffect(() => {
        const fetchUserAndAddress = async () => {
            try {
                const user = await getUserInfo();
                if (user) {
                    customerIdRef.current = user._id;

                    const res = await getAddressByCustomerId(user._id);
                    if (res.data?.data) {
                        setSelectedAddress(res.data.data);
                    } else {
                        console.log('Chưa có địa chỉ');
                    }
                }
            } catch (err) {
                console.error('Lỗi khi lấy thông tin:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndAddress();
    }, []);

    // 💾 Lưu hoặc cập nhật địa chỉ
    const handleSaveAddress = async (data: AddressData) => {
        try {
            await createOrUpdateAddress({
                ...data,
                customer_id: customerIdRef.current
            }); setSelectedAddress(data);
            setShowModal(false);

            Toast.show({
                type: 'success',
                text1: 'Địa chỉ đã được cập nhật',
                position: 'top',
                visibilityTime: 1500,
            });
        } catch (err) {
            console.error('Lỗi lưu địa chỉ:', err);
        }
    };

    return (
        <ScrollView style={{ flex: 1, paddingHorizontal: 12 }}>
            {loading ? (
                <ActivityIndicator style={{ marginTop: 20 }} />
            ) : (
                <TouchableOpacity
                    onPress={() => setShowModal(true)}
                    style={{ marginTop: 10, backgroundColor: '#fff', padding: 12, borderRadius: 5 }}
                >
                    {selectedAddress ? (
                        <>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', paddingBottom: 10 }}>
                                <Text style={{ fontWeight: '700', fontSize: 16 }}>{selectedAddress.receiver}</Text>
                                <Text>(+84) {selectedAddress.phone}</Text>
                            </View>
                            <View>
                                <Text style={{ marginBottom: 3 }}>{selectedAddress.street}</Text>
                                <Text>{selectedAddress.primary}, {selectedAddress.city}, {selectedAddress.country}</Text>
                            </View>
                        </>
                    ) : (
                        <Text>Chọn hoặc thêm địa chỉ</Text>
                    )}
                </TouchableOpacity>
            )}

            <AddressModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSaveAddress}
                defaultValue={selectedAddress}
            />


            <View style={{ marginTop: 10, backgroundColor: '#fff', padding: 12, borderRadius: 5 }}>
                <OrderPayment {...orderInfor} />
            </View>

            <View style={{ marginTop: 10, backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 17, borderRadius: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                    <Text style={{ fontWeight: '700' }}>Phương thức thanh toán</Text>
                    <Text onPress={() => navigation.navigate('paymentMethod')}>Xem tất cả</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text>{paymentMethod?.name}</Text>
                    <View style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        marginRight: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#F1215A',
                        borderColor: '#F1215A',
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 12,
                        }}>✔</Text>
                    </View>
                </View>
            </View>

            <View style={{ marginTop: 10, backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 17, borderRadius: 5 }}>
                <Text style={{ fontWeight: '700' }}>Chi tiết thanh toán</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={{ fontWeight: '600' }}>Tổng tiền hàng</Text>
                    <Text>₫210.000</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={{ fontWeight: '600' }}>Tổng chi phí vận chuyển</Text>
                    <Text>₫16.000</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={{ fontWeight: '600' }}>Tổng thanh toán</Text>
                    <Text>₫226.000</Text>
                </View>
            </View>

            <View style={{ marginTop: 10, backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 17, borderRadius: 5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 5 }}>
                <Text style={{ fontWeight: '600' }}>Tổng thanh toán</Text>
                <Text style={{ color: '#F1215A' }}>₫226.000</Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#e53935',
                        padding: 13,
                        borderRadius: 5,
                    }} onPress={() => navigation.navigate('paymentSuccess')}>
                    <Text style={{ color: 'white' }}>Đặt hàng</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Payment;

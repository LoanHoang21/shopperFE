import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import OrderPayment from '../../components/OrderPayment';
import { useNavigation } from '@react-navigation/native';
import RadioList from '../../components/RadioList';
import { useState } from 'react';

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
    //   const [checked, setChecked] = useState(false);

    return (
        <ScrollView style={{ flex: 1, paddingHorizontal: 12 }}>
            <View style={{ marginTop: 10, backgroundColor: '#fff', padding: 12, borderRadius: 5 }}>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', paddingBottom: 10 }}>
                    <Text style={{ fontWeight: '700', fontSize: 16 }}>Nguyễn Bá Phong</Text>
                    <Text>(+84) 328 737 474</Text>
                </View>

                <View>
                    <Text style={{ marginBottom: 3 }}>Số nhà 12, ngõ 12, Phố Chính Kinh</Text>
                    <Text>Phường Thượng Đình, Quận Thanh Xuân, Hà Nội</Text>
                </View>
            </View>

            <View style={{ marginTop: 10, backgroundColor: '#fff', padding: 12, borderRadius: 5 }}>
                <OrderPayment {...orderInfor} />
            </View>

            <View style={{ marginTop: 10, backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 17, borderRadius: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                    <Text style={{ fontWeight: '700' }}>Phương thức thanh toán</Text>
                    <Text onPress={() => navigation.navigate('paymentMethod')}>Xem tất cả</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text>Thanh toán khi nhận hàng</Text>
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

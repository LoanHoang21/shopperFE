import { View, Text, TouchableOpacity } from 'react-native';
import OrderProduct from './OrderProduct';

type OrderProduct = {
    name: string;
    variant: string;
    quantity: number;
    originalPrice: number;
    salePrice: number;
    imageUrl: string;
};

type OrderPaymentProps = {
    shopName: string;
    status: string;
    products: OrderProduct[];
};

const OrderPayment = ({ shopName, status, products }: OrderPaymentProps) => {
    const totalPrice = products.reduce(
        (sum, item) => sum + item.salePrice * item.quantity,
        0,
    );

    return (
        <View
            style={{
                backgroundColor: '#fff',
                paddingHorizontal: 3,
            }}>
            <Text style={{ color: '#e53935', fontWeight: '600' }}>{shopName}</Text>

            {products.map((product, index) => (
                <OrderProduct key={index} {...product} />
            ))}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
                <Text style={{ fontWeight: '700'}}>Phương thức vận chuyển</Text>
                <Text>Xem tất cả</Text>
            </View>

            <View style={{ backgroundColor: '#F0FFE2', padding: 12, marginBottom: 13}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7}}>
                    <Text>Nhanh</Text>
                    <Text style={{ fontWeight: 700}}>₫16.500</Text>
                </View>
                <Text>Đảm bảo nhận hàng từ 3-5 ngày</Text>
            </View>

            <View style={{ justifyContent: 'flex-end' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginBottom: 10,
                    }}>
                    <Text>Tổng số tiền ({products.length} sản phẩm): </Text>
                    <Text style={{ color: '#e53935', fontWeight: '700' }}>
                        {`₫${totalPrice.toLocaleString('vi-VN')}`}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default OrderPayment;

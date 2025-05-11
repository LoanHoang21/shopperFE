import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from 'react-native';
import ConfirmModal from '../../components/ConfirmModal';
import OrderPayment from '../../components/OrderPayment';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/data';
import { AddressData } from '../../components/AddressModal';
import AddressModal from '../../components/AddressModal';
import {
    getAddressByCustomerId,
    createOrUpdateAddress,
} from '../../apis/Address';
import { getVoucherById } from '../../apis/Voucher';
import { useState, useEffect, useRef } from 'react';
import { Voucher } from '../Voucher';

import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@react-native-vector-icons/ant-design';
import { API_BASE_URL } from '../../utils/const';
export interface Shop {
    _id: string;
    name: string;
    image?: string;
    phone?: string;
    location?: string;
    user_id?: string;
}

export interface Category {
    _id: string;
    name: string;
    description?: string;
    shop_id: Shop;
}

export interface Product {
    _id: string;
    name: string;
    quantity: number;
    sale_quantity: number;
    price: number;
    discount: number;
    short_description?: string;
    description?: string;
    view_count?: number;
    rating_avg?: number;
    images: string[];
    barcode_id?: number;
    category_id: Category;
}

export interface Attribute {
    _id: string;
    category: string;
    value: string;
}

export interface ProductVariant {
    _id: string;
    product_id: Product;
    attributes: Attribute[];
    quantity: number;
    price: number;
    discount: number;
    barcode?: number;
    image: string;
    sale_quantity: number;
}

export interface CartProductItem {
    product_id: ProductVariant;
    quantity: number;
    type: string;
}

export interface GroupedCartItemsByShop {
    shop: Shop;
    items: CartProductItem[];
}

type PaymentRouteProp = RouteProp<RootStackParamList, 'payment'>;

type PaymentMethodType = {
    _id: string;
    name: string;
    type: string;
};

const Payment = () => {
    const navigation = useNavigation();
    const route = useRoute<PaymentRouteProp>();
    const { paymentMethodId, product, voucherId } = route.params;
    console.log('PaymentMethodId:', product);
    const [showModal, setShowModal] = useState(false);
    const [showModalPayment, setShowModalPayment] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>();
    const customerIdRef = useRef<string | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(
        null,
    );
    const [orderSummary, setOrderSummary] = useState<{ totalQuantity: number; totalPrice: number }>({
        totalQuantity: 0,
        totalPrice: 0,
    });
    const [groupedByShop, setGroupedByShop] = useState<GroupedCartItemsByShop[]>(
        [],
    );
    const [voucher, setVoucher] = useState<Voucher>();
    const shippingFee = 16500 * groupedByShop.length;
    const totalFinal = orderSummary.totalPrice + shippingFee;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (!product || product.length === 0) return;
            console.log('🧾 Product:', product);
            try {
                const res = await axios.post(
                    `${API_BASE_URL}/order/get-product-variants`,
                    {
                        products: product,
                    }
                );

                console.log('🧾 Test1', res.data);
                const grouped = groupCartItemsByShop(res.data);
                console.log('🧾 Test2', grouped);

                setGroupedByShop(grouped);
            } catch (err) {
                console.error('❌ Lỗi khi gọi API lấy chi tiết sản phẩm:', err);
            }
        };

        fetchProductDetails();
    }, [product]);

    useEffect(() => {
        if (!groupedByShop || groupedByShop.length === 0) return;

        let totalQuantity = 0;
        let totalPrice = 0;

        groupedByShop.forEach((group) => {
            group.items.forEach((item) => {
                const q = item.quantity;
                const p = item.product_id.price;
                const d = item.product_id.discount || 0;

                const discounted = p * (1 - d / 100);
                totalQuantity += q;
                totalPrice += discounted * q;
            });
        });

        setOrderSummary({ totalQuantity, totalPrice });
    }, [groupedByShop]);

    useEffect(() => {
        const fetchVoucher = async () => {
            if (!voucherId) return;
            try {
                const res = await getVoucherById(voucherId);
                if (res.data) {
                    setVoucher(res.data.DT);
                }
            } catch (err) {
                console.error('❌ Lỗi lấy chi tiết voucher:', err);
            }
        };

        fetchVoucher();
    }, [voucherId]);

    console.log('Voucher:', voucher);

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

    const calculateDiscountedPrice = (totalPrice: number, voucher: Voucher): { totalPrice: number, voucherDiscount: number } => {
        if (!voucher || totalPrice < voucher.min_order_value * 1000) {
            return {
                totalPrice: totalPrice,
                voucherDiscount: 0,
            }; // Không đủ điều kiện
        }

        let discount = 0;

        if (voucher.discount_type === 'Phần trăm') {
            discount = (voucher.discount_value / 100) * totalPrice;
        } else {
            discount = voucher.discount_value * 1000; // đổi từ K về VND
        }

        // Áp dụng giới hạn giảm tối đa nếu có
        if (voucher.max_discount_value) {
            discount = Math.min(discount, voucher.max_discount_value * 1000);
        }

        // return totalPrice - discount;
        return {
            totalPrice: totalPrice - discount * groupedByShop.length,
            voucherDiscount: discount * groupedByShop.length,
        }
    };

    useEffect(() => {
        const fetchPaymentMethod = async () => {
            if (!paymentMethodId) return;

            try {
                const res = await axios.get(
                    `${API_BASE_URL}/payment-method/${paymentMethodId || "681a1bde3427154ae2166ebd"}`,
                );
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

    const groupCartItemsByShop = (
        cartItems: CartProductItem[],
    ): GroupedCartItemsByShop[] => {
        const grouped: Record<string, GroupedCartItemsByShop> = {};

        cartItems.forEach(item => {
            const shop = item.product_id.product_id.category_id.shop_id;
            const shopId = shop._id;

            if (!grouped[shopId]) {
                grouped[shopId] = {
                    shop,
                    items: [],
                };
            }

            grouped[shopId].items.push(item);
        });

        return Object.values(grouped);
    };

    // 💾 Lưu hoặc cập nhật địa chỉ
    const handleSaveAddress = async (data: AddressData) => {
        try {
            await createOrUpdateAddress({
                ...data,
                customer_id: customerIdRef.current,
            });
            setSelectedAddress(data);
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

    const handlePay1 = async () => {
        try {
            const user = await getUserInfo();
            if (!user || !selectedAddress || !paymentMethodId) return;

            // Tính giá trị tổng cần thanh toán của từng shop
            for (const group of groupedByShop) {
                const shopTotal = group.items.reduce((acc, item) => {
                    const price = item.product_id.price;
                    const discount = item.product_id.discount || 0;
                    const finalPrice = price * (1 - discount / 100);
                    return acc + finalPrice * item.quantity;
                }, 0);

                const quantity = group.items.reduce((acc, item) => acc + item.quantity, 0);

                const orderBody = {
                    products: group.items,
                    quantity: quantity,
                    total_price: voucher
                        ? calculateDiscountedPrice(shopTotal + 16500, voucher).totalPrice
                        : shopTotal + 16500,
                    customer_id: user._id,
                    address_id: selectedAddress._id,
                    voucher_id: voucher?._id,
                    shipment_id: '68186d9f77fc0c5eca6dbf50',
                    payment_method_id: paymentMethodId,
                    status: paymentMethod?.type === 'cod' ? 'pending' : 'unpaid',
                    shop_id: group.shop._id,
                    payment_status: paymentMethod?.type === 'cod' ? 'offline' : 'online',
                    payUrl: '',
                };

                const resOrder = await axios.post(`${API_BASE_URL}/order/addOrder`, orderBody);

                if (resOrder.data?.status === 'OK') {

                    if (paymentMethod?.type !== 'cod') {
                        const res = await axios.post(`${API_BASE_URL}/order/momo-payment`, {
                            totalPrice: orderBody.total_price,
                            orderId: resOrder.data?.data?._id,
                        });

                        console.log(res);

                        if (res.data?.payUrl) {
                            //   Linking.openURL(res.data.payUrl);
                            navigation.navigate('paymentSuccess');
                        }
                    }
                } else {
                    Toast.show({ type: 'error', text1: resOrder.data?.message || 'Lỗi khi đặt hàng' });
                }
            }
            navigation.navigate('paymentSuccess');
            Toast.show({
                type: 'success',
                text1: 'Đặt hàng thành công',
                position: 'top',
                visibilityTime: 1500,
            });

        } catch (err) {
            console.error(err);
            Toast.show({ type: 'error', text1: 'Đặt hàng thất bại' });
        }
    };

    return (
        <ScrollView style={{ flex: 1, paddingHorizontal: 12 }}>
            {loading ? (
                <ActivityIndicator style={{ marginTop: 20 }} />
            ) : (
                <TouchableOpacity
                    onPress={() => setShowModal(true)}
                    style={{
                        marginTop: 10,
                        backgroundColor: '#fff',
                        padding: 12,
                        borderRadius: 5,
                    }}>
                    {selectedAddress ? (
                        <>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    gap: 10,
                                    alignItems: 'center',
                                    paddingBottom: 10,
                                }}>
                                <Icon name="pushpin" size={20} color="#007AFF" />
                                <Text style={{ fontWeight: '700', fontSize: 16 }}>
                                    {selectedAddress.receiver}
                                </Text>
                                <Text>(+84) {selectedAddress.phone}</Text>
                            </View>
                            <View>
                                <Text style={{ marginBottom: 3 }}>{selectedAddress.street}</Text>
                                <Text>
                                    {selectedAddress.primary}, {selectedAddress.city},{' '}
                                    {selectedAddress.country}
                                </Text>
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

            <View
                style={{
                    marginTop: 10,
                    backgroundColor: '#fff',
                    padding: 12,
                    borderRadius: 5,
                }}>

                {groupedByShop.map((group, index) => (
                    <OrderPayment key={index} {...group} />
                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                    <Text style={{ fontWeight: '700' }}>Phương thức vận chuyển</Text>
                </View>

                <View style={{ backgroundColor: '#F0FFE2', padding: 12, marginBottom: 13 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7 }}>
                        <View>
                            <Text>Nhanh</Text>
                        </View>
                        <Text style={{ fontWeight: 700 }}>₫16.500</Text>
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
                        <Text>Tổng số tiền ({orderSummary.totalQuantity} sản phẩm): </Text>
                        <Text style={{ color: '#e53935', fontWeight: '700' }}>
                            {`₫${orderSummary.totalPrice.toLocaleString('vi-VN')}`}
                            {/* {orderSummary.totalPrice} */}
                        </Text>
                    </View>
                </View>
            </View>


            <View
                style={{
                    marginTop: 10,
                    backgroundColor: '#fff',
                    paddingHorizontal: 12,
                    paddingVertical: 17,
                    borderRadius: 5,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}

                >
                    <Text style={{ fontWeight: '700' }}><Icon name="gift" size={20} color="#007AFF" />Shopper Voucher</Text>
                    <Text onPress={() => navigation.navigate('voucher', { product, paymentMethodId })}>
                        {voucher ? (
                            <Text style={{ color: 'green' }}>
                                {voucher.code}
                            </Text>
                        ) : (
                            <Text>Chọn mã giảm giá</Text>
                        )}
                    </Text>
                </View>
            </View>

            <View
                style={{
                    marginTop: 10,
                    backgroundColor: '#fff',
                    paddingHorizontal: 12,
                    paddingVertical: 17,
                    borderRadius: 5,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 12,
                    }}>
                    <Text style={{ fontWeight: '700' }}><Icon name="pay-circle" size={20} color="#007AFF" />Phương thức thanh toán</Text>
                    <Text onPress={() => navigation.navigate('paymentMethod', { product })}>
                        Xem tất cả
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                            {paymentMethod?.name === 'MoMo' ? (
                                <Image
                                    source={require('../../assets/images/momo.png')}
                                    style={{ width: 20, height: 20 }}
                                />
                            ) : (
                                <Image
                                    source={require('../../assets/images/pay.png')}
                                    style={{ width: 22, height: 22 }}
                                />
                            )}
                            <Text>{paymentMethod?.name}</Text>
                        </View>
                    </View>
                    <View
                        style={{
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
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 12,
                            }}>
                            ✔
                        </Text>
                    </View>
                </View>
            </View>

            <View
                style={{
                    marginTop: 10,
                    backgroundColor: '#fff',
                    paddingHorizontal: 12,
                    paddingVertical: 17,
                    borderRadius: 5,
                }}>
                <Text style={{ fontWeight: '700' }}>Chi tiết thanh toán</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 10,
                    }}>
                    <Text style={{ fontWeight: '600' }}>Tổng tiền hàng</Text>
                    <Text>{`₫${orderSummary.totalPrice.toLocaleString('vi-VN')}`}</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 10,
                    }}>
                    <Text style={{ fontWeight: '600' }}>Tổng chi phí vận chuyển</Text>
                    <Text>{`₫${shippingFee.toLocaleString('vi-VN')}`}</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 10,
                    }}>
                    <Text style={{ fontWeight: '600' }}>Giảm giá voucher</Text>
                    {voucher ? (
                        <Text>{`- ₫${calculateDiscountedPrice(totalFinal, voucher || {}).voucherDiscount.toLocaleString('vi-VN')}`}</Text>
                    ) : <Text>{`₫0`}</Text>}
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 10,
                    }}>
                    <Text style={{ fontWeight: '600' }}>Tổng thanh toán</Text>
                    {voucher ? (
                        <Text>{`₫${calculateDiscountedPrice(totalFinal, voucher || {}).totalPrice.toLocaleString('vi-VN')}`}</Text>
                    ) : <Text>{`₫${totalFinal.toLocaleString('vi-VN')}`}</Text>}
                </View>
            </View>

            <View
                style={{
                    marginTop: 10,
                    backgroundColor: '#fff',
                    paddingHorizontal: 12,
                    paddingVertical: 17,
                    borderRadius: 5,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 5,
                }}>
                <Text style={{ fontWeight: '600' }}>Tổng thanh toán:</Text>
                {voucher ? (
                    <Text style={{ color: '#F1215A' }}>{`₫${calculateDiscountedPrice(totalFinal, voucher || {}).totalPrice.toLocaleString('vi-VN')}`}</Text>
                ) : <Text style={{ color: '#F1215A' }}>{`₫${totalFinal.toLocaleString('vi-VN')}`}</Text>}
                <ConfirmModal
                    visible={showModalPayment}
                    onCancel={() => setShowModalPayment(false)}
                    onConfirm={handlePay1}
                    title="Xác nhận thanh toán"
                    message="Bạn có chắc chắn muốn thanh toán đơn hàng này?"
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: '#e53935',
                        padding: 13,
                        borderRadius: 5,
                    }}
                    onPress={() => setShowModalPayment(true)}>
                    <Text style={{ color: 'white' }}>Đặt hàng</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    style={{
                        backgroundColor: '#e53935',
                        padding: 13,
                        borderRadius: 5,
                    }}
                    onPress={handleAddOrder}>
                    <Text style={{ color: 'white' }}>Đặt hàng</Text>
                </TouchableOpacity> */}
            </View>
        </ScrollView>
    );
};

export default Payment;

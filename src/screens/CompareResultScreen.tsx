import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/data';
import ProductCardCompare from '../components/ProductCardCompare';
import { Product } from '../components/ProductCard';

const screenWidth = Dimensions.get('window').width;
const CARD_MARGIN = 8;

type ResultRouteProp = RouteProp<RootStackParamList, 'compareResult'>;

const CompareResultScreen = () => {
    const route = useRoute<ResultRouteProp>();
    const navigation = useNavigation();
    const { products, related } = route.params;

    const sorted = [...products].sort((a, b) => a.price - b.price);

    const CARD_WIDTH = sorted.length <= 2
        ? (screenWidth - CARD_MARGIN * (sorted.length + 1)) / sorted.length
        : (screenWidth - CARD_MARGIN * 2) / 2;
    const cheapestProduct = sorted[0];
    const columnWidth = 120;
    const tableWidth = 100 + sorted.length * columnWidth;

    const [selectedShop, setSelectedShop] = React.useState<string>(
        sorted[0]?.shop_name ?? ''
    );

    const [shopVouchers, setShopVouchers] = React.useState<Record<string, any[]>>({});
    const [suggestedProducts, setSuggestedProducts] = React.useState<Product[]>(related || []);

    const renderVoucherDescription = (voucher: any) => {
        const { discount_type, discount_value, min_order_value, discount_target } = voucher;
        const target = discount_target === 'Shipping' ? 'phí vận chuyển' : 'đơn';
        const icon = discount_target === 'Shipping' ? '🚚' : '🎁';

        if (!discount_type || !discount_value) return `${icon} Ưu đãi đặc biệt từ shop`;

        if (discount_type === 'Tiền') {
            return `${icon} Giảm ${discount_value}k ${target} cho đơn từ ${min_order_value}k`;
        }

        if (discount_type === 'Phần trăm') {
            return `${icon} Giảm ${discount_value}% ${target} cho đơn từ ${min_order_value}k`;
        }

        return `${icon} Ưu đãi đặc biệt từ shop`;
    };

    React.useEffect(() => {
        const fetchVouchers = async () => {
            const map: Record<string, any[]> = {};
            for (const p of products) {
                const shopId = p.category_id?.shop_id?._id;
                if (shopId && !map[shopId]) {
                    try {
                        const res = await fetch(`http://192.168.1.145:3001/api/vouchers/shop/${shopId}`);
                        const data = await res.json();
                        map[shopId] = data.data || [];
                    } catch (err) {
                        console.error('Failed to fetch voucher for shop:', shopId, err);
                        map[shopId] = [];
                    }
                }
            }
            setShopVouchers(map);
        };

        fetchVouchers();
    }, [products]);

    const selectedProduct = products.find(p => p.shop_name === selectedShop);
    const selectedShopId = selectedProduct?.category_id?.shop_id?._id;
    const vouchers = selectedShopId ? shopVouchers[selectedShopId] || [] : [];
    const uniqueShops = Array.from(new Set(sorted.map(p => p.shop_name)));

    return (
        <ScrollView style={styles.container}>
            <FlatList
                data={sorted}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: CARD_MARGIN,
                    paddingRight: CARD_MARGIN,
                    justifyContent: sorted.length <= 2 ? 'center' : 'flex-start',
                }}
                renderItem={({ item }) => (
                    <View style={{ width: CARD_WIDTH, marginRight: CARD_MARGIN }}>
                        <ProductCardCompare
                            item={item}
                            isCheapest={item._id === cheapestProduct._id}
                        />
                    </View>
                )}
            />

            <View style={styles.separator} />

            <View style={styles.promotionSection}>
                <Text style={styles.subTitle}>Khuyến mãi từ Shop</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
                    <View style={styles.shopTabs}>
                        {uniqueShops.map((name, idx) => (
                            <TouchableOpacity
                                key={idx}
                                onPress={() => setSelectedShop(name ?? '')}
                                style={[styles.shopTag, selectedShop === name && {
                                    backgroundColor: '#f50057', borderColor: '#f50057',
                                }]}
                            >
                                <Text style={{ color: selectedShop === name ? 'white' : '#f50057', fontWeight: '500' }}>
                                    🛍 {name ?? 'Không rõ'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.promoBox}>
                    <Text style={{ marginBottom: 4 }}>
                        Ưu đãi của <Text style={{ fontWeight: 'bold' }}>{selectedShop}</Text>:
                    </Text>
                    <ScrollView style={{ maxHeight: 120 }} nestedScrollEnabled>
                        {vouchers.length > 0 ? (
                            vouchers.map((v, i) => (
                                <Text key={i} style={{ marginBottom: 4 }}>{renderVoucherDescription(v)}</Text>
                            ))
                        ) : (
                            <Text>Không có voucher nào.</Text>
                        )}
                    </ScrollView>
                </View>

            </View>

            <View style={{ marginTop: 24 }}>
                <Text style={styles.subTitle}>📦 Gợi ý sản phẩm liên quan</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {suggestedProducts.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.suggestCard}
                            onPress={() => navigation.navigate('productDetail', { product: item })}
                        >
                            <Image
                                source={{ uri: item.images?.[0] || item.image || 'https://via.placeholder.com/150' }}
                                style={styles.image}
                            />
                            <Text style={styles.suggestName} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.suggestPrice}>đ{item.price.toLocaleString('vi-VN')}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <TouchableOpacity
                    style={styles.homeBtn}
                    onPress={() => navigation.navigate('home')}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>🔙 Về trang chủ</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default CompareResultScreen;

const styles = StyleSheet.create({
    container: { backgroundColor: 'white', padding: 16 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
    promotionSection: {
        marginTop: 20,
        padding: 12,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        backgroundColor: '#fffafc',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 2,
    },
    subTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
    shopTabs: { flexDirection: 'row', gap: 8, marginBottom: 8 },
    shopTag: {
        backgroundColor: '#fff0f6',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f50057',
        marginRight: 8,
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 16,
    },
    promoBox: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#eee',
        gap: 4,
        marginTop: 12,
        minHeight: 100,     // 👈 chiều cao tối thiểu
        justifyContent: 'center',
    },

    compareTable: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: 'white',
        padding: 12,
    },
    suggestCard: {
        width: 140,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        marginRight: 12,
        elevation: 2,
    },
    image: { width: '100%', height: 100, borderRadius: 6 },
    suggestName: { fontWeight: '600', marginTop: 6, fontSize: 13 },
    suggestPrice: { color: '#d50000', fontWeight: 'bold', marginTop: 2 },
    homeBtn: {
        backgroundColor: '#f50057',
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 16,
    },
});

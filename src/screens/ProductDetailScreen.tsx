import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Icon from '@react-native-vector-icons/ant-design';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/data';
import ProductCard from '../components/ProductCard';
import { Dimensions } from 'react-native';
import { Product } from '../components/ProductCard';
import axios from 'axios';
import AddToCartModal from '../components/AddToCartModal';
import { API_BASE_URL } from '../utils/const';
import AddToPaymentModal from '../components/AddToPaymentModal';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'productDetail'>;
type ProductVariant = {
    _id: string;
    attributes: {
      category: string;
      value: string;
    }[];
    price: number;
    discount: number;
    quantity: number;
    sale_quantity: number;
    image: string;
  };


const ProductDetailScreen = () => {

    const scrollRef = React.useRef<ScrollView>(null);
    const route = useRoute<ProductDetailRouteProp>();
    const { product } = route.params;
    const [relatedProducts, setRelatedProducts] = React.useState<Product[]>([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalPaymentVisible, setModalPaymentVisible] = React.useState(false);
    const [productOptions, setProductOptions] = React.useState<string[]>([]);
    const [productAttributes, setProductAttributes] = React.useState<
    { category: string; values: string[] }[]
    >([]);
    const [variants, setVariants] = useState<ProductVariant[]>([]);

    console.log('product',product)

    const fetchProductAttributions = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/product/${product._id}/attributions`);
          setProductAttributes(res.data.data || []);
        } catch (error) {
          console.error('Lỗi khi lấy thuộc tính sản phẩm:', error);
        }
    };

    const fetchProductVariants = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/product/${product._id}/variants`);
          const data = res.data?.data?.variants || [];
          setVariants(data);
        } catch (error) {
          console.error('Lỗi khi lấy biến thể sản phẩm:', error);
        }
      };
      

    React.useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/product/${product._id}/related`);
                const related = (res.data.data || []).map((p: any) => ({
                    ...p,
                    shop_name: p.category_id?.shop_id?.name ?? 'Không rõ',
                    shop_id: p.category_id?.shop_id?._id,
                }));
                setRelatedProducts(related.slice(0, 4)); // 👈 lấy tối đa 4 sản phẩm
            } catch (err) {
                console.error('Failed to fetch related products:', err);
            }
        };

        if (product?._id) {
            fetchRelatedProducts();
        }
    }, [product]);
    React.useEffect(() => {
        if (product?._id) {
            fetchProductVariants();
          }
        scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, [product]);

    const navigation = useNavigation();
    const [showAlert, setShowAlert] = React.useState(false);

    const handleAddToCart = async () => {
        await fetchProductAttributions();
        setModalVisible(true);
    };

    const handleAddToPayment = async () => {
      await fetchProductAttributions();
      setModalPaymentVisible(true);
  };

    const handleCompare = () => {
        navigation.navigate('compare', { products: [product] });
    };

    const originalPrice = product.discount
        ? Math.floor(product.price / (1 - product.discount / 100))
        : product.price;

        return (
        <View style={{ flex: 1 }}>
            <ScrollView ref={scrollRef} style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
                <FlatList
                    data={Array.isArray(product.images) && product.images.length > 0 ? product.images : [product.image]}
                    horizontal
                    pagingEnabled
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item || 'https://via.placeholder.com/300' }}
                            style={styles.image}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                />

                <View style={styles.infoContainer}>
                    <View style={styles.priceRow}>
                        <Text style={styles.salePrice}>đ{product.price.toLocaleString()}</Text>
                        {(product.discount ?? 0) > 0 && (
                            <Text style={styles.oldPrice}>
                                đ{Math.floor(product.price / (1 - (product.discount ?? 0) / 100)).toLocaleString()}
                            </Text>
                        )}

                    </View>

                    <Text style={styles.name}>{product.name}</Text>

                    <View style={styles.iconRow}>
                        <Icon name="shop" size={20} color="#f50057" />
                        <Text style={styles.shop}> {product.shop_name}</Text>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.deliveryRow}>
                        <Icon name="car" size={24} color="#00c853" />
                        <View style={styles.deliveryTextBlock}>
                            <Text style={styles.deliveryLine1}>Nhận hàng từ 2 Th03 - 6 Th03</Text>
                            <Text style={styles.deliveryLine2}>Miễn phí vận chuyển</Text>
                        </View>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.iconRow}>
                        <Icon name="star" size={18} color="#fdd835" />
                        <Text style={{ marginLeft: 10 }}>
                            {product.rating_avg?.toFixed(1) || '0.0'}/5   Đánh giá sản phẩm
                        </Text>
                    </View>

                    <View style={styles.separator} />

                    <Text style={styles.bold}>Mô tả chi tiết về sản phẩm</Text>
                    <View style={styles.separator} />
                    <Text style={styles.description}>
                        {product.description || 'Chưa có mô tả.'}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sản phẩm tương tự</Text>
                    <FlatList
                        data={relatedProducts}
                        numColumns={2}
                        keyExtractor={(item, index) => item._id + index}
                        renderItem={({ item }) => (
                            <ProductCard
                                item={item}
                                onPress={() => navigation.navigate('productDetail', { product: item })}
                            />
                        )}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>

            <View style={styles.fixedBottomBar}>
                <TouchableOpacity style={styles.buyBtn} onPress={handleCompare}>
                    <Text style={{ color: 'white' }}>So sánh thêm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyBtn} onPress={handleAddToPayment}>
                    <Text style={{ color: 'white' }}>Mua hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartIconBtn} onPress={handleAddToCart}>
                    <Icon name="shopping-cart" size={22} color="white" />
                </TouchableOpacity>
            </View>

            {showAlert && (
                <View style={styles.overlay}>
                    <View style={styles.popup}>
                        <Text style={styles.popupTitle}>Thông báo</Text>
                        <Text style={styles.popupText}>✅ Thêm sản phẩm vào giỏ hàng thành công</Text>
                    </View>
                </View>
            )}
            <AddToCartModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                product={{
                    id: product._id,
                    image: Array.isArray(product.images) && product.images.length > 0
                ? product.images[0] ?? 'https://via.placeholder.com/300'
                : product.image ?? 'https://via.placeholder.com/300',
                    name: product.name,
                    discountPrice: product.price,
                    price: originalPrice,
                    stock: (product.quantity && product.sale_quantity)? (product.quantity - product.sale_quantity) : 0,
                    options:productAttributes,
                    variants: variants 
                }}
                onAddToCart={(item) => {
                    console.log('Đã thêm giỏ:', item);
                    setShowAlert(true);
                    setTimeout(() => setShowAlert(false), 2000);
                }}
            />
            <AddToPaymentModal
                visible={modalPaymentVisible}
                onClose={() => setModalPaymentVisible(false)}
                product={{
                    id: product._id,
                    image: Array.isArray(product.images) && product.images.length > 0
                ? product.images[0] ?? 'https://via.placeholder.com/300'
                : product.image ?? 'https://via.placeholder.com/300',
                    name: product.name,
                    discountPrice: product.price,
                    price: originalPrice,
                    stock: (product.quantity && product.sale_quantity)? (product.quantity - product.sale_quantity) : 0,
                    options:productAttributes,
                    variants: variants 
                }}
                onAddToCart={(item) => {
                    console.log('Đã thêm giỏ:', item);
                    setShowAlert(true);
                    setTimeout(() => setShowAlert(false), 2000);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: 'white' },
    image: {
        width: Dimensions.get('window').width,
        height: 250,
        resizeMode: 'cover',
    },

    infoContainer: { padding: 16 },
    priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    salePrice: { fontSize: 24, fontWeight: 'bold', color: '#f50057', marginRight: 8 },
    oldPrice: { fontSize: 16, color: '#999', textDecorationLine: 'line-through' },
    name: { fontSize: 28, fontWeight: 'bold', marginTop: 4, color: '#222' },
    iconRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 10 },
    shop: { color: '#f50057', fontSize: 20, fontWeight: '500' },
    separator: { height: 1, backgroundColor: '#ddd', opacity: 0.4, marginVertical: 16 },
    deliveryRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    deliveryTextBlock: { marginLeft: 12, justifyContent: 'center' },
    deliveryLine1: { fontSize: 18, color: '#000' },
    deliveryLine2: { fontSize: 18, color: '#888', marginTop: 2 },
    bold: { fontWeight: 'bold', fontSize: 15, marginBottom: 6 },
    description: { color: '#333', fontSize: 14, lineHeight: 20 },
    fixedBottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom:30,
        paddingTop:20,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    buyBtn: {
        backgroundColor: '#f50057',
        borderRadius: 6,
        padding: 10,
        flex: 1,
        marginLeft: 8,
        alignItems: 'center',
    },
    cartIconBtn: {
        backgroundColor: '#f50057',
        padding: 10,
        borderRadius: 8,
        marginLeft: 8,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    popup: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        minWidth: 250,
        alignItems: 'center',
    },
    popupTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
    popupText: { fontSize: 14, color: 'green' },
});

export default ProductDetailScreen;

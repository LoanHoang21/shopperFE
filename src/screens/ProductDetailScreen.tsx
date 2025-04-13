import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';
import Icon from '@react-native-vector-icons/ant-design';
import ProductCard from '../components/ProductCard';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/route';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'productDetail'>;


const productWidth = (Dimensions.get('window').width - 48) / 2;
const sampleProducts = [
    {
        id: '1',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9aM8aQyWtcV41nBhSw4JDBEI8QernSD5mw&s',
        title: 'Bộ ga gối và vỏ chăn Cotton',
        price: '169.000₫',
        oldPrice: '300.000₫',
        shop: 'Happy Bedding',
        rating: '4.5',
        tag: 'Cotton cao cấp'
    },
    {
        id: '2',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9aM8aQyWtcV41nBhSw4JDBEI8QernSD5mw&s',
        title: 'Bộ ga mẫu mới 2024',
        price: '169.000₫',
        oldPrice: '300.000₫',
        shop: 'Chăn ga HD',
        rating: '4.5',
        tag: 'Cotton cao cấp'
    },
    {
        id: '3',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9aM8aQyWtcV41nBhSw4JDBEI8QernSD5mw&s',
        title: 'Bộ ga gối và vỏ chăn Cotton',
        price: '169.000₫',
        oldPrice: '300.000₫',
        shop: 'Happy Bedding',
        rating: '4.5',
        tag: 'Cotton cao cấp'
    },
    {
        id: '4',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9aM8aQyWtcV41nBhSw4JDBEI8QernSD5mw&s',
        title: 'Bộ ga mẫu mới 2024',
        price: '169.000₫',
        oldPrice: '300.000₫',
        shop: 'Chăn ga HD',
        rating: '4.5',
        tag: 'Cotton cao cấp'
    },
];


const ProductDetailScreen = () => {
    const scrollRef = React.useRef<ScrollView>(null);
    const route = useRoute<ProductDetailRouteProp>();
    const { product } = route.params;
    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ y: 0, animated: true });
        }
    }, [product]);

    const navigation = useNavigation();
    const [showAlert, setShowAlert] = React.useState(false);

    const handleAddToCart = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000); // Ẩn sau 2 giây
    };

    const handleCompare = () => {
        navigation.navigate('compare', { products: [product] });
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView ref={scrollRef} style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Phần nội dung cuộn */}
                <Image source={{ uri: product.image }} style={styles.image} />

                {/* Thông tin sản phẩm */}
                <View style={styles.infoContainer}>
                    <View style={styles.priceRow}>
                        <Text style={styles.salePrice}>đ{product.price}</Text>
                        <Text style={styles.oldPrice}>đ{product.oldPrice}</Text>
                    </View>

                    <Text style={styles.name}>{product.title}</Text>

                    <View style={styles.iconRow}>
                        <Icon name="shop" size={20} color="#f50057" />
                        <Text style={styles.shop}> {product.tag}</Text>
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
                        <Text style={{ marginLeft: 10 }}>4.9/5   Đánh giá sản phẩm (256)</Text>
                    </View>

                    <View style={styles.separator} />

                    <Text style={styles.bold}>Mô tả chi tiết về sản phẩm</Text>
                    <View style={styles.separator} />
                    <Text style={styles.description}>Sản phẩm được làm từ cotton cao cấp, mềm mại, thấm hút tốt và thân thiện với da. Thiết kế sang trọng, phù hợp mọi không gian phòng ngủ.</Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sản phẩm tương tự</Text>
                    <FlatList
                        data={sampleProducts}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <ProductCard item={item}
                            onPress={() => navigation.navigate('productDetail', { product: item })} />}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        scrollEnabled={false}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
                    <FlatList
                        data={sampleProducts}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <ProductCard item={item} onPress={() => navigation.navigate('productDetail', { product: item })} />}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
            <View style={styles.fixedBottomBar}>
                <TouchableOpacity style={styles.buyBtn} onPress={handleCompare}>
                    <Text style={{ color: 'white' }}>So sánh thêm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyBtn}>
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

        </View>
    );
};


const styles = StyleSheet.create({
    container: { backgroundColor: 'white' },
    image: { width: '100%', height: 250, resizeMode: 'cover' },
    infoContainer: { padding: 16 },
    shipping: { marginTop: 6 },
    rating: { marginTop: 6, color: 'goldenrod' },
    buttonRow: {
        flexDirection: 'row', justifyContent: 'space-between',
        marginHorizontal: 16, marginTop: 12
    },
    compareBtn: {
        borderWidth: 1, borderColor: '#f50057', borderRadius: 6,
        padding: 10, flex: 1, marginRight: 8, alignItems: 'center'
    },
    buyBtn: {
        backgroundColor: '#f50057', borderRadius: 6,
        padding: 10, flex: 1, marginLeft: 8, alignItems: 'center'
    },
    section: { marginTop: 24, paddingHorizontal: 16 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },

    fixedBottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },

    cartIconBtn: {
        backgroundColor: '#f50057',
        padding: 10,
        borderRadius: 8,
        marginLeft: 8,
    },


    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        width: productWidth,
        overflow: 'hidden',
        elevation: 2,
    },
    cardImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
    },
    cardTitle: {
        fontSize: 14,
        padding: 8,
        fontWeight: '600',
    },
    cardPrice: {
        paddingHorizontal: 8,
        color: 'red',
        fontWeight: 'bold',
    },
    salePrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f50057', // màu hồng đậm giống ảnh
        marginRight: 8,
    },
    oldPrice: {
        fontSize: 16,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
    },
    cardShop: {
        fontSize: 12,
        color: '#555',
    },
    cardRating: {
        fontSize: 12,
        color: '#f0a500',
    },

    row: {
        paddingHorizontal: 16,
    },

    iconRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd',
        opacity: 0.4,
        marginVertical: 16,
    },
    price: {
        fontSize: 24,
        color: '#d50000',
        fontWeight: 'bold',
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        color: 'gray',
        fontSize: 14,
        marginLeft: 8,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 4,
        color: '#222',
    },
    shop: {
        color: '#f50057',
        fontSize: 20,
        fontWeight: '500',
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 6,
    },
    description: {
        color: '#333',
        fontSize: 14,
        lineHeight: 20,
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

    popup: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        minWidth: 250,
        alignItems: 'center',
    },

    popupTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    popupText: {
        fontSize: 14,
        color: 'green',
    },

    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    deliveryRow: {
        flexDirection: 'row',
        alignItems: 'center', // icon căn giữa theo khối 2 dòng text
        marginTop: 8,
    },
    deliveryTextBlock: {
        marginLeft: 12,
        justifyContent: 'center',
    },
    deliveryLine1: {
        fontSize: 18,
        color: '#000',
    },
    deliveryLine2: {
        fontSize: 18,
        color: '#888',
        marginTop: 2,
    },


});

export default ProductDetailScreen;

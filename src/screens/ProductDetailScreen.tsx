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
const productWidth = (Dimensions.get('window').width - 48) / 2;

const sampleProducts = [
    {
        id: '1',
        image: require('../assets/images/product_image.png'),
        title: 'Bộ ga gối và vỏ chăn Cotton',
        price: '169.000₫',
        oldPrice: '300.000₫',
        shop: 'Happy Bedding',
        rating: '4.5',
    },
    {
        id: '2',
        image: require('../assets/images/product_image.png'),
        title: 'Bộ ga mẫu mới 2024',
        price: '169.000₫',
        oldPrice: '300.000₫',
        shop: 'Chăn ga HD',
        rating: '4.5',
    },
    {
        id: '3',
        image: require('../assets/images/product_image.png'),
        title: 'Chăn cotton mềm mại',
        price: '169.000₫',
        oldPrice: '300.000₫',
        shop: 'Bad Bedding',
        rating: '4.5',
    },
    {
        id: '4',
        image: require('../assets/images/product_image.png'),
        title: 'Set chăn gối cute',
        price: '169.000₫',
        oldPrice: '300.000₫',
        shop: 'Chăn ga Pre',
        rating: '4.5',
    },
];

const ProductCard = ({ item }: { item: any }) => (
    <View style={styles.card}>
        <Image source={item.image} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardPrice}>
            {item.price}{' '}
            <Text style={styles.oldPrice}>{item.oldPrice}</Text>
        </Text>
        <View style={styles.cardFooter}>
            <Text style={styles.cardShop}>{item.shop}</Text>
            <Text style={styles.cardRating}>⭐ {item.rating}</Text>
        </View>
    </View>
);



const ProductDetailScreen = () => {
    return (
        <ScrollView style={styles.container}>
            {/* Hình ảnh sản phẩm */}
            <Image source={require('../assets/images/product_image.png')} style={styles.image} />

            {/* Thông tin sản phẩm */}
            <View style={styles.infoContainer}>
                {/* Giá sản phẩm */}
                <View style={styles.priceRow}>
                    <Text style={styles.salePrice}>169.000₫</Text>
                    <Text style={styles.oldPrice}>300.000₫</Text>
                </View>

                {/* Tên sản phẩm */}
                <Text style={styles.name}>Bộ ga gối và vỏ chăn Cotton</Text>

                {/* Tên shop */}
                <View style={styles.iconRow}>
                    <Icon name="shop" size={16} color="#f50057" />
                    <Text style={styles.shop}> ONATEX VN Cosmetics & Candles</Text>
                </View>

                <View style={styles.separator} />

                {/* Giao hàng */}
                <View style={styles.deliveryRow}>
                    <Icon name="car" size={24} color="#00c853" />
                    <View style={styles.deliveryTextBlock}>
                        <Text style={styles.deliveryLine1}>Nhận hàng từ 2 Th03 - 6 Th03</Text>
                        <Text style={styles.deliveryLine2}>Miễn phí vận chuyển</Text>
                    </View>
                </View>


                <View style={styles.separator} />

                {/* Đánh giá */}
                <View style={styles.iconRow}>
                    <Icon name="star" size={18} color="#fdd835" />
                    <Text style={{ marginLeft: 10 }}>4.9/5   Đánh giá sản phẩm (256)</Text>
                </View>

                <View style={styles.separator} />

                {/* Mô tả sản phẩm */}
                <Text style={styles.bold}>Mô tả chi tiết về sản phẩm</Text>
                <View style={styles.separator} />
                <Text style={styles.description}>Sản phẩm được làm từ cotton cao cấp, mềm mại, thấm hút tốt và thân thiện với da. Thiết kế sang trọng, phù hợp mọi không gian phòng ngủ.</Text>
            </View>

            {/* Nút hành động */}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.compareBtn}><Text>So sánh thêm</Text></TouchableOpacity>
                <TouchableOpacity style={styles.buyBtn}><Text style={{ color: 'white' }}>Mua hàng</Text></TouchableOpacity>
            </View>

            {/* Sản phẩm tương tự */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sản phẩm tương tự</Text>
                <FlatList
                    data={sampleProducts}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ProductCard item={item} />}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    scrollEnabled={false}
                />
            </View>

            {/* Sản phẩm nổi bật */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
                <FlatList
                    data={sampleProducts}
                    numColumns={2}
                    keyExtractor={(item) => item.id + '-hot'}
                    renderItem={({ item }) => <ProductCard item={item} />}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    scrollEnabled={false}
                />
            </View>
        </ScrollView>
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
        fontSize: 14,
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

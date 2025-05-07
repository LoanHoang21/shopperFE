import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/data';
import Icon from '@react-native-vector-icons/ant-design';
import { Product } from '../components/ProductCard';
import axios from 'axios';
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - 48) / 2;

type CompareRouteProp = RouteProp<RootStackParamList, 'compare'>;

const CompareScreen = () => {
    const route = useRoute<CompareRouteProp>();
    const navigation = useNavigation();

    // Sản phẩm từ productDetail
    const mainProduct = route.params.products[0];

    const [relatedProducts, setRelatedProducts] = React.useState<Product[]>([]);

    React.useEffect(() => {
        const fetchRelated = async () => {
            try {
              const res = await axios.get(`http://192.168.1.145:3001/api/product/${mainProduct._id}/related`);
          
              const related = (res.data.data || []).map((p: any) => ({
                ...p,
                shop_name: p.category_id?.shop_id?.name ?? 'Không rõ',
                shop_id: p.category_id?.shop_id?._id
              }));
          
              setRelatedProducts(related);
            } catch (err) {
              console.error('Failed to fetch related products:', err);
            }
          };
          

        if (mainProduct?._id) {
            fetchRelated();
        }
    }, [mainProduct]);


    const allProducts = [mainProduct, ...relatedProducts];

    const [selected, setSelected] = React.useState<string[]>([mainProduct.name]);

    const toggleSelect = (title: string) => {
        setSelected((prev) =>
            prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
        );
    };

    return (
        <View style={styles.container}>

            <FlatList
                data={allProducts}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 100 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: (item.images?.[0] || item.image) ?? 'https://via.placeholder.com/150' }} style={styles.image} />
                        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.price}>đ{item.price}</Text>
                        <Text style={styles.shop}>{item.shop_name}</Text>
                        <TouchableOpacity
                            style={[styles.checkbox, selected.includes(item.name) && styles.checked]}
                            onPress={() => toggleSelect(item.name)}
                        >
                            {selected.includes(item.name) && (
                                <Icon name="check" size={14} color="white" />
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            />

            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.compareBtn}
                    onPress={() => {
                        const selectedProducts = allProducts.filter(product =>
                            selected.includes(product.name)
                        );
                        navigation.navigate('compareResult', { 
                            products: selectedProducts,
                            related: relatedProducts, 

                         });
                    }}
                >
                    <Text style={{ color: 'white' }}>So sánh ({selected.length})</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default CompareScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 16 },
    title: { fontSize: 18, fontWeight: 'bold', marginVertical: 16 },
    card: {
        width: itemWidth,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        elevation: 2,
        padding: 8,
        position: 'relative',
    },
    image: { width: '100%', height: 100, borderRadius: 6 },
    name: { fontWeight: '600', marginTop: 8, fontSize: 13 },
    price: { color: '#d50000', fontWeight: 'bold', marginTop: 4 },
    shop: { color: '#777', fontSize: 12 },
    checkbox: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        width: 20,
        height: 20,
        backgroundColor: '#ccc',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checked: {
        backgroundColor: '#f50057',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 12,
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: 'white',
    },
    compareBtn: {
        backgroundColor: '#f50057',
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
});

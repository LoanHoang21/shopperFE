import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Platform,
    FlatList,
    StatusBar,
} from 'react-native';
import Icon from '@react-native-vector-icons/ant-design';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../components/ProductCard';

const keywordSuggestions = [
    'Chăn ga gối đệm', 'Chăn ga', 'Chăn', 'Quạt',
    'Ga trải giường', 'Vỏ gối', 'Chăn lông', 'Bộ chăn ga Cotton'
];



const SearchScreen = () => {
    const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const [showMore, setShowMore] = useState(false);
    const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://10.0.2.2:3001/api/product/suggested/ml-trending')
            .then(res => res.json())
            .then(json => {
                if (json.status === 'OK') {
                    setTrendingProducts(json.data);
                }
            })
            .catch((err) => console.error("Lỗi lấy sản phẩm trending:", err));
    }, []);

    const handleSearch = async (keyword: string) => {
        try {
            const res = await fetch(`http://10.0.2.2:3001/api/product/search?query=${encodeURIComponent(keyword)}`);
            const json = await res.json();

            if (json.status === 'OK') {
                navigation.navigate('searchResult', {
                    query: keyword,
                    products: json.data, // <-- truyền danh sách sản phẩm tìm được
                });
            }
        } catch (err) {
            console.error("Lỗi tìm kiếm sản phẩm:", err);
        }
    };


    const visibleSuggestions = showMore ? keywordSuggestions : keywordSuggestions.slice(0, 4);

    const renderHeader = () => (
        <View style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 20 }}>
            <View style={styles.searchRow}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ paddingHorizontal: 4 }}
                >
                    <Icon name="arrow-left" size={24} color="#f50057" />
                </TouchableOpacity>

                <View style={styles.searchBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Happy Bedding"
                        value={query}
                        onChangeText={setQuery}
                    />
                    <Icon name="camera" size={16} color="#f50057" style={{ marginHorizontal: 6 }} />
                </View>

                <TouchableOpacity onPress={() => handleSearch(query)} style={styles.searchBtn}>
                    <Icon name="search" size={18} color="white" style={{ transform: [{ scaleX: -1 }] }} />
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 16 }}>
                {visibleSuggestions.map((item, idx) => (
                    <TouchableOpacity key={idx} onPress={() => handleSearch(item)}>
                        <Text style={styles.keyword}>{item}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                    <Text style={styles.seeMore}>{showMore ? 'Ẩn bớt' : 'Xem thêm'}</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Gợi ý tìm kiếm</Text>
        </View>
    );

    return (
        <FlatList
            data={trendingProducts}
            keyExtractor={(item) => item._id}
            numColumns={2}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={{ padding: 16 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('productDetail', { product: item })}
                    style={styles.suggestBox}
                >
                    <Image
                        source={{ uri: item.images?.[0] || item.image }}
                        style={styles.suggestImage}
                    />
                    <Text style={styles.suggestText}>{item.name}</Text>
                </TouchableOpacity>
            )}

        />


    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fce4ec',
        borderRadius: 20,
        alignItems: 'center',
        paddingHorizontal: 8,
        marginRight: 10,
    },
    input: {
        marginLeft: 15,
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    searchBtn: {
        backgroundColor: '#f50057',
        borderRadius: 20,
        padding: 10,
    },
    keyword: {
        paddingVertical: 8,
        fontSize: 14,
        borderBottomWidth: 0.5,
        borderColor: '#eee',
        color: '#333',
    },
    seeMore: {
        color: '#f50057',
        marginTop: 6,
        marginBottom: 12,
        fontWeight: 'bold',
        fontSize: 14,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,
        marginBottom: 12,
    },
    suggestBox: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    suggestImage: {
        width: '100%',
        height: 100,
        borderRadius: 4,
        resizeMode: 'cover',
        marginBottom: 6,
    },
    suggestText: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },

});

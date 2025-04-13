import React, { useState } from 'react';
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

const searchIcon = require('../assets/search.png');

const keywordSuggestions = [
    'Chăn ga gối đệm', 'Chăn ga', 'Chăn', 'Chăn ấm',
    'Ga trải giường', 'Vỏ gối', 'Chăn lông', 'Bộ chăn ga Cotton'
];

const searchSuggestions = [
    { label: 'Chăn ga', image: 'https://i.imgur.com/kGkSg1v.png' },
    { label: 'Sáp thơm', image: 'https://i.imgur.com/OoE2t9g.png' },
    { label: 'Quà tặng', image: 'https://i.imgur.com/b8dKxHZ.png' },
    { label: 'Valentine', image: 'https://i.imgur.com/tRg5lIN.png' },
    { label: 'Bộ nến thơm', image: 'https://i.imgur.com/YZJybKR.png' },
    { label: 'Gối ôm cute', image: 'https://i.imgur.com/b8dKxHZ.png' },
    { label: 'Valentine', image: 'https://i.imgur.com/tRg5lIN.png' },
    { label: 'Bộ nến thơm', image: 'https://i.imgur.com/YZJybKR.png' },
];

const SearchScreen = () => {
    const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const [showMore, setShowMore] = useState(false);

    const handleSearch = (keyword: string) => {
        const matchedProducts = searchSuggestions.map(item => ({
            title: item.label,
            image: item.image,
            price: '169.000',
            oldPrice: '250.000',
            tag: 'Happy Bedding',
            rating: '4.5',
        })).filter(p =>
            p.title.toLowerCase().includes(keyword.toLowerCase())
        );

        navigation.navigate('searchResult', {
            query: keyword,
            products: matchedProducts,
        });
    };

    const visibleSuggestions = showMore ? keywordSuggestions : keywordSuggestions.slice(0, 4);

    const renderHeader = () => (
        <View style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 20 }}>
            {/* Search bar */}
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

            {/* Gợi ý từ khóa */}
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
            data={searchSuggestions}
            keyExtractor={(item, idx) => idx.toString()}
            numColumns={2}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={{ padding: 16 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => handleSearch(item.label)}
                    style={styles.suggestBox}
                >
                    <Image
                        source={{ uri: item.image }}
                        style={styles.suggestImage}
                    />
                    <Text style={styles.suggestText}>{item.label}</Text>
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
        backgroundColor: 'white',
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

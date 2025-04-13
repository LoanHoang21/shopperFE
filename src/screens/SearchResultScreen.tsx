// src/screens/SearchResultScreen.tsx
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform
} from 'react-native';
import { StatusBar } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/route';
import ProductCard, { Product } from '../components/ProductCard';
import Icon from '@react-native-vector-icons/ant-design';

type SearchResultRouteProp = RouteProp<RootStackParamList, 'searchResult'>;
const SearchResultScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<SearchResultRouteProp>();
    const { query, products } = route.params;

    return (
        <View style={styles.container}>
            {/* Search bar trên cùng */}
            <View style={styles.searchRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={22} color="#f50057" />
                </TouchableOpacity>
                <View style={styles.searchBox}>
                    <TextInput value={query} style={styles.input} editable={false} />
                    <TouchableOpacity>
                        <Image
                            source={require('../assets/search.png')}
                            style={{ width: 16, height: 16, tintColor: '#f50057' }}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Icon name="shopping-cart" size={22} color="#f50057" />
                </TouchableOpacity>
            </View>

            {/* Danh sách sản phẩm */}
            <FlatList
                data={products}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ paddingTop: 8 }}
                renderItem={({ item }) => <ProductCard item={item} />}
            />
        </View>
    );
};


export default SearchResultScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 25 : 25,
        backgroundColor: 'white',
    },

    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    searchBox: {
        flex: 1,
        backgroundColor: '#fde0eb',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 5,
        height: 36,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
});

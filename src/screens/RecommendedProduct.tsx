// src/screens/SearchResultScreen.tsx
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Platform, Text} from 'react-native';
import { StatusBar } from 'react-native';
import ProductCard from '../components/ProductCard';
import Icon from '@react-native-vector-icons/ant-design';
import { useNavigation } from '@react-navigation/native';
import { getRecommendedProductByOrders } from '../apis/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecommendedProduct = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState<any[]>([]);
    // const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // const fetchUserInfo = async () => {
        //     try {
        //     } catch (error) {
        //         console.log('Error fetching user info:', error);
        //     }
        // };

        const fetchProducts = async () => {
            const userInfo = await AsyncStorage.getItem('user');
            if (userInfo) {
                const user = JSON.parse(userInfo);
            const res = await getRecommendedProductByOrders(user._id);
            setProducts(res.data.DT || []);
            }
        };

        // fetchUserInfo();
        fetchProducts();
    }, []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={24} color="#F1215A" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Sản phẩm đề xuất</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('cart')}>
                    <Icon name="shopping-cart" size={27} color="#F1215A" />
                </TouchableOpacity>
            </View>

            {/* Danh sách sản phẩm */}
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ paddingTop: 15 }}
                renderItem={({ item }) => <ProductCard item={item} />}
            />
        </View>
    );
};

export default RecommendedProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 25 : 25,
        backgroundColor: 'white',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#F1215A',
        paddingHorizontal: 10,
    },
});

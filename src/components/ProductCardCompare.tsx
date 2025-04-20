import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from './ProductCard';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/data'; // đường dẫn đúng với dự án bạn

type NavigationProp = StackNavigationProp<RootStackParamList, 'compareResult'>;

interface Props {
    item: Product;
    isCheapest?: boolean;
    onPress?: () => void;
}

const ProductCardCompare: React.FC<Props> = ({ item, isCheapest = false, onPress }) => {
    const navigation = useNavigation<NavigationProp>();

    const handlePress = () => {
        if (onPress) {
            onPress(); // ưu tiên callback nếu có
        } else {
            navigation.navigate('productDetail', { product: item });
        }
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <View style={styles.imageWrapper}>
                <Image source={{ uri: item.image }} style={styles.image} />
                {isCheapest && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Rẻ hơn</Text>
                    </View>
                )}
            </View>

            <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.price}>{item.price.toLocaleString()}₫</Text>
            {item.discount && (
                <Text style={styles.oldPrice}>
                    {(Math.ceil(item.price / (1 - item.discount / 100))).toLocaleString()}₫
                </Text>
            )}
            <Text style={styles.shop}>{item.short_description || 'Chăn ga Pre'}</Text>
            <Text style={styles.rating}>⭐ {item.rating_avg?.toFixed(1) || '0.0'}/5</Text>

        </TouchableOpacity>
    );
};

export default ProductCardCompare;

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 2,
        padding: 8,
        width: '100%',
    },
    imageWrapper: {
        position: 'relative',
    },
    image: {
        height: 120,
        width: '100%',
        borderRadius: 6,
        resizeMode: 'cover',
    },
    badge: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: '#f50057',
        borderRadius: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,
        zIndex: 10,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    title: {
        fontWeight: '600',
        marginTop: 8,
        fontSize: 13,
    },
    price: {
        color: '#d50000',
        fontWeight: 'bold',
        marginTop: 4,
    },
    oldPrice: {
        fontSize: 12,
        textDecorationLine: 'line-through',
        color: '#888',
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    shop: {
        fontSize: 12,
        color: '#666',
    },
    rating: {
        fontSize: 12,
        color: '#fbc02d',
    },
});

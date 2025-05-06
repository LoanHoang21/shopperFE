import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export interface Product {
  _id: string;
  name: string;
  images?: string[];        
  image?: string;
  price: number;
  discount?: number;
  shop_id?: string;    
  rating_avg?: number;
  short_description?: string;
  description: string;
  shop_name?: string;
  category_id?: {
    _id: string;
    name: string;
    shop_id?: {
      _id: string;
      name: string;
    };
  };
  sale_quantity?: number;
  review_count_7d?: number;
  quantity?: number;
  variants?: any ;
}


interface Props {
  item: Product;
  onPress?: () => void;
}

const ProductCard: React.FC<Props> = ({ item, onPress }) => {
  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      // ✅ Gửi request tăng view trước
      await axios.post(`http://10.0.2.2:3001/api/product/view/${item._id}`);
     } catch (err) {
      console.error((err as Error).message);
    }
    

    // ✅ Sau đó mới điều hướng đến chi tiết sản phẩm
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('productDetail', { product: item });
    }
  };


  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        source={{ uri: (item.images?.[0] || item.image) ?? 'https://via.placeholder.com/150' }}
        style={styles.image}
      />

      <Text numberOfLines={2} style={styles.title}>{item.name}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{item.price.toLocaleString()}₫</Text>
        {item.discount ? (
          <Text style={styles.oldPrice}>
            {Math.ceil(item.price / (1 - item.discount / 100)).toLocaleString()}₫
          </Text>

        ) : null}
      </View>

     
      <View style={styles.metaRow}>
        <Text style={styles.shopName}>{item.shop_name}</Text>

        <Text style={styles.rating}>⭐ {item.rating_avg?.toFixed(1) || '0.0'}/5</Text>
      </View>


    </TouchableOpacity>
  );
};


export default ProductCard;

const styles = StyleSheet.create({
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    padding: 8,
    marginBottom: 16,
  },
  image: {
    height: 100,
    borderRadius: 6,
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 8,
    height: 36,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    color: '#d50000',
    fontWeight: 'bold',
    marginRight: 6,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: 12,
  },
  shopName: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  ratingRow: {
    marginTop: 4,
  },
  rating: {
    fontSize: 12,
    color: '#ff9800',
  },


  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  tag: {
    fontSize: 12,
  },


});
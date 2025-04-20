import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export interface Product {
  title: string;
  price: string;
  oldPrice: string;
  tag: string;
  rating: string;
  image: string;
}

interface Props {
  item: Product;
}

const ProductCard: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>
        đ{item.price} <Text style={styles.oldPrice}>đ{item.oldPrice}</Text>
      </Text>
      <View style={styles.meta}>
        <Text style={styles.tag}>{item.tag}</Text>
        <Text style={styles.rating}>⭐ {item.rating}/5</Text>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
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
  },
  price: {
    color: '#d50000',
    marginTop: 4,
    fontWeight: 'bold',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#aaa',
    fontSize: 12,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  tag: {
    fontSize: 12,
  },
  rating: {
    fontSize: 12,
    color: '#ff9800',
  },
});
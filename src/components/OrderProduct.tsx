import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type OrderProductProps = {
  name: string;
  variant: string;
  quantity: number;
  originalPrice?: number;
  salePrice?: number;
  imageUrl: string;
};

const formatCurrency = (value?: number) => {
  if (typeof value !== 'number' || isNaN(value)) return '₫0';
  return `₫${value.toLocaleString('vi-VN')}`;
};

const OrderProduct = ({
  name,
  variant,
  quantity,
  originalPrice,
  salePrice,
  imageUrl,
}: OrderProductProps) => {
  return (
    <View style={styles.row}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{name}</Text>
        <View style={styles.variantRow}>
          <Text style={styles.variant}>{variant}</Text>
          <Text style={styles.quantity}>x{quantity}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.originalPrice}>{formatCurrency(originalPrice)}</Text>
          <Text style={styles.salePrice}>{formatCurrency(salePrice)}</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderProduct;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#222',
  },
  variantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  variant: {
    fontSize: 13,
    color: '#555',
  },
  quantity: {
    fontSize: 13,
    color: '#333',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  originalPrice: {
    fontSize: 13,
    color: '#aaa',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  salePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e53935',
  },
});

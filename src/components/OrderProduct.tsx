import { View, Text, StyleSheet } from 'react-native';

import { Image } from 'react-native';

type OrderItemProps = {
  name: string;
  variant: string;
  quantity: number;
  originalPrice: number;
  salePrice: number;
  imageUrl: string;
};

const formatCurrency = (value: number) => {
  return `₫${value.toLocaleString('vi-VN')}`;
};

const OrderProduct = ({
  name,
  variant,
  quantity,
  originalPrice,
  salePrice,
  imageUrl,
}: OrderItemProps) => {
  return (
    <>
      <View style={styles.row}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.variant}>{variant}</Text>
            <Text style={styles.quantity}>x{quantity}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Text style={styles.originalPrice}>
              {formatCurrency(originalPrice)}
            </Text>
            <Text style={styles.salePrice}>{formatCurrency(salePrice)}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

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
    // backgroundColor: '#eee',
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
  variant: {
    fontSize: 13,
    color: '#555',
  },
  quantity: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 13,
    color: '#333',
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

export default OrderProduct;

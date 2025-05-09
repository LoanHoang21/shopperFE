import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CartItemI as ItemType, useCart } from '../context/CartContext';

const CartItem: React.FC<{ item: ItemType; onOutOfStock: (stock: number) => void }> = ({ item, onOutOfStock }) => {
    const { toggleItem, changeQty } = useCart();
  
    const handleIncrease = () => {
      console.log(item.stock)
      if (item.quantity >= item.stock) {
        onOutOfStock(item.stock); 
      } else {
        changeQty(item.id, 1);
      }
    };
  
    return (
      <View style={styles.itemCard}>
        <TouchableOpacity
          style={[
            styles.checkbox,
            item.checked && { backgroundColor: '#f4436c' },
          ]}
          onPress={() => toggleItem(item.id)}
        />
        <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          {item.attributes?.map((attr, index) => (
            <Text key={index} style={styles.attribute}>
              {attr.label}: {attr.value}
            </Text>
          ))}
  
          <View style={styles.bottomRow}>
            <View style={styles.priceGroup}>
              <Text style={styles.price}>đ{item.price.toLocaleString()}</Text>
              <Text style={styles.oldPrice}>đ{item.oldPrice.toLocaleString()}</Text>
            </View>
  
            <View style={styles.qtyRow}>
              <TouchableOpacity onPress={() => changeQty(item.id, -1)} style={styles.qtyBtn}>
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNum}>{item.quantity}</Text>
              <TouchableOpacity onPress={handleIncrease} style={styles.qtyBtn}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  export default CartItem;
  
const styles = StyleSheet.create({
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6,
      },
      
      priceGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      },
    attribute: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
      },
  itemCard: {
    backgroundColor:'#fff',
    flexDirection: 'row',
    marginBottom: 16,
    paddingRight: 16,
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: '#f4436c',
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 12,
    color: '#aaa',
    textDecorationLine: 'line-through',
  },
  qtyRow: {
    marginLeft:4,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  qtyBtn: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  qtyText: {
    fontWeight: 'bold',
  },
  qtyNum: {
    width: 30,
    textAlign: 'center',
  },
});

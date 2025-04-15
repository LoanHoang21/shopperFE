import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';

interface Props {
  onDeletePress?: () => void; // ✅ callback truyền từ CartScreen
}

const CartHeader: React.FC<Props> = ({ onDeletePress }) => {
  const navigation = useNavigation();
  const { items } = useCart();

  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
  const hasChecked = items.some((item) => item.checked);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backWrapper}>
        <Image source={require('../../assets/images/back.png')} style={styles.backIcon} />
        <Text style={styles.title}>
          Giỏ hàng <Text style={styles.count}>({totalQty})</Text>
        </Text>
      </TouchableOpacity>

      {hasChecked && onDeletePress && (
  <TouchableOpacity onPress={onDeletePress} style={styles.deleteBtn}>
    <Image
      source={require('../../assets/images/delete.png')}
      style={styles.deleteIcon}
    />
  </TouchableOpacity>
)}

    </View>
  );
};

export default CartHeader;

const styles = StyleSheet.create({
  header: {
    height: 100,
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#f4436c',
    marginRight: 8,
    marginTop: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4436c',
  },
  count: {
    fontSize: 14,
    color: '#f4436c',
  },
  deleteBtn: {
    padding: 8,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    tintColor: '#f4436c',
  },
});

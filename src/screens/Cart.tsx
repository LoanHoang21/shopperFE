import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routers/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

const Cart = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🛒 Đây là trang Giỏ hàng</Text>
      <Button title="Quay về Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', 
    borderWidth: 1,
    borderColor: "red",
  },
  text: { fontSize: 20, marginBottom: 16 }
});

export default Cart;

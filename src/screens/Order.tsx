import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
// import { RootStackParamList } from '../components/navigation/AppNavigation';

type OrderRouteProp = RouteProp<RootStackParamList, 'order'>;

const Order = () => {
  const route = useRoute<OrderRouteProp>();
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🛒 Mã đơn hàng: {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24 },
});

export default Order;

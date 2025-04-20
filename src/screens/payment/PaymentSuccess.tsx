import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderSuccess = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/845/845646.png' }}
        style={styles.icon}
      />

      <Text style={styles.title}>Đặt hàng thành công</Text>

      <Text style={styles.description}>
        Vui lòng chỉ nhận hàng và thanh toán khi đơn mua ở trạng thái{' '}
        <Text style={{ fontWeight: '600' }}>“Đang giao hàng”</Text>
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('home')}>
          <Text style={styles.buttonText}>Trang chủ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('order')}>
          <Text style={styles.buttonText}>Đơn mua</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 20,
    },
    icon: {
      width: 48,
      height: 48,
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
      color: '#000',
    },
    description: {
      fontSize: 14,
      color: '#333',
      textAlign: 'center',
      marginBottom: 24,
      paddingHorizontal: 16,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 12,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 6,
      backgroundColor: '#F1215A',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
    },
  });
  

export default OrderSuccess;

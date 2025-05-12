import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const OrderSuccess = () => {
  const navigation = useNavigation();
  

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/845/845646.png' }}
        style={styles.icon}
      />

      <Text style={styles.title}>🎉 Đặt hàng thành công!</Text>

      <Text style={styles.description}>
        Cảm ơn bạn đã mua hàng. Vui lòng chỉ nhận hàng & thanh toán khi đơn ở trạng thái{' '}
        <Text style={styles.highlight}>“Đang giao hàng”</Text>.
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.secondary]} onPress={() => navigation.navigate('home')}>
          <Text style={styles.secondaryText}>Về trang chủ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('order')}>
          <Text style={styles.buttonText}>Xem đơn hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F1215A',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  highlight: {
    fontWeight: '700',
    color: '#F1215A',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    backgroundColor: '#F1215A',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    minWidth: width * 0.4,
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F1215A',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryText: {
    color: '#F1215A',
    fontWeight: '700',
    fontSize: 14,
  },
});

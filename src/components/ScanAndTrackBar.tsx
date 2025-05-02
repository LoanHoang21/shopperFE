import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ScanAndTrackBar: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Nút Quét mã */}
      <TouchableOpacity style={[styles.button, styles.leftButton]}>
        <Image source={require('../assets/images/scan.png')} style={styles.icon} />
        <Text style={styles.text}>Quét mã</Text>
      </TouchableOpacity>

      {/* Nút Theo dõi đơn hàng */}
      <TouchableOpacity style={[styles.button, styles.rightButton]}>
        <Image source={require('../assets/images/order_track.png')} style={styles.icon} />
        <Text style={styles.text}>Theo dõi đơn hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScanAndTrackBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 12,
    elevation: 2, // tạo bóng
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    justifyContent: 'flex-start',
    marginLeft:20,
  },
  leftButton: {
    borderRightWidth: 1,
    borderColor: '#eee',
  },
  rightButton: {
    // không cần gì thêm
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#213c78', // màu xanh đậm
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
});

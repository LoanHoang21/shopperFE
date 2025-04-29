import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ToastSuccess: React.FC<{ message: string }> = ({ message }) => {
  return (
    <View style={styles.toast}>
      <Image
        source={require('../../assets/images/checkSuccess.png')} // icon tick xanh
        style={styles.icon}
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default ToastSuccess;

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: '#4CAF50',
    marginRight: 8,
  },
  text: {
    color: '#333',
    fontWeight: '500',
  },
});

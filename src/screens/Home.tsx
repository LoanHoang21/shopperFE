import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routers/AppNavigator';

// type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏠 Đây là trang Home</Text>
      <Button title="Đi tới Giỏ hàng" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, marginBottom: 16 }
});

export default Home;

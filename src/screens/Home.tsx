import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Home = () => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏠 Đây là trang Home</Text>
      <Button
        title="Đi tới Giỏ hàng 123"
        onPress={() => navigation.navigate('order', {id: 1234})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 20, marginBottom: 16},
});

export default Home;

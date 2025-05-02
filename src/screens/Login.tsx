import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '@react-native-vector-icons/ant-design';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { userLogin } from '../apis/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkAndNotifyExpiringVouchers } from '../utils/notiVoucher';  // Giả sử bạn đã viết api này
import { RootStackParamList } from '../types/data';

const Login = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [valueLogin, setValueLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Trạng thái đăng nhập

  // Gọi checkAndNotifyExpiringVouchers khi đăng nhập thành công
  useEffect(() => {
    if (isLoggedIn) {
      // Gọi 1 lần khi app mở
      checkAndNotifyExpiringVouchers();

      // Gọi lại sau mỗi 2 phút
      const interval = setInterval(() => {
        checkAndNotifyExpiringVouchers();
      }, 5 * 60 * 1000); // 5 phút

      return () => clearInterval(interval); // Clear khi component unmount
    }
  }, [isLoggedIn]); // Chạy lại khi trạng thái đăng nhập thay đổi

  // Handle login action
  const handleLogin = async () => {
    let res = await userLogin(valueLogin, password);
    if (res && res.data && +res.data.EC === 0) {
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: `${res.data.EM}`,
        position: 'bottom',
        visibilityTime: 1500,
      });

      // Lưu thông tin người dùng vào AsyncStorage
      try {
        await AsyncStorage.setItem('user', JSON.stringify(res.data.DT));
        console.log('Dữ liệu đã được lưu!');
      } catch (e) {
        console.error('Lỗi khi lưu dữ liệu:', e);
      }

      // Lấy thông tin người dùng từ AsyncStorage và điều hướng
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          if (user.role == 1) {
            navigation.navigate('homeAdmin');
          } else {
            navigation.navigate('home');
          }
          setIsLoggedIn(true);  // Đặt trạng thái đăng nhập thành công
        }
      } catch (e) {
        console.error('Lỗi khi lấy dữ liệu:', e);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: `${res.data.EM}`,
        position: 'bottom',
        visibilityTime: 1500,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={{ fontSize: 30, textAlign: 'center', paddingBottom: 15 }}>Đăng Nhập</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}><Text style={{ color: 'red' }}>*</Text> SĐT/Email/Tên đăng nhập</Text>
            <TextInput
              style={styles.input}
              placeholder="SĐT/Email/Tên đăng nhập đã đăng kí"
              placeholderTextColor="#aaa"
              value={valueLogin}
              onChangeText={setValueLogin}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}><Text style={{ color: 'red' }}>*</Text> Mật khẩu</Text>
            <View style={styles.input}>
              <TextInput
                placeholder="Vui lòng nhập mật khẩu"
                placeholderTextColor="#aaa"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ justifyContent: 'center' }}>
                <Icon name={showPassword ? 'eye' : 'eye-invisible'} size={17} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={handleLogin}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={['#F55539', '#F1215A', '#F42384']}
              style={styles.loginButton}
            >
              <Text style={styles.loginText}>Đăng Nhập</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {},
  content: {
    alignContent: 'center',
    marginTop: screenHeight * 0.38,
    paddingHorizontal: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    color: 'black',
    marginBottom: 10,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#fbb',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  loginButton: {
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

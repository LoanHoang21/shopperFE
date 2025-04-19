import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '@react-native-vector-icons/ant-design';
import { NavigationProp, useNavigation } from '@react-navigation/native';
// import Register from './Register';

const Login = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [tab, setTab] = useState<'phone' | 'email'>('phone');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, tab === 'phone' && styles.tabActive]}
              onPress={() => setTab('phone')}
            >
              <Text style={tab === 'phone' ? styles.tabTextActive : styles.tabText}>Số Điện Thoại</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, tab === 'email' && styles.tabActive]}
              onPress={() => setTab('email')}
            >
              <Text style={tab === 'email' ? styles.tabTextActive : styles.tabText}>Email</Text>
            </TouchableOpacity>
          </View>

          {/* Input fields */}
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}><Text style={{ color: 'red'}}>*</Text>  {tab==="phone"?"Số điện thoại":"Email"}</Text>
            <TextInput 
              style={styles.input}
              placeholder={tab === 'phone' ? 'SDT đăng ký tài khoản' : 'Email đăng ký tài khoản'}
              placeholderTextColor = "#aaa"
              keyboardType={tab === 'phone' ? 'numeric' : 'default'}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}><Text style={{ color: 'red'}}>*</Text>  Mật khẩu</Text>
            <View style={styles.input}>
              <TextInput
                // style={[styles.input, { flex: 1, borderWidth: 0 }]}
                placeholder="Vui lòng nhập mật khẩu"
                placeholderTextColor="#aaa"
                secureTextEntry = {!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{justifyContent:'center'}}>
                <Icon name={showPassword ? 'eye' : 'eye-invisible'} size={17}/>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.registerAndForgotPassword}>
            <TouchableOpacity onPress={()=> {navigation.navigate('register')}}>
              <Text style={styles.register}>Đăng ký</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>

          {/* Button Đăng Nhập */}
          <TouchableOpacity onPress={() => {navigation.navigate('home')}}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['#F55539', '#F1215A', '#F42384']}
              style={styles.loginButton}
            >
              <Text style={styles.loginText}>Đăng Nhập</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.supportLink}>
            <Text style={styles.supportText}>📞 Liên hệ hỗ trợ</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

// const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignContent: 'center',
    marginTop: screenHeight * 0.4,
    paddingHorizontal: 30,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#ffe6eb',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#F1215A',
  },
  tabTextActive: {
    color: '#F1215A',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    color: 'black',
    marginBottom: 5,
    // fontWeight: 'bold',
  },
  input: {
    flexDirection:'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#fbb',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },

  registerAndForgotPassword: {
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  register: {
    color: '#F1215A',
  },
  forgotPassword: {
    color: '#F1215A',
    textAlign: 'right',
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
  // supportLink: {
  //   marginTop: 20,
  //   alignItems: 'center',
  // },
  // supportText: {
  //   color: '#f857a6',
  // },
});

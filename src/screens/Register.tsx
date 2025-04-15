import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '@react-native-vector-icons/ant-design';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const Register = () => {
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
            <Text style = {styles.label}>Tên đăng nhập</Text>
            <TextInput 
              style={styles.input}
              placeholder = 'Nhập vào tên đăng nhập'
              placeholderTextColor = "#aaa"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}><Text style={{ color: 'red'}}>*</Text>  {tab==="phone"?"Số điện thoại":"Email"}</Text>
            <TextInput 
              style={styles.input}
              placeholder={tab === 'phone' ? 'Nhập vào số điện thoại' : 'Nhập vào Email'}
              placeholderTextColor = "#aaa"
              keyboardType={tab === 'phone' ? 'numeric' : 'default'}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}><Text style={{ color: 'red'}}>*</Text>  Mật khẩu</Text>
            <View style={styles.input}>
              <TextInput
                placeholder="Vui lòng nhập mật khẩu"
                placeholderTextColor="#aaa"
                secureTextEntry = {!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{justifyContent:'center'}}>
                <Icon name={showPassword ? 'eye' : 'eye-invisible'} size={17}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}><Text style={{ color: 'red'}}>*</Text>  Xác nhận mật khẩu</Text>
            <View style={styles.input}>
              <TextInput
                placeholder="Vui lòng xác nhận mật khẩu"
                placeholderTextColor="#aaa"
                secureTextEntry = {!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{justifyContent:'center'}}>
                <Icon name={showPassword ? 'eye' : 'eye-invisible'} size={17}/>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={styles.login}>Đăng nhập</Text>
          </TouchableOpacity>

          {/* Button Đăng Ký */}
          <TouchableOpacity onPress={() => {navigation.navigate('login')}}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['#F55539', '#F1215A', '#F42384']}
              style={styles.registerButton}
            >
              <Text style={styles.registerText}>Đăng Ký</Text>
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

export default Register;

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
  login: {
    color: '#F1215A',
    textAlign:'center',
    paddingBottom: 20,
  },
  registerButton: {
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  registerText: {
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

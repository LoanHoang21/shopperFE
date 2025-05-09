import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '@react-native-vector-icons/ant-design';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {registerNewUser} from '../apis/Auth';
import Toast from 'react-native-toast-message';

const Register = () => {
  const navigation: NavigationProp<any> = useNavigation();
  const [tab, setTab] = useState<'phone' | 'email'>('phone');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Effect to reset errors on tab change
  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      email: '',
      phone: '',
    }));
  }, [tab]);

  // Validation logic using a shared function for email/phone
  const validateInput = useCallback((field: string, value: string): string => {
    switch (field) {
      case 'email':
        if (tab === 'email') {
          if (!value) return 'Email không được để trống';
          if (!/\S+@\S+\.\S+/.test(value)) return 'Email không hợp lệ';
        }
        break;
      case 'phone':
        if (tab === 'phone') {
          if (!value) return 'Số điện thoại không được để trống';
          if (!/^[0-9]{10}$/.test(value)) return 'Số điện thoại không hợp lệ';
        }
        break;
      case 'password':
        if (!value) return 'Bạn chưa nhập mật khẩu';
        break;
      case 'confirmPassword':
        if (!value) return 'Bạn chưa xác nhận mật khẩu';
        if (value !== password) return 'Mật khẩu xác nhận không khớp';
        break;
      default:
        return '';
    }
    return '';
  }, [password, tab]);

  // Handling input validation
  const handleValidation = useCallback(() => {
    const updatedErrors: Record<string, string> = {};
    const fields = ['email', 'phone', 'password', 'confirmPassword'];
    fields.forEach((field) => {
      const value = field === 'email' ? email : field === 'phone' ? phone : field === 'password' ? password : confirmPassword;
      const error = validateInput(field, value);
      if (error) updatedErrors[field] = error;
    });
    setErrors(updatedErrors);
    return Object.keys(updatedErrors).length === 0;
  }, [email, phone, password, confirmPassword, validateInput]);

  // Handle register action
  const handleRegister = async () => {
    if (handleValidation()) {
      let res = await registerNewUser(username, email, phone, password)
      let serverData = res.data;
      if(+serverData.EC === 0){
        Toast.show({
          type: 'success',
          text1: 'Thông báo',
          text2: `${serverData.EM}`,
          position:'bottom',
          visibilityTime: 1500,
        });
      }else{
          Toast.show({
            type: 'error',
            text1: 'Thông báo',
            text2: `${serverData.EM}`,
            position:'bottom',
            visibilityTime: 1500,
          });
      }
    }
  };
  
  const renderInputField = (label: string, placeholder: string, value: string, onChangeText: (text: string) => void, error: string, secureTextEntry: boolean = false, togglePasswordVisibility: () => void, isPasswordField: boolean = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label!='Tên đăng nhập'? <Text style={{ color: 'red' }}>*</Text>:<></>} {label}</Text>
      <View style={[styles.input, error ? { borderColor: 'red' } : {}]}>
        <TextInput
          style={{ flex: 1 }}
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
        />
        {isPasswordField && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={{ justifyContent: 'center' }}>
            <Icon name={secureTextEntry ? 'eye-invisible' : 'eye'} size={17} />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            {/* Tabs */}
            <View style={styles.tabs}>
              <TouchableOpacity style={[styles.tab, tab === 'phone' && styles.tabActive]} onPress={() => setTab('phone')}>
                <Text style={tab === 'phone' ? styles.tabTextActive : styles.tabText}>Số Điện Thoại</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.tab, tab === 'email' && styles.tabActive]} onPress={() => setTab('email')}>
                <Text style={tab === 'email' ? styles.tabTextActive : styles.tabText}>Email</Text>
              </TouchableOpacity>
            </View>

            {/* Input fields */}
            {renderInputField('Tên đăng nhập', 'Nhập vào tên đăng nhập', 
              username, setUsername, errors.username, false, () => {}, false)
            }
            {tab === 'phone' 
              ? renderInputField('Số điện thoại', 'Nhập vào số điện thoại',
                  phone, setPhone, errors.phone, false, () => {}, false
                )
              : renderInputField('Email', 'Nhập vào Email', 
                  email, setEmail, errors.email, false, () => {}, false
                )}
            {renderInputField('Mật khẩu', 'Vui lòng nhập mật khẩu',
              password, setPassword, errors.password, showPassword,
              () => setShowPassword(prev => !prev), true)
            }
            {renderInputField('Xác nhận mật khẩu', 'Vui lòng xác nhận mật khẩu', 
              confirmPassword, setConfirmPassword, errors.confirmPassword, showConfirmPassword,
              () => setShowConfirmPassword(prev => !prev), true)
            }

            {/* Login and Register buttons */}
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.login}>Đăng nhập</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleRegister}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#F55539', '#F1215A', '#F42384']} style={styles.registerButton}>
                <Text style={styles.registerText}>Đăng Ký</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: screenHeight * 0.37,
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
    marginBottom: 10,
  },
  label: {
    color: 'black',
    marginBottom: 5,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#fbb',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  login: {
    color: '#F1215A',
    textAlign: 'center',
    marginTop: 10,
  },
  registerButton: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Register;

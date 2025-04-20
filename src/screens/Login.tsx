import React, { use, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '@react-native-vector-icons/ant-design';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { userLogin } from '../apis/Auth';
// import Register from './Register';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  // const [errors, setErrors] = useState({
  //     valueLogin: '',
  //     password: '',
  // });

  const [valueLogin, setValueLogin] = useState('');
  const [password, setPassword] = useState('');

  // const isValidInputs = () => {
  //   // if(!ema)
  // }

  // Handle register action
  const handleLogin = async () => {
    // if (handleValidation()) {
      let res = await userLogin(valueLogin, password)
      // console.log(res);
      if( res && res.data && +res.data.EC === 0){
        Toast.show({
          type: 'success',
          text1: 'Thông báo',
          text2: `${res.data.EM}`,
          position:'bottom',
          visibilityTime: 1500,
        });
        // let data = {
        //   isAuthenticated = true,
        //   token:'fake token',
        // }
        try {
          await AsyncStorage.setItem('user', JSON.stringify(res.data.DT));
          console.log('Dữ liệu đã được lưu!');
        } catch (e) {
          console.error('Lỗi khi lưu dữ liệu:', e);
        }
      //   // Lấy chuỗi JSON từ AsyncStorage
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);  // Chuyển đổi chuỗi JSON thành đối tượng
          // console.log('User ID:', user._id);  // Truy cập trực tiếp vào thuộc tính user._id
          // console.log('User Name:', user.name);  // Truy cập vào các thuộc tính khác
          // return user;
          console.log(user, ".......", user.role);
          if(user.role == 1){
            navigation.navigate('homeAdmin');
          }else{
            navigation.navigate('home');
          }
        }
      } catch (e) {
        console.error('Lỗi khi lấy dữ liệu:', e);
      }
      // if(storedUser!=null){
      //   console.log(JSON.parse(storedUser));
      // }else{
      //   console.log("Lỗi storedUser trả về null");
      // }
        // navigation.navigate('home');
      }else{
          Toast.show({
            type: 'error',
            text1: 'Thông báo',
            text2: `${res.data.EM}`,
            position:'bottom',
            visibilityTime: 1500,
          });
      }
      // console.log("Đăng ký thành công!");
      // Logic đăng ký
      // navigation.navigate('login');
    // }
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={{fontSize: 30, textAlign:'center', paddingBottom: 15,}}>Đăng Nhập</Text>
          {/* <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, tab === 'phone' && styles.tabActive]}
              onPress={() => setTab('phone')}
            >
              <Text style={tab === 'phone' ? styles.tabTextActive : styles.tabText}>Tên đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, tab === 'email' && styles.tabActive]}
              onPress={() => setTab('email')}
            >
              <Text style={tab === 'email' ? styles.tabTextActive : styles.tabText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, tab === 'email' && styles.tabActive]}
              onPress={() => setTab('email')}
            >
              <Text style={tab === 'email' ? styles.tabTextActive : styles.tabText}>Email</Text>
            </TouchableOpacity>
          </View> */}
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}><Text style={{ color: 'red'}}>*</Text>  SĐT/Email/Tên đăng nhập</Text>
            <TextInput 
              style={styles.input}
              // placeholder={tab === 'phone' ? 'SDT đăng ký tài khoản' : 'Email đăng ký tài khoản'}
              placeholder="SĐT/Email/Tên đăng nhập đã đăng kí"
              placeholderTextColor = "#aaa"
              value={valueLogin}
              onChangeText={setValueLogin}
              // keyboardType={tab === 'phone' ? 'numeric' : 'default'}
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
                value={password}
                onChangeText={setPassword}
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
          {/* navigation.navigate('home'),  */}
          <TouchableOpacity onPress={handleLogin}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['#F55539', '#F1215A', '#F42384']}
              style={styles.loginButton}
            >
              <Text style={styles.loginText}>Đăng Nhập</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Hoặc đăng nhập bằng</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="google" size={40} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="facebook" size={40} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="apple" size={40} color="#000" />
            </TouchableOpacity>
          </View>

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
  },
  content: {
    alignContent: 'center',
    marginTop: screenHeight * 0.38,
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
    marginBottom: 10,
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#aaa',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#eee',
  },
  
});

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from '@react-native-vector-icons/ant-design';
// import Toast from 'react-native-toast-message';
// import { userLogin } from '../apis/Auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationProp, useNavigation } from '@react-navigation/native';

// const Login = () => {
//   const navigation: NavigationProp<RootStackParamList> = useNavigation();
//   const [showPassword, setShowPassword] = useState(false);
//   const [valueLogin, setValueLogin] = useState('');
//   const [password, setPassword] = useState('');
//   const [fcmToken, setFcmToken] = useState('');  // Cần thêm fcmToken

//   // Handle đăng nhập
//   const handleLogin = async () => {
//     let res = await userLogin(valueLogin, password, fcmToken); // Gửi fcmToken
//     if(res && res.data && +res.data.EC === 0){
//       Toast.show({
//         type: 'success',
//         text1: 'Thông báo',
//         text2: `${res.data.EM}`,
//         position: 'bottom',
//         visibilityTime: 1500,
//       });

//       try {
//         await AsyncStorage.setItem('user', JSON.stringify(res.data.DT));
//       } catch (e) {
//         console.error('Lỗi khi lưu dữ liệu:', e);
//       }

//       // Chuyển hướng theo role
//       try {
//         const userData = await AsyncStorage.getItem('user');
//         if (userData) {
//           const user = JSON.parse(userData);
//           if(user.role === 1) {
//             navigation.navigate('homeAdmin');
//           } else {
//             navigation.navigate('home');
//           }
//         }
//       } catch (e) {
//         console.error('Lỗi khi lấy dữ liệu:', e);
//       }
//     } else {
//       Toast.show({
//         type: 'error',
//         text1: 'Thông báo',
//         text2: `${res.data.EM}`,
//         position: 'bottom',
//         visibilityTime: 1500,
//       });
//     }
//   };

 

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <View style={styles.container}>
//         <View style={styles.content}>
//           <Text style={{ fontSize: 30, textAlign: 'center', paddingBottom: 15 }}>Đăng Nhập</Text>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}><Text style={{ color: 'red' }}>*</Text> SĐT/Email/Tên đăng nhập</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="SĐT/Email/Tên đăng nhập đã đăng kí"
//               placeholderTextColor="#aaa"
//               value={valueLogin}
//               onChangeText={setValueLogin}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}><Text style={{ color: 'red' }}>*</Text> Mật khẩu</Text>
//             <View style={styles.input}>
//               <TextInput
//                 placeholder="Vui lòng nhập mật khẩu"
//                 placeholderTextColor="#aaa"
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={setPassword}
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ justifyContent: 'center' }}>
//                 <Icon name={showPassword ? 'eye' : 'eye-invisible'} size={17} />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <TouchableOpacity onPress={handleLogin}>
//             <LinearGradient
//               start={{ x: 0, y: 0 }}
//               end={{ x: 0, y: 1 }}
//               colors={['#F55539', '#F1215A', '#F42384']}
//               style={styles.loginButton}
//             >
//               <Text style={styles.loginText}>Đăng Nhập</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {},
//   content: {
//     alignContent: 'center',
//     marginTop: Dimensions.get('window').height * 0.38,
//     paddingHorizontal: 30,
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     color: 'black',
//     marginBottom: 10,
//   },
//   input: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: '#fbb',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     backgroundColor: '#fff',
//   },
//   loginButton: {
//     paddingVertical: 15,
//     borderRadius: 50,
//     alignItems: 'center',
//   },
//   loginText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 15,
//   },
//   logoutText: {
//     color: '#F1215A',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });

// export default Login;

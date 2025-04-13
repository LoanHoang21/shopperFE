// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import React from "react";
// import { Button, StyleSheet, View, Text } from "react-native";
// import { RootStackParamList } from "../routers/AppNavigator";
// import LinearGradient from "react-native-linear-gradient";
// // import { Icon } from "@react-navigation/elements";
// // import { StyleSheet } from "react-native";

// // type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

// const Login = () => {
//     return (
//         <View style={styles.container}>
//             <LinearGradient
//                 start={{x: 0, y: 0}}
//                 end={{x: 0, y: 1}}
//                 colors={['#F55539', '#F1215A', '#F42384']}
//                 style={{flex: 1}}
//             >
//             <View>
//                 <Button
//                     title="Đăng nhập"
//                     onPress={() => {}}
//                 />
//             </View>
//             </LinearGradient>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
// 	container: {
//         borderWidth: 1,
//         borderColor: "red",
//     },
//     text: {

//     }
// });

// export default Login;

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import BackgroundImage from '../assets/images/background.png';
import Icon from '@react-native-vector-icons/ant-design';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const BeforeLogin = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  return (
    <View style={styles.container}>
      {/* <StatusBar 
        // backgroundColor="light-content"
      /> */}
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => { navigation.navigate('login')}}>
              <LinearGradient 
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                colors={['#F55539', '#F1215A', '#F42384']}
                style={styles.loginButton}
              >
              <Text style={styles.loginText}>Đăng Nhập</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerButton} onPress={() => { navigation.navigate('register'); }}>
            <Icon name="user-add" size={25} color="#F1215A"/>
            <Text style={styles.registerText}>Đăng Ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BeforeLogin;

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    // marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2,
    // borderColor: "black",
  },
  loginButton: {
    width: screenWidth * 0.8,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  registerButton: {
    width: screenWidth * 0.8,
    paddingVertical: 15,
    borderRadius: 50,
    backgroundColor: '#fce4ec',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  registerText: {
    color: '#F1215A',
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 5,
  },
});

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
import { RootStackParamList } from '../types/data';

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
            <Icon name="user" size={25} color="#F1215A"/>
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
    alignItems: 'center',
    justifyContent: 'center',
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

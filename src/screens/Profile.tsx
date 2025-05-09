import {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/data';
// import {updateFcmToken} from '../apis/User';
import { logout } from '../apis/Auth';

const Profile = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setUsername(parsedUser.username || '');
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      if (user?._id) {
        // await updateFcmToken(user._id, null);
        await logout(user._id);
      }
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{name: 'login'}],
      });
    } catch (err) {
      Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
    }
  };

  const handleChangePassword = () => {
    navigation.navigate('changePassword' as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên đăng nhập</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholder="Nhập tên đăng nhập"
      />

      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        value={user?.phone || ''}
        editable={false}
        style={[styles.input, styles.disabledInput]}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={user?.email || ''}
        editable={false}
        style={[styles.input, styles.disabledInput]}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.changeButton}
          onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
  },
  changeButton: {
    backgroundColor: '#4da6ff',
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

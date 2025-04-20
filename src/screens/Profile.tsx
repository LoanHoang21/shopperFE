import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from "@react-navigation/native";

const Profile = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    useEffect(() => {
        const fetchUserData = async () => {
            // Lấy chuỗi JSON từ AsyncStorage
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser != null) {
                console.log(JSON.parse(storedUser)); // In dữ liệu user từ AsyncStorage
            } else {
                console.log("Lỗi storedUser trả về null");
            }
        };

        fetchUserData(); // Gọi hàm để lấy dữ liệu khi component mount
    }, []); // Chạy một lần khi component mount
   
    const showToast = () => {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Thông báo',
    //     text2: 'Bạn đã gọi Toast thành công 🚀',
    //     position: 'bottom',
    //   });
        Toast.show({
            type: 'success',
            text1:'Thông báo',
            
        })
      console.log('>>>>>>>>>>tới đây rồi')
    };

     // Handle đăng xuất
      const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        navigation.navigate('login');
      };
    
    return (
        <View>
            <TouchableOpacity onPress={showToast}>
                <Text style={{borderColor:'black', borderWidth: 1}}>Hello</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={{fontSize: 30}}>Đăng xuất</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
}

export default Profile;
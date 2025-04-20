import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Order from '../screens/Order';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CompareScreen from '../screens/CompareScreen';
import CompareResultScreen from '../screens/CompareResultScreen';
import SearchScreen from '../screens/SearchScreen'
import Icon from '@react-native-vector-icons/ant-design';
import { RootStackParamList } from '../types/data';
import SearchResultScreen from '../screens/SearchResultScreen'
import { Text } from 'react-native';

import BeforeLogin from '../screens/BeforeLogin';
import Login from '../screens/Login';
import HeaderLogin from './headers/HeaderLogin';
import Register from '../screens/Register';
import HeaderHome from './headers/HeaderHome';
import CartScreen from '../screens/Cart';
import Notification from '../screens/Notification';
import { StyleSheet } from 'react-native';
import HeaderNotification from './headers/HeaderNotification';
import PromotionNotification from '../screens/PromotionNotification';
import UpdateOrder from '../screens/UpdateOrder';
import HeaderUpdateOrder from './headers/HeaderUpdateOrder';
// import HeaderUpdateOrder from './headers/HeaderUpdateOrder';
import Payment from '../screens/payment/Payment';
import PaymentMethod from '../screens/payment/PaymentMethod';
import PaymentSuccess from '../screens/payment/PaymentSuccess';

const RouterMain = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        // <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Navigator>
           
            <Stack.Screen
                name="beforeLogin"
                component={BeforeLogin}
                options={{ header: () => <HeaderLogin /> }}
            />
            <Stack.Screen
                name="login"
                component={Login}
                options={{ header: () => <HeaderLogin /> }}
            />
            <Stack.Screen
                name="register"
                component={Register}
                options={{ header: () => <HeaderLogin /> }}
            />
            <Stack.Screen
                name="productDetail"
                component={ProductDetailScreen}
                options={({ navigation }) => ({
                    headerTitle: '',
                    headerLeft: () => (
                        <Icon
                            name="arrow-left"
                            size={26}
                            color="#f50057"
                            style={{ marginLeft: 16 }}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                    headerRight: () => (
                        <Icon
                            name="shopping-cart"
                            size={28} // 👉 tăng kích thước
                            color="#f50057"
                            style={{ marginRight: 0 }}
                            onPress={() => navigation.navigate('cart')}
                        />
                    ),
                })}
            />
             <Stack.Screen
                name="home"
                component={Home}
                options={{ header: () => <HeaderHome /> }}
            />
            <Stack.Screen
                name="compare"
                component={CompareScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Icon
                            name="arrow-left"
                            size={24}
                            color="#f50057"
                            style={{ marginLeft: 16 }}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                    headerTitle: () => (
                        <Text style={{ color: '#f50057', fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>
                            So sánh
                        </Text>
                    ),
                })}
            />

            <Stack.Screen
                name="compareResult"
                component={CompareResultScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Icon
                            name="arrow-left"
                            size={24}
                            color="#f50057"
                            style={{ marginLeft: 16 }}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                    headerTitle: () => (
                        <Text style={{ color: '#f50057', fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>
                            Kết quả so sánh
                        </Text>
                    ),
                })}
            />


            <Stack.Screen
                name="search"
                component={SearchScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="searchResult"
                component={SearchResultScreen}
                options={{ headerShown: false }}
            />
            
            <Stack.Screen
                name="order"
                component={Order}
            // options={{ title: 'Chi tiết Review' }}
            />
            <Stack.Screen
                name="cart"
                component={CartScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="payment"
                component={Payment}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="paymentMethod"
                component={PaymentMethod}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="paymentSuccess"
                component={PaymentSuccess}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="notification"
                component={Notification}
                options={{ header: () => <HeaderNotification /> }}
            />
            <Stack.Screen
                name="promotionNotification"
                component={PromotionNotification}
            // options={{ header: () => <HeaderNotification/> }}
            />
            <Stack.Screen
                name="updateOrder"
                component={UpdateOrder}
                options={{ header: () => <HeaderUpdateOrder /> }}
            />




        </Stack.Navigator>
    );


}

export default RouterMain;

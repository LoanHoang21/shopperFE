import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Order from '../screens/Order';
import BeforeLogin from '../screens/BeforeLogin';
import Login from '../screens/Login';
import HeaderLogin from '../components/headers/HeaderLogin';
import Register from '../screens/Register';
import HeaderHome from '../components/headers/HeaderHome';
import CartScreen from '../screens/Cart';
import NotiType from '../screens/NotiType';
import HeaderNotification from '../components/headers/HeaderNotification';
import NotiTypeDetails from '../screens/NotiTypeDetails';
import UpdateOrder from '../screens/UpdateOrder';
import HeaderUpdateOrder from '../components/headers/HeaderUpdateOrder';
import Profile from '../screens/Profile';
import HomeAdmin from '../admin/screens/HomeAdmin';
import VoucherScreen from '../screens/Voucher';
// import HeaderUpdateOrder from './headers/HeaderUpdateOrder';
import Payment from '../screens/payment/Payment';
import PaymentMethod from '../screens/payment/PaymentMethod';
import PaymentSuccess from '../screens/payment/PaymentSuccess';
import OrderAdmin from '../admin/screens/OrderAdmin';

import Icon from '@react-native-vector-icons/ant-design';
import SearchResultScreen from '../screens/SearchResultScreen';
import SearchScreen from '../screens/SearchScreen';
import { Text } from 'react-native-gesture-handler';
import CompareResultScreen from '../screens/CompareResultScreen';
import CompareScreen from '../screens/CompareScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import { RootStackParamList } from '../types/data';
import HeaderHomeAdmin from '../admin/components/headers/HeaderHomeAdmin';
import HeaderNotificationAdmin from '../admin/components/headers/HeaderNotificationAdmin';
import RecommendedProduct from '../screens/RecommendedProduct';
import NotiAdmin from '../admin/screens/NotiAdmin';
import NotiTypeAdmin from '../admin/screens/NotiTypeAdmin';

const RouterMain = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="beforeLogin"
                component={BeforeLogin}
                options={{header: () => <HeaderLogin/>}}
            />
            <Stack.Screen
                name="login"
                component={Login}
                options={{header: () => <HeaderLogin/>}}
            />
            <Stack.Screen
                name="register"
                component={Register}
                options={{header: () => <HeaderLogin/>}}
            />

            <Stack.Screen
                name="home"
                component={Home}
                options={{ header: () =>  <HeaderHome /> }}
            />
            <Stack.Screen
                name="order"
                component={Order}
                // options={{ title: 'Chi tiết Review' }}
                options={({ navigation }) => ({
                    headerTitle: '',
                    headerLeft: () => (
                        <Icon
                            name="arrow-left"
                            size={26}
                            color="#f50057"
                            style={{ marginLeft: 16 }}
                            onPress={() => navigation.navigate('home')}
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
                name="cart"
                component={CartScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="payment"
                component={Payment}
                options={{headerShown: true}}
            />
            <Stack.Screen
                name="paymentMethod"
                component={PaymentMethod}
                options={{headerShown: true}}
            />
            <Stack.Screen
                name="paymentSuccess"
                component={PaymentSuccess}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="notiType"
                component={NotiType}
                options={{ header: () => <HeaderNotification/> }}
            />
            <Stack.Screen
                name="notiTypeDetails"
                component={NotiTypeDetails}
                // options={{ header: () => <HeaderNotification/> }}
            />
            <Stack.Screen
                name="updateOrder"
                component={UpdateOrder}
                options={{header: () => <HeaderUpdateOrder/>}}
            />
            <Stack.Screen
                name="profile"
                component={Profile}
                options={{title: "Tài khoản"}}
            />
            <Stack.Screen
                name="voucher"
                component={VoucherScreen}
                options={{ title: "Mã giảm giá" }}
            />
            <Stack.Screen
                name="orderAdmin"
                component={OrderAdmin}
                options={{ title: 'Quản lý đơn hàng' }}
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

            {/* Admin */}
            <Stack.Screen
                name="homeAdmin"
                component={HomeAdmin}
                // options={{headerShown: false}}
                options={{ header: () =>  <HeaderHomeAdmin /> }}
            />
            <Stack.Screen
                name="notiTypeAdmin"
                component={NotiTypeAdmin}
                options={{ header: () =>  <HeaderNotificationAdmin /> }}
            />
            <Stack.Screen
                name="recommendedProduct"
                component={RecommendedProduct}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name="notiAdmin"
                component={NotiAdmin}
            />
        </Stack.Navigator>
    );
};

export default RouterMain;

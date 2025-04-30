import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Order from '../screens/Order';
import BeforeLogin from '../screens/BeforeLogin';
import Login from '../screens/Login';
import HeaderLogin from '../components/headers/HeaderLogin';
import Register from '../screens/Register';
import HeaderHome from '../components/headers/HeaderHome';
import Home from '../screens/Home';
import CartScreen from '../screens/Cart';
import NotiType from '../screens/NotiType';
import HeaderNotification from '../components/headers/HeaderNotification';
import NotiTypeDetails from '../screens/NotiTypeDetails';
import UpdateOrder from '../screens/UpdateOrder';
import HeaderUpdateOrder from '../components/headers/HeaderUpdateOrder';
import Profile from '../screens/Profile';
import HomeAdmin from '../admin/screens/HomeAdmin';
import NotiTypeAdmin from '../admin/screens/NotiTypeAdmin';
import VoucherScreen from '../screens/Voucher';
// import HeaderUpdateOrder from './headers/HeaderUpdateOrder';

const RouterMain = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        // <Stack.Navigator screenOptions={{ headerShown: true }}>
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
                name="homeAdmin"
                component={HomeAdmin}
                // options={{ header: () =>  <HeaderHome /> }}
            />
            <Stack.Screen
                name="home"
                component={Home}
                options={{ header: () =>  <HeaderHome /> }}
            />
            <Stack.Screen
                name="notiTypeAdmin"
                component={NotiTypeAdmin}
                // options={{ header: () =>  <HeaderHome /> }}
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
                // options={{header: () => <HeaderLogin/>}}
            />
            <Stack.Screen
                name="voucher"
                component={VoucherScreen}
                options={{ title: "Mã giảm giá" }}
            />
        </Stack.Navigator>
    );
};

export default RouterMain;
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Order from '../screens/Order';
import BeforeLogin from '../screens/BeforeLogin';
import Login from '../screens/Login';
import HeaderLogin from './headers/HeaderLogin';
import Register from '../screens/Register';
import HeaderHome from './headers/HeaderHome';
import Home from '../screens/Home';
import CartScreen from '../screens/Cart';

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
                name="home"
                component={Home}
                options={{ header: () =>  <HeaderHome /> }}
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
        </Stack.Navigator>
    );
};

export default RouterMain;
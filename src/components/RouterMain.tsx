import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Order from '../screens/Order';
import HeaderHome from './header/HeaderHome';
import CartScreen from '../screens/Cart';
import CartHeader from './header/HeaderCart';

const RouterMain = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
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
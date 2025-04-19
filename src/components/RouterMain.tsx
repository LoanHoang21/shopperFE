import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Order from '../screens/Order';
import BeforeLogin from '../screens/BeforeLogin';
import Login from '../screens/Login';
import HeaderLogin from './headers/HeaderLogin';
import Register from '../screens/Register';
import HeaderHome from './headers/HeaderHome';
import Home from '../screens/Home';
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
        options={{header: () => <HeaderHome />}}
      />
      <Stack.Screen
        name="order"
        component={Order}
        // options={{ title: 'Chi tiết Review' }}
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
                name="notification"
                component={Notification}
                options={{ header: () => <HeaderNotification/> }}
            />
            <Stack.Screen
                name="promotionNotification"
                component={PromotionNotification}
                // options={{ header: () => <HeaderNotification/> }}
            />
            <Stack.Screen
                name="updateOrder"
                component={UpdateOrder}
                options={{header: () => <HeaderUpdateOrder/>}}
            />
    </Stack.Navigator>
  );
};

export default RouterMain;

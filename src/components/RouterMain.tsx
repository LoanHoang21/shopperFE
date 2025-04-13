import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Order from '../screens/Order';
import ProductDetailScreen from '../screens/ProductDetailScreen';

import Icon from '@react-native-vector-icons/ant-design';
const RouterMain = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="home"
                component={Home}
            // options={{ header: () => <AppHeader /> }}
            />
            <Stack.Screen
                name="order"
                component={Order}
            // options={{ title: 'Chi tiết Review' }}
            />
            <Stack.Screen
                name="cart"
                component={Order}
            // options={{ title: 'Chi tiết Review' }}
            />
            <Stack.Screen
                name="productDetail"
                component={ProductDetailScreen}
                options={{
                    headerLeft: () => null, // ❌ Ẩn nút back
                    headerTitle: '',        // ❌ Ẩn title "productDetail"
                    headerRight: () => (
                        <Icon
                            name='shopping-cart'
                            size={24}
                            color="black"
                            style={{ marginRight: 16 }}
                            onPress={() => {
                                // 👉 Navigate đến giỏ hàng nếu cần:
                                // navigation.navigate('cart');
                            }}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

export default RouterMain;
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Order from '../screens/Order';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CompareScreen from '../screens/CompareScreen';
import CompareResultScreen from '../screens/CompareResultScreen';
import SearchScreen from '../screens/SearchScreen'
import HeaderHome from './HeaderHome';
import Icon from '@react-native-vector-icons/ant-design';
import { RootStackParamList } from '../types/route';
import SearchResultScreen from '../screens/SearchResultScreen'
import { Text } from 'react-native';

const RouterMain = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="home"
                component={Home}
                options={{ header: () => <HeaderHome /> }}
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




        </Stack.Navigator>
    );
};

export default RouterMain;
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from '@react-native-vector-icons/ant-design';
import HomeScreen from '../../screens/Home';
import CartScreen from '../../screens/Cart';
import Notification from '../../screens/Notification';

const Tab = createBottomTabNavigator();

// Dummy screens
// const HomeScreen = () => <View style={styles.screen}><Text>Trang chủ</Text></View>;
// const CartScreen = () => <View style={styles.screen}><Text>Giỏ hàng</Text></View>;
// const NotiScreen = () => <View style={styles.screen}><Text>Thông báo</Text></View>;
// const ProfileScreen = () => <View style={styles.screen}><Text>Tôi</Text></View>;

// // Badge component
// const Badge = ({ count }: { count: number }) => {
//   if (count === 0) return null;
//   return (
//     <View style={styles.badge}>
//       <Text style={styles.badgeText}>{count}</Text>
//     </View>
//   );
// };

// const getTabBarIcon = (routeName: string) => ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
//   let iconName = 'filter';

//   // switch (routeName) {
//   //   case 'home':
//   //     iconName = focused ? 'home' : 'home-outline';
//   //     break;
//   //   case 'cart':
//   //     iconName = focused ? 'cart' : 'cart-outline';
//   //     break;
//   //   case 'notification':
//   //     iconName = focused ? 'notifications' : 'notifications-outline';
//   //     break;
//   //   case 'profile':
//   //     iconName = focused ? 'person' : 'person-outline';
//   //     break;
//   // }

//   return <Icon name={iconName} size={size} color={color} />;
// };


const HomeBottom = () => {
  return (
    <Tab.Navigator
      // screenOptions={({ route }) => ({
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        // tabBarIcon: getTabBarIcon(route.name),
      })}
    >
      
      <Tab.Screen name="home" component={HomeScreen} options={{ tabBarLabel: 'Trang chủ' }} />
      <Tab.Screen name="cart" component={CartScreen} options={{ tabBarLabel: 'Giỏ hàng' }} />
      <Tab.Screen name="notification" component={Notification} options={{ tabBarLabel: 'Thông báo' }} />
      <Tab.Screen name="profile" component={Notification} options={{ tabBarLabel: 'Tôi' }} />
    </Tab.Navigator>
  );
};

// const styles = StyleSheet.create({
//   badge: {
//     position: 'absolute',
//     top: -5,
//     right: -10,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     paddingHorizontal: 5,
//     paddingVertical: 1,
//     zIndex: 10,
//     minWidth: 18,
//     alignItems: 'center',
//   },
//   badgeText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   screen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

export default HomeBottom;

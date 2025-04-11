import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
// import Login from '../screens/Login';

export type RootStackParamList = {
  // Login: undefined;
  Home: undefined;
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home"> */}
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={Login} options={{header: () => <Login/>}} /> */}
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }}/>
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

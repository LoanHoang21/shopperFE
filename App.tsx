import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// import AppNavigation from './src/components/navigation/AppNavigation';
import Loading from './src/screens/Loading';
import RouterMain from './src/components/RouterMain';
// import UpdateOrder from './src/screens/Notification';
// import Notification from './src/screens/Notification';
import { CartProvider } from './src/context/CartContext';

const App = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Đợi 1 giây

    return () => clearTimeout(timer); // Clear timer nếu component unmount
  }, []);

  return (
    <CartProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          animated={true}
        />
        <NavigationContainer>
          {isLoading ? <Loading /> : <RouterMain/>}
        </NavigationContainer>
      </SafeAreaView>
    </CartProvider>
  );
};

export default App;

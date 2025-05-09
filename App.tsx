import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Loading from './src/screens/Loading';
import RouterMain from './src/routers/RouterMain';
import { CartProvider } from './src/context/CartContext';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { NotificationProvider } from './src/context/NotiContext';

const toastConfig = {
  success: (props : any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 15, }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
      }}
      text2NumberOfLines={0}
      text2Style={{
        fontSize: 14,
        fontWeight: 'normal',
        flexWrap: 'wrap',
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      style={{ borderLeftColor: 'red' }}
      contentContainerStyle={{ paddingHorizontal: 15}}
      {...props}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
      }}
      text2NumberOfLines={0}
      text2Style={{
        fontSize: 14,
        fontWeight: 'normal',
        flexWrap: 'wrap',
      }}
    />
  ),
};

const App = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Đợi 0.5 giây

    return () => clearTimeout(timer); // Clear timer nếu component unmount
  }, []);
  
  return (
    <CartProvider>
      <NotificationProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          animated={true}
        />
        <NavigationContainer>
          {isLoading ? <Loading /> : <RouterMain/>}
          <Toast config={toastConfig} />
          {/* <Toast /> */}
        </NavigationContainer>
      </SafeAreaView>
      </NotificationProvider>
     </CartProvider>
  );
};

export default App;
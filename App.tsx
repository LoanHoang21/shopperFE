import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// import AppNavigation from './src/components/navigation/AppNavigation';
import Loading from './src/screens/Loading';
import RouterMain from './src/routers/RouterMain';
// import UpdateOrder from './src/screens/Notification';
// import Notification from './src/screens/Notification';
import { CartProvider } from './src/context/CartContext';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import { useNotification } from './src/utils/handleNotification';
import { setupNotificationListeners } from './src/utils/noti';
import { checkAndNotifyExpiringVouchers } from './src/utils/notiVoucher';

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
    }, 1000); // Đợi 1 giây

    return () => clearTimeout(timer); // Clear timer nếu component unmount
  }, []);

  // setupNotificationListeners();
  useNotification();

  // useEffect(() => {
  //   // Gọi 1 lần khi app mở
  //   checkAndNotifyExpiringVouchers();
  
  //   // Gọi lại sau mỗi 10 phút nếu bạn muốn
  //   const interval = setInterval(() => {
  //     checkAndNotifyExpiringVouchers();
  //   }, 2 * 60 * 1000); // 2 phút
  
  //   return () => clearInterval(interval); // Clear khi component unmount
  // }, []);
  
  return (
    // <CartProvider>
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
    // </CartProvider>
  );
};

export default App;

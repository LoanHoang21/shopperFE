import React, { useEffect, useRef, useState } from 'react';
import { Linking, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Loading from './src/screens/Loading';
import RouterMain from './src/routers/RouterMain';
import { CartProvider } from './src/context/CartContext';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { NotificationProvider } from './src/context/NotiContext';
import messaging from '@react-native-firebase/messaging';
import { useNotification } from './src/utils/handleNotification';
import { setupNotificationListeners } from './src/utils/noti';
import { checkAndNotifyExpiringVouchers } from './src/utils/notiVoucher';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationContainerRef } from '@react-navigation/native';
import axios from 'axios';
import { Product } from './src/components/ProductCard';
import { RootStackParamList } from './src/types/data';

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
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);
  const [notFoundModal, setNotFoundModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Đợi 0.5 giây

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

  useEffect(() => {
    const handleDeepLink = async ({ url }: { url: string }) => {
      if (!url) return;
      const match = url.match(/^myapp:\/\/product\/(.+)$/);
      const productId = match?.[1];
      if (productId) {
        try {
          const res = await axios.get(`http://192.168.79.11:3001/api/product/get-details/${productId}`);
          const product: Product = res.data.data;
          navigationRef.current?.navigate('productDetail', { product });
          setNotFoundModal(false);
        } catch (err) {
          // console.error('Không tìm thấy sản phẩm từ ID:', err);
          setNotFoundModal(true);
        }
      }
    };
  
    Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink({ url });
    });
  
    return () => Linking.removeAllListeners('url');
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
        <NavigationContainer  ref={navigationRef}>
          {isLoading ? <Loading /> : <RouterMain/>}
          <Toast config={toastConfig} />
          {/* <Toast /> */}
        </NavigationContainer>
        {notFoundModal && (
  <View style={styles.overlay}>
    <View style={styles.popup}>
      <Text style={styles.popupTitle}>Không tìm thấy sản phẩm</Text>
      <Text style={styles.popupText}>Sản phẩm này không tồn tại hoặc đã bị xóa.</Text>
      <TouchableOpacity
        style={[styles.buyBtn, { marginTop: 16 }]}
        onPress={() => setNotFoundModal(false)}
      >
        <Text style={{ color: 'white' }}>Đóng</Text>
      </TouchableOpacity>
    </View>
  </View>
)}
      </SafeAreaView>
      </NotificationProvider>
     </CartProvider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    minWidth: 260,
    alignItems: 'center',
    marginHorizontal:20,
  },
  popupTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  popupText: { fontSize: 14, color: 'red', textAlign: 'center' },
  buyBtn: {
    backgroundColor: '#f50057',
    padding: 10,
    borderRadius: 6,
    minWidth: 100,
    alignItems: 'center',
  },
});
export default App;
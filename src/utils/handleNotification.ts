// import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const requestUserPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("✅ Notification permission granted (Android)");
    } else {
      console.log("❌ Notification permission denied (Android)");
    }
  } else {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted (iOS):', authStatus);
    } else {
      console.log("Notification permission denied (iOS)");
    }
  }
};

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    try {
      const token = await messaging().getToken();
      if (token) {
        await AsyncStorage.setItem('fcmToken', token);
        console.log('FCM Token:', token);
      }
    } catch (error) {
      console.error('FCM token error:', error);
    }
  } else {
    console.log('FCM Token (from storage):', fcmToken);
  }
};

export const initNotification = async () => {
    await requestUserPermission();
    await getFcmToken();
};

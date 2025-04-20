// src/utils/NotificationHandler.ts

import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

export const setupNotificationListeners = async () => {
  // Tạo kênh cho Android
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  // Lắng nghe khi nhận được message khi app đang mở
  messaging().onMessage(async remoteMessage => {
    console.log('📩 Foreground message:', remoteMessage);

    if (remoteMessage.notification) {
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId: 'default',
          pressAction: {
            id: 'default',
          },
        },
      });
    }
  });
};

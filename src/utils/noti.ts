import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, AndroidStyle} from '@notifee/react-native';
import {Platform, ToastAndroid} from 'react-native';

// Cờ để ngăn gọi lại nhiều lần
let isNotificationListenerSet = false;

export const setupNotificationListeners = async () => {
  if (isNotificationListenerSet) {
    return;
  }
  isNotificationListenerSet = true;

  // Tạo kênh cho Android
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  // Xử lý khi nhận thông báo trong foreground
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground message:', remoteMessage);

    const {title, body} = remoteMessage.notification || {};
    const image =
      (remoteMessage?.notification as any)?.android?.imageUrl ||
      (remoteMessage?.notification as any)?.imageUrl ||
      remoteMessage?.data?.image;

    // 1. Hiển thị Toast (chỉ Android)
    if (Platform.OS === 'android' && title && body) {
      ToastAndroid.showWithGravity(
        `${title}: ${body}`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }

    const androidOptions: any = {
      channelId: 'default',
      pressAction: {id: 'default'},
      smallIcon: 'ic_launcher',
    };
    // Nếu có ảnh => BIGPICTURE + summary
    if (image) {
      androidOptions.style = {
        type: AndroidStyle.BIGPICTURE,
        picture: image,
      };
    }
    // Nếu không có ảnh nhưng body dài => BIGTEXT
    else if (body && body.length > 50) {
      androidOptions.style = {
        type: AndroidStyle.BIGTEXT,
        text: body,
      };
    }

    if (title && body) {
      await notifee.displayNotification({
        title,
        body,
        android: androidOptions,
      });
    }
    // // 2. Hiển thị thông báo trong khay (foreground)
    // if (title && body && image) {
    //   await notifee.displayNotification({
    //     title,
    //     body,
    //     // image,
    //     android: {
    //       channelId: 'default',
    //       pressAction: { id: 'default' },
    //       smallIcon: 'ic_launcher',
    //       ...(image && {
    //         style: {
    //           type: AndroidStyle.BIGPICTURE,
    //           picture: image,
    //         },
    //       }),
    //     },
    //   });
    // }
  });

  // Khi người dùng nhấn vào thông báo (app mở từ background hoặc quit)
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background:',
      remoteMessage.notification,
    );
  });

  // Khi mở app từ quit state do nhấn thông báo
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};

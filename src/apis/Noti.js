import axios from "axios";

const createNotification = (  senderId, receiveId, orderId, name, image, description, fcmToken ) => {
    return axios.post('http://192.168.1.164:3001/api/noti/create', {
        senderId, receiveId, orderId, name, image, description, fcmToken,
      });
  };

export {
    createNotification,
};
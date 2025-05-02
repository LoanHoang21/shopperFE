import axios from "axios";

const createNotiOrder = (  senderId, receiveId, orderId, name, image, description, fcmToken ) => {
    return axios.post('http://192.168.0.116:3001/api/noti/createNotiOrder', {
        senderId, receiveId, orderId, name, image, description, fcmToken,
    });
};

const createNotiVoucher = (  senderId, receiveId, name, image, description, fcmToken ) => {
    return axios.post('http://192.168.0.116:3001/api/noti/createNotiVoucher', {
        senderId, receiveId, name, image, description, fcmToken,
    });
};

const getAllNotiByReceiveId = (receiveId) => {
    return axios.get(`http://192.168.0.116:3001/api/noti/getAllNotiByReceiveId/${receiveId}`);
};

const getAllNotiByNotiType = (receiveId, notiTypeId) => {
    return axios.get(`http://192.168.0.116:3001/api/noti/getAllNotiByNotiType/${receiveId}?notitype_id=${notiTypeId}`);
};

const updateStatusNoti = (notiId, status) => {
    return axios.post(`http://192.168.0.116:3001/api/noti/updateStatusNoti/${notiId}`, {
        is_read: status,
    });
}

export {
    createNotiOrder,
    createNotiVoucher,
    getAllNotiByReceiveId,
    getAllNotiByNotiType,
    updateStatusNoti,
};
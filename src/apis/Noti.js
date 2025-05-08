import axios from 'axios';
import { API_BASE_URL } from '../utils/const';

const createNotiOrder = ( senderId, receiverId, orderId, name, image, description, fcmToken ) => {
    return axios.post(`${API_BASE_URL}/noti/createNotiOrder`, {
        senderId, receiverId, orderId, name, image, description, fcmToken,
    });
};

const createNotiVoucher = ( receiveId, name, image, description, fcmToken ) => {
    return axios.post(`${API_BASE_URL}/noti/createNotiVoucher`, {
        receiveId, name, image, description, fcmToken,
    });
};

const getAllNotiByReceiveId = (receiveId) => {
    return axios.get(`${API_BASE_URL}/noti/getAllNotiByReceiveId/${receiveId}`);
};

const getAllNotiByNotiType = (receiveId, notiTypeId) => {
    return axios.get(`${API_BASE_URL}/noti/getAllNotiByNotiType/${receiveId}?notitype_id=${notiTypeId}`);
};

const updateStatusNoti = (notiId, status) => {
    return axios.post(`${API_BASE_URL}/noti/updateStatusNoti/${notiId}`, {
        is_read: status,
    });
};

const getNotiUpdateOrder = (receiveId, notiTypeId) => {
    return axios.get(`${API_BASE_URL}/noti/getNotiUpdateOrder/${receiveId}?notitype_id=${notiTypeId}`);
};

const getTwoNotiUpdateOrderLastest = (receiveId, notiTypeId) => {
    return axios.get(`${API_BASE_URL}/noti/getTwoNotiUpdateOrderLastest/${receiveId}?notitype_id=${notiTypeId}`);
};

const getAllNotiBySenderIdAndNotiType = (senderId, notiTypeId) => {
    return axios.get(`${API_BASE_URL}/noti/getAllNotiBySenderIdAndNotiType/${senderId}?notitype_id=${notiTypeId}`);
};

const createNotiByAdmin = ( image, name, description, receiver_id, sender_id, notitype_id ) => {
    return axios.post(`${API_BASE_URL}/noti/createNotiByAdmin`, {
        image, name, description, receiver_id, sender_id, notitype_id,
    });
};

const updateNotiByAdmin = ( notiId, image, name, description, receiver_id, sender_id, notitype_id ) => {
    return axios.post(`${API_BASE_URL}/noti/updateNotiByAdmin/${notiId}`, {
        image, name, description, receiver_id, sender_id, notitype_id,
    });
};

const deleteNotiByAdmin = (notiIdDelete) => {
    return axios.post(`${API_BASE_URL}/noti/deleteNotiByAdmin/${notiIdDelete}`);
}

export {
    createNotiOrder,
    createNotiVoucher,
    getAllNotiByReceiveId,
    getAllNotiByNotiType,
    updateStatusNoti,
    getNotiUpdateOrder,
    getTwoNotiUpdateOrderLastest,
    getAllNotiBySenderIdAndNotiType,
    createNotiByAdmin,
    updateNotiByAdmin,
    deleteNotiByAdmin,
};
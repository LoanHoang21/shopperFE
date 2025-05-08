import axios from "axios";
import { API_BASE_URL } from "../utils/const";

const updateFcmToken = (userId, fcmToken) => {
    return axios.post(`${API_BASE_URL}/user/updateFcmToken/${userId}`, {
        fcm_token: fcmToken,
    });
};

const updateSettingNoti = (userId, settingNotiId) => {
    console.log("File api user");
    return axios.post(`${API_BASE_URL}/user/updateSettingNoti/${userId}`, {
        setting_noti_id: settingNotiId,
    });
};

const getDetailUser = (userId) => {
    return axios.get(`${API_BASE_URL}/user/getDetailUser/${userId}`);
};

const getAllUser = () => {
    return axios.get(`${API_BASE_URL}/user/getAllUser/`);
};

export {
    updateFcmToken,
    updateSettingNoti,
    getDetailUser,
    getAllUser,
};
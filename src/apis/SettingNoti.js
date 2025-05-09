import axios from "axios";
import { API_BASE_URL } from "../utils/const";

const getAllSettingNotiByStatus = (value) => {
    return axios.get(`${API_BASE_URL}/settingNoti/getAllSettingNotiByStatus`, {
        params: { status: value },
    });
};

const getAllSettingNoti = () => {
    return axios.get(`${API_BASE_URL}/settingNoti/getAllSettingNoti`);
};

export {
    getAllSettingNotiByStatus,
    getAllSettingNoti,
};
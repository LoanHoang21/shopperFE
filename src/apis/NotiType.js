import axios from 'axios';
import { API_BASE_URL } from '../utils/const';

const getAllNotiType = () => {
    return (axios.get(`${API_BASE_URL}/notiType/getAll`));
};

const getQuantityNoti = (receiveId, notitypeId) => {
    return (axios.get(`${API_BASE_URL}/notiType/getQuantityNoti/${receiveId}?notitype_id=${notitypeId}`));
};

export {
    getAllNotiType,
    getQuantityNoti,
};
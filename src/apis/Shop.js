import axios from 'axios';
import { API_BASE_URL } from '../utils/const';

const getShopByUserId = (userId) => {
    return axios.get(`${API_BASE_URL}/shop/getShopByUserId`,{
        params: {
            user_id: userId,
        },
    });
};

const getAllShop = () => {
    return axios.get(`${API_BASE_URL}/shop/getAllShop`);
};

export {
    getShopByUserId,
    getAllShop,
};
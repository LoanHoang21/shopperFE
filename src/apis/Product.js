import axios from 'axios';
import { API_BASE_URL } from '../utils/const';

const getAllProduct = () => {
    return axios.get(`${API_BASE_URL}/product/getAll`);
};

const getRecommendedProductByOrders = (userId) => {
    return axios.get(`${API_BASE_URL}/product/getRecommendedProductByOrders`,{
        params: {
            customer_id: userId,
        },
    });
};

export {
    getAllProduct,
    getRecommendedProductByOrders,
};
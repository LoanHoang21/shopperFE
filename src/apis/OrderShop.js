import axios from 'axios';
import { API_BASE_URL } from '../utils/const';

const getAllOrderById = (customerId) => {
    return axios.get(`${API_BASE_URL}/orderAdmin/getAll/${customerId}`);
};

const updateStatusOrder = (orderId, nextStatus) => {
    return axios.post(`${API_BASE_URL}/orderAdmin/updateStatus/${orderId}`, {
        status: nextStatus,
    });
};

const getAllOrder = (shopId) => {
    return axios.get(`${API_BASE_URL}/orderShop/getAllOrder`, {
        params: {
            shop_id: shopId,
        },
    });
};


const getAllCustomer = (shopId) => {
    return axios.get(`${API_BASE_URL}/orderShop/getAllCustomer`, {
        params: {
            shop_id: shopId,
        },
    });
};

const getAllProduct = (shopId) => {
    return axios.get(`${API_BASE_URL}/orderShop/getAllProduct`, {
        params: {
            shop_id: shopId,
        },
    });
};

export {
    getAllOrderById,
    updateStatusOrder,
    getAllOrder,
    getAllCustomer,
    getAllProduct,
};
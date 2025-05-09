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

const getAllOrder = () => {
    return axios.get(`${API_BASE_URL}/orderAdmin/getAllOrder/`);
};

export {
    getAllOrderById,
    updateStatusOrder,
    getAllOrder,
};
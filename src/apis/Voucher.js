import axios from 'axios';
import { API_BASE_URL } from '../utils/const';

const getAllVoucher = () => {
    return axios.get(`${API_BASE_URL}/voucher/getAll/`);
};

export {
    getAllVoucher,
};
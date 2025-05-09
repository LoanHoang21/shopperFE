import axios from 'axios';
import { API_BASE_URL } from '../utils/const';

const getAllVoucher = () => {
    return axios.get(`${API_BASE_URL}/voucher/getAll/`);
}

const getVoucherById = async (id) => {
    return await axios.get(`${API_BASE_URL}/voucher/detail/${id}`);
  };

export {
    getAllVoucher,
    getVoucherById
};
import axios from 'axios';
import { API_BASE_URL } from '../utils/const';

const BASE_URL = `${API_BASE_URL}/address`;

// 📌 1. Lấy địa chỉ theo customer_id
const getAddressByCustomerId = (customer_id) => {
  return axios.get(`${BASE_URL}/${customer_id}`);
};

// 📌 2. Tạo hoặc cập nhật địa chỉ (nếu không muốn tách hàm)
const createOrUpdateAddress = (data) => {
  return axios.post(BASE_URL, data);
};

// 📌 3. Chỉnh sửa địa chỉ riêng (PUT)
const updateAddress = (customer_id, data) => {
  return axios.put(`${BASE_URL}/${customer_id}`, data);
};

export {
  getAddressByCustomerId,
  createOrUpdateAddress,
  updateAddress,
};

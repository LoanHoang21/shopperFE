import axios from 'axios';
import { API_BASE_URL } from '../utils/const';

const registerNewUser = (username, email, phone, password) => {
    return axios.post(`${API_BASE_URL}/auth/register`, {
        username, email, phone, password,
    });
};

const userLogin = (valueLogin, password) => {
    return axios.post(`${API_BASE_URL}/auth/login`, {
        valueLogin, password,
    });
};

const logout = (userId) => {
    return axios.post(`${API_BASE_URL}/auth/logout/${userId}`);
};

export {
    registerNewUser,
    userLogin,
    logout,
};
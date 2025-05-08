import axios from "axios";

// const getAllOrderById = (customerId) => {
//     return axios.get(`http://192.168.1.164:3001/api/order/getAll/${customerId}`);
// }

// const updateStatusOrder = (orderId, nextStatus) => {
//     return axios.post(`http://192.168.1.164:3001/api/order/updateStatus/${orderId}`, {
//         status: nextStatus,
//     });
// }

const getAllVoucher = () => {
    return axios.get(`http://192.168.0.116:3001/api/voucher/getAll/`);
}

// const userLogin = (valueLogin, password) => {
//     return axios.post('http://192.168.79.11:3001/api/auth/login', {
//         valueLogin, password
//       })
// }

export {
    // getAllOrderById,
    // updateStatusOrder,
    getAllVoucher,
};
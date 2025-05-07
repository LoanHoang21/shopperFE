import axios from "axios";

const registerNewUser = (username, email, phone, password) => {
    return axios.post('http://192.168.1.145:3001/api/auth/register', {
        username, email, phone, password,
    });
};

const userLogin = (valueLogin, password) => {
    console.log('valueLogin', valueLogin, password);
    // return axios.post('http://192.168.1.164:3001/api/auth/login', {
    return axios.post('http://192.168.1.145:3001/api/auth/login', {
        valueLogin, password,
    });
};

export {
    registerNewUser,
    userLogin,
};

// import axios from "axios";

// const registerNewUser = (username, email, phone, password) => {
//     return axios.post('http://192.168.1.164:3001/api/auth/register', {
//         username, email, phone, password
//       })
// }

// const userLogin = (valueLogin, password, fcmToken) => {
//     return axios.post('http://192.168.1.164:3001/api/auth/login', {
//         valueLogin, password, fcmToken,
//       })
// }

// export {
//     registerNewUser,
//     userLogin,
// };

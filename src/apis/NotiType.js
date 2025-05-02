import axios from "axios";

const getAllNotiType = () => {
    return (axios.get("http://192.168.0.116:3001/api/notiType/getAll"));
};

const getQuantityNoti = (receiveId, notitypeId) => {
    return (axios.get(`http://192.168.0.116:3001/api/notiType/getQuantityNoti/${receiveId}?notitype_id=${notitypeId}`));
};

export {
    getAllNotiType,
    getQuantityNoti,
};
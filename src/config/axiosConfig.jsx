import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://scheduler-java-api.up.railway.app/api/v1'
});

export default instance;
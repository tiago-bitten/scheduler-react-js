import axios from 'axios';

const instance = axios.create({
<<<<<<< HEAD
    baseURL: 'https://scheduler-java-api.up.railway.app/api/v1'
=======
    baseURL: 'http://localhost:8080/api/v1'
>>>>>>> 8b0907464c9eec5a94b3a3bab97ccd2a93dc4aec
});

export default instance;
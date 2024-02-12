import { useState } from 'react';
import instance from '../config/axiosConfig';

const usePut = () => {
    const [loading, setLoading] = useState(false);

    const put = async (url, body = {}) => {
        setLoading(true);
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            };
            const response = await instance.put(url, body, { headers });
            setLoading(false);
            return response; 
        } catch (err) {
            setLoading(false);
            throw err;
        }
    };

    return { loading, put };
};

export { usePut };

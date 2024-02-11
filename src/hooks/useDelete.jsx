import { useState } from 'react';
import instance from '../config/axiosConfig';

const useDelete = () => {
    const [loading, setLoading] = useState(false);

    const deleteRequest = async (url) => {
        setLoading(true);
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            };
            const response = await instance.delete(url, { headers });
            setLoading(false);
            return response; 
        } catch (err) {
            setLoading(false);
            throw err;
        }
    };

    return { loading, deleteRequest };
};

export { useDelete };

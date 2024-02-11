import { useState } from 'react';
import instance from '../config/axiosConfig';

const usePost = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const post = async (url, body = {}) => {
        setLoading(true);
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            };
            const res = await instance.post(url, body, { headers });
            setResponse(res);
            setError(null);
        } catch (err) {
            setError(err);
            setResponse(null);
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, post };
};

export { usePost };

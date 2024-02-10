import { useState } from 'react';
import instance from '../config/axiosConfig';

const usePost = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const post = (body) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        };

        setLoading(true);
        instance.post(url, body, { headers })
            .then((response) => setData(response.data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    };

    return { data, error, loading, post };
};

export { usePost };
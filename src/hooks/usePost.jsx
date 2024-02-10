import { useState } from 'react';
import instance from '../config/axiosConfig';

const usePost = (url) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const post = (body) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        };

        setLoading(true);
        instance.post(url, body, { headers })
            .then((response) => {
                setResponse(response);
                setError(null);
            })
            .catch((error) => {
                setError(error);
                setResponse(null);
            })
            .finally(() => setLoading(false));
    };

    return { response, error, loading, post };
};

export { usePost };
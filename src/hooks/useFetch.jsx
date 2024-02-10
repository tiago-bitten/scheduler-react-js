import { useState, useCallback } from 'react';
import instance from '../config/axiosConfig';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetch = useCallback(() => {
        setLoading(true);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        };

        instance.get(url, { headers })
            .then((response) => {
                setData(response.data);
                setError(null);
            })
            .catch((error) => {
                setError(error);
                setData(null);
            })
            .finally(() => setLoading(false));
    }, [url]);

    return { data, error, loading, fetch };
};

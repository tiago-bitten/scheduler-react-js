import { useState } from 'react';
import instance from '../config/axiosConfig';

const usePost = () => {
    const [loading, setLoading] = useState(false);

    const post = async (url, body = {}) => {
        setLoading(true);
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            };
            const response = await instance.post(url, body, { headers });
            setLoading(false);
            return response; // Retorna a resposta diretamente
        } catch (err) {
            setLoading(false);
            throw err; // Lança o erro para ser capturado pelo chamador
        }
    };

    return { loading, post };
};

export { usePost };

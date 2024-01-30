// ApproveUser.jsx
import React, { useEffect, useState } from 'react';
import instance from '../config/axiosConfig';
import Header from '../components/Header';
import { useSnackbar } from '../components/SnackBarProvider';
import ApproveUserCard from '../components/ApproveUserCard';

const ApproveUser = () => {
    const [token] = useState(sessionStorage.getItem('token'));
    const [users, setUsers] = useState([]);

    const enqueueSnackbar = useSnackbar();

    useEffect(() => {
        const fetchUsersToApprove = async () => {
            try {
                const response = await instance.get('/users/approve', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setUsers(response.data.users);
                }
            } catch (err) {
                enqueueSnackbar(err.response?.data?.message || 'Erro ao buscar usuários', { variant: 'error' });
            }
        };

        fetchUsersToApprove();
    }, [token, enqueueSnackbar]);

    const onApprove = async (id, allowAprove) => {
        try {
            const response = await instance.put(`/users/approve?userToApproveId=${id}&isSuperUser=${allowAprove}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 204) {
                enqueueSnackbar('Usuário aprovado com sucesso.');
                setUsers(users.filter((user) => user.id !== id));
            }

        } catch (err) {
            enqueueSnackbar(err.response.data.message);
        }
    }

    const onDisapprove = async (id) => {
        console.log('ainda nao tem nada')
        setUsers(users.filter((user) => user.id !== id));
    }

    return (
        <>
            <Header />
            <div className="flex flex-col items-center">
                <div className="flex flex-wrap justify-left mt-8">
                    {users.map((user) => (
                        <ApproveUserCard
                            key={user.id}
                            user={user}
                            onApprove={onApprove}
                            onDisapprove={onDisapprove}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ApproveUser;

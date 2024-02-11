import React, { useEffect, useState } from 'react';
import instance from '../config/axiosConfig';
import Header from '../components/Header';
import { useSnackbar } from 'notistack';
import ApproveUserCard from '../components/ApproveUserCard';
import { useFetch } from '../hooks/useFetch';

const ApproveUser = () => {
    const [token] = useState(sessionStorage.getItem('token'));
    const [users, setUsers] = useState([]);
    const { data, error, loading, fetch } = useFetch('/users/approve');

    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        document.title = 'Aprovar usuários';
    }, []);

    React.useEffect(() => {
        fetch();
    }, [fetch]);

    React.useEffect(() => {
        if (data) {
            setUsers(data.users);
        }
    }, [data]);

    const onApprove = async (id, allowAprove) => {
        try {
            const response = await instance.put(`/users/approve?userToApproveId=${id}&isSuperUser=${allowAprove}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 204) {
                enqueueSnackbar('Usuário aprovado com sucesso.', { variant: 'success' });
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

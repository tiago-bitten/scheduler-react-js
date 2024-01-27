import React from 'react';

import RoundButton from './RoundButton';
import CheckboxMinistry from './CheckboxMinistry';
import BackButton from './BackButton';

import { Snackbar } from '@mui/material';

import instance from '../config/axiosConfig';

const ministriesMock = [
    'ESTACIONAMENTO',
    'RECEPÇÃO',
    'AÇÃO SOCIAL',
    'DISCIPULADO',
    'ESCOLA BÍBLICA',
    'LOUVOR',
    'COMUNICAÇÃO',
    'CRIANÇAS',
    'ADOLESCENTES',
    'JOVENS',
    'ADULTOS',
    'INTERCESSÃO',
];

const CreateAccountRightCard = ({ name, email, password }) => {
    const [ministries, setMinistries] = React.useState([]); // { id: 1, name: 'ESTACIONAMENTO' }
    const [selectedMinistries, setSelectedMinistries] = React.useState([]);
    const [notification, setNotification] = React.useState(false);
    const [notificationMessage, setNotificationMessage] = React.useState('');

    React.useEffect(() => {
        getMinistries();
    }, [])

    const getMinistries = async () => {
        try {
            const response = await instance.get('/ministries')

            if (response.status === 200) {
                const data = response.data;

                setMinistries(data.ministries);
            }

        } catch (err) {
            setNotificationMessage(err.response.data.message);
            setNotification(true);
        }
    }

    const handleCreateAccount = async () => {
        try {
            const response = await instance.post('/auth/signup', {
                name,
                email,
                password,
                ministries: selectedMinistries.map(m => m.id)
            })

            if (response.status === 201) {
                setNotificationMessage('Análise de conta solicitada!');
                setNotification(true);
            }

        } catch (err) {
            setNotificationMessage(err.response.data.message);
            setNotification(true);
        }
    };

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification(false);
    };

    const handleToggle = (ministry) => {
        setSelectedMinistries((prevSelected) => {
            const isAlreadySelected = prevSelected.some(m => m.id === ministry.id);
            if (isAlreadySelected) {
                return prevSelected.filter(m => m.id !== ministry.id);
            }
            return [...prevSelected, ministry];
        });
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="border-t-4 border-tertiary" style={{ width: '100%' }}>
                <h1 className="text-3xl mt-4 mb-4 text-center text-quinary">Ministérios</h1>
            </div>
            <div className="ministry-list mb-2 overflow-auto bg-septenary w-5/6" style={{ maxHeight: '230px' }}>
                {ministries.map((ministry) => (
                    <CheckboxMinistry
                        key={ministry.id}
                        ministry={ministry.name}
                        checked={selectedMinistries.some(m => m.id === ministry.id)}
                        onToggle={() => handleToggle(ministry)}
                    />
                ))}
            </div>
            <div className="mb-8">
                <p className="text-xs text-center text-quinary" style={{ fontStyle: 'italic' }}>Selecione os ministérios que você gostaria de participar.</p>
            </div>
            <RoundButton value="ENVIAR PARA ANÁLISE" onClick={() => handleCreateAccount()} />
            <Snackbar
                open={notification}
                autoHideDuration={4000}
                onClose={() => handleCloseNotification()}
                message={notificationMessage}
            />
        </div>
    );
};

export default CreateAccountRightCard;
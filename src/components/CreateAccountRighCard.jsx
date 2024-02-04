import React, { useEffect, useState } from 'react';
import RoundButton from './RoundButton';
import CheckboxMinistry from './CheckboxMinistry';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import instance from '../config/axiosConfig';
import { CSSTransition } from 'react-transition-group';

const CreateAccountRightCard = ({ name, email, password }) => {
    const [ministries, setMinistries] = useState([]);
    const [selectedMinistries, setSelectedMinistries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const getMinistries = async () => {
            try {
                const response = await instance.get('/ministries/signup');
                if (response.status === 200) {
                    setMinistries(response.data.ministries);
                    setLoading(false);
                }
            } catch (err) {
                enqueueSnackbar(err.response?.data?.message || 'Erro ao buscar ministérios', { variant: 'error' });
                setLoading(false);
            }
        };

        getMinistries();
    }, []);

    const handleToggle = (ministry) => {
        setSelectedMinistries((prevSelected) => {
            const isAlreadySelected = prevSelected.some((m) => m.id === ministry.id);
            if (isAlreadySelected) {
                return prevSelected.filter((m) => m.id !== ministry.id);
            }
            return [...prevSelected, ministry];
        });
    };

    const handleCreateAccount = async () => {
        try {
            const response = await instance.post('/auth/signup', {
                name,
                email,
                password,
                ministries: selectedMinistries.map((m) => m.id),
            });

            if (response.status === 201) {
                enqueueSnackbar('Sua conta foi enviada para análise.', { variant: 'success' });
                navigate('/criar-conta/analise');
            }
        } catch (err) {
            enqueueSnackbar(err.response?.data?.message || 'Erro ao criar conta', { variant: 'error' });
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="border-t-4 border-tertiary" style={{ width: '100%' }}>
                <h1 className="text-3xl mt-4 mb-4 text-center text-quinary">Ministérios</h1>
            </div>
            {loading ? (
                <CircularProgress
                    color="inherit"
                    style={{ margin: '110px auto', color: '#A0B4F0' }}
                    size={70}
                />
            ) : (
                <CSSTransition
                    in={!loading}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                >
                    <>
                        <div className="w-5/6" style={{ maxHeight: '300px', marginBottom: '16px' }}>
                            <div className="overflow-auto bg-septenary" style={{ maxHeight: '230px' }}>
                                {ministries.map((ministry) => (
                                    <CheckboxMinistry
                                        key={ministry.id}
                                        ministry={ministry.name}
                                        checked={selectedMinistries.some(m => m.id === ministry.id)}
                                        onToggle={() => handleToggle(ministry)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="mb-8 w-5/6">
                            <p className="text-xs text-center text-quinary" style={{ fontStyle: 'italic' }}>
                                Selecione os ministérios que você gostaria de participar.
                            </p>
                        </div>
                        <RoundButton value="ENVIAR PARA ANÁLISE" onClick={handleCreateAccount} />
                    </>
                </CSSTransition>
            )}
        </div>
    );
};

export default CreateAccountRightCard;

import React from 'react';

import instance from '../config/axiosConfig';

import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../components/SnackBarProvider';

import DefaultInput from '../components/DefaultInput';
import RoundButton from '../components/RoundButton';
import ForgotPassword from './ForgotPassword';
import CreateAccountLink from './CreateAccountLink';
import OrBar from './OrBar';


const LoginRightCard = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const enqueueSnackbar = useSnackbar();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await instance.post('/auth/signin', {
                email,
                password
            });

            const data = response.data;

            if (response.status === 200) {
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('user', JSON.stringify(data.user));
                enqueueSnackbar('Login efetuado com sucesso!');
                navigate('/voluntarios');
            }

        } catch (error) {
            if (error.response.status === 401) {
                enqueueSnackbar(error.response.data.message);
            }
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-4xl text-center mb-10 text-quinary">Bem-vindo</h1>
            <div className="mb-10">
                <DefaultInput label="Email" id="email" type="text" onChange={handleEmailChange} />
            </div>
            <div className="mb-10 flex flex-col items-end">
                <DefaultInput label="Senha" id="password" type="password" onChange={handlePasswordChange} />
                <div className="mt-2">
                    <ForgotPassword />
                </div>
            </div>
            <div className="mb-8">
                <RoundButton value="ENTRAR" onClick={() => handleLogin()} />
            </div>
            <div className="w-1/2">
                <OrBar />
            </div>
            <div className="mt-8">
                <CreateAccountLink />
            </div>
        </div>
    );
};

export default LoginRightCard;
import React from 'react';

import instance from '../config/axiosConfig';

import DefaultInput from '../components/DefaultInput';
import RoundButton from '../components/RoundButton';
import ForgotPassword from './ForgotPassword';
import CreateAccount from './CreateAccount';
import OrBar from './OrBar';

const LoginRightCard = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () => {
        try {
            const response = await instance.post('/auth/signin', {
                email,
                password
            });

            const data = response.data;

            if (response.status === 200) {
                sessionStorage.setItem('token', data.token);
            }

        } catch (error) {
            if (error.response.status === 401) {
                alert(error.response.data.message);
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-4xl text-center mb-10 text-quinary">Bem-vindo</h1>
            <div className="mb-10">
                <DefaultInput label="Email" id="email" type="text" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-10 flex flex-col items-end">
                <DefaultInput label="Senha" id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
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
                <CreateAccount />
            </div>
        </div>
    );
};

export default LoginRightCard;
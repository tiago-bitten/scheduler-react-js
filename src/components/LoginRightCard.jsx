import React from 'react';
import DefaultInput from '../components/DefaultInput';
import RoundButton from '../components/RoundButton';
import ForgotPassword from './ForgotPassword';
import CreateAccount from './CreateAccount';

const LoginRightCard = () => {
    return (
        <div className="flex flex-col justify-center items-center w-1/3">
            <h1 className="text-4xl text-center mb-10 text-quinary">Bem-vindo</h1>
            <div className="mb-10">
                <DefaultInput label="Email" id="email" type="email" />
            </div>
            <div className="mb-10 flex flex-col items-end">
                <DefaultInput label="Senha" id="password" type="password" />
                <div className="mt-2">
                    <ForgotPassword />
                </div>
            </div>
            <div className="mb-6">
                <RoundButton value="ENTRAR" />
            </div>
            <div className="flex items-center mb-6">
                <div className="flex-grow border-t-2 border-gray-300"></div>
                <span className="mx-4 text-gray-300">or</span>
                <div className="flex-grow border-t-2 border-gray-300"></div>
            </div>
            <CreateAccount />
        </div>
    );
};

export default LoginRightCard;
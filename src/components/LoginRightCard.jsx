import React from 'react';
import DefaultInput from '../components/DefaultInput';
import RoundButton from '../components/RoundButton';
import ForgotPassword from './ForgotPassword';
import CreateAccount from './CreateAccount';
import OrBar from './OrBar';

const LoginRightCard = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-4xl text-center mb-10 text-quinary">Bem-vindo</h1>
            <div className="mb-10">
                <DefaultInput label="Email" id="email" type="text" />
            </div>
            <div className="mb-10 flex flex-col items-end">
                <DefaultInput label="Senha" id="password" type="password" isInvalid={true} />
                <div className="mt-2">
                    <ForgotPassword />
                </div>
            </div>
            <div className="mb-8">
                <RoundButton value="ENTRAR" />
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
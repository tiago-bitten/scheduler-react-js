import React from 'react';

import DefaultInput from './DefaultInput';
import RoundButton from './RoundButton';

const CreateAccountLeftCard = () => {
    const [name, setName] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-4xl mb-16 text-center text-quinary">Dados cadastrais</h1>
            <div className="mb-8">
                <DefaultInput label="Nome" id="name" type="text" onChange={handleNameChange} />
            </div>
            <div className="mb-8">
                <DefaultInput label="Email" id="email" type="email" onChange={handleEmailChange} />
            </div>
            <div className="mb-8">
                <DefaultInput label="Senha" id="password" type="password" onChange={handlePasswordChange} />
            </div>
            <RoundButton value="PRÓXIMO" />
        </div>
    );
};

export default CreateAccountLeftCard;
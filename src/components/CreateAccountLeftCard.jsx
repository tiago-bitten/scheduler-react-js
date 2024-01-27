import React from 'react';

import DefaultInput from './DefaultInput';
import RoundButton from './RoundButton';

const CreateAccountLeftCard = ({ nextStep, setNextStep, setName, setEmail, setPassword }) => {

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleClick = () => {
        setNextStep(nextStep + 1);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="border-t-4 border-tertiary" style={{ width: '100%' }}> {/* Linha na cor tertiary */}
                <h1 className="text-3xl mt-4 mb-16 text-center text-quinary">Dados cadastrais</h1>
            </div>
            <div className="mb-8">
                <DefaultInput label="Nome" id="name" type="text" onChange={handleNameChange} />
            </div>
            <div className="mb-8">
                <DefaultInput label="Email" id="email" type="email" onChange={handleEmailChange} />
            </div>
            <div className="mb-8">
                <DefaultInput label="Senha" id="password" type="password" onChange={handlePasswordChange} />
            </div>
            <RoundButton value="PRÓXIMO" onClick={() => handleClick()} />
        </div>
    );
};

export default CreateAccountLeftCard;
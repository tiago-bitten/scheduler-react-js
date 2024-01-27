import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccountLink = () => {
    const navigate = useNavigate();

    const handleCreateAccount = () => {
        navigate('/criar-conta');
    }

    return (
        <span className="text-quinary text-sm hover:cursor-pointer active:opacity-75" onClick={handleCreateAccount}>Não possui conta?
            <span className="text-tertiary"> Criar conta</span>
        </span>
    )
};

export default CreateAccountLink;
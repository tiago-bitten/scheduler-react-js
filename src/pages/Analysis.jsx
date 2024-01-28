import React from 'react';

import RoundButton from '../components/RoundButton';

import { CheckCircleOutline } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

const Analysis = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/entrar');
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-primary">
            <div className="bg-white text-center px-24 py-8" style={{ width: '800px', height: '550px' }}>
                <h1 className="text-4xl mt-4 text-quinary">
                    Solicitação de registro de conta efetuado com sucesso!
                </h1>
                <CheckCircleOutline className="text-tertiary mx-auto my-4 mt-8 mb-8" style={{ fontSize: 150 }} />
                <h3 className="text-2xl mb-16 text-quinary">
                    Em breve um usuário irá avaliar seu cadastro
                </h3>
                <RoundButton value="ENTENDI" onClick={handleClick} />
            </div>
        </div>
    );
};

export default Analysis;

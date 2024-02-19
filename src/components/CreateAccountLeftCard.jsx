import React from 'react';

import { TextField, Box } from '@mui/material';
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
            <div className="border-t-4 border-tertiary" style={{ width: '100%' }}>
                <h1 className="text-3xl mt-4 mb-8 text-center text-quinary">Dados cadastrais</h1>
            </div>
            <Box sx={{ mb: 4, width: '70%' }}>
                <TextField
                    label="Nome"
                    variant="standard"
                    size="small"
                    fullWidth
                    autoComplete="off"
                    onChange={handleNameChange}
                />
            </Box>
            <Box sx={{ mb: 4, width: '70%' }}>
                <TextField
                    label="E-mail"
                    variant="standard"
                    size="small"
                    fullWidth
                    autoComplete="off"
                    onChange={handleEmailChange}
                />
            </Box>
            <Box sx={{ mb: 8, width: '70%' }}>
                <TextField
                    label="Senha"
                    variant="standard"
                    size="small"
                    fullWidth
                    autoComplete="off"
                    type="password"
                    onChange={handlePasswordChange}
                />
            </Box>
            <RoundButton value="PRÓXIMO" onClick={() => handleClick()} />
        </div>
    );
};

export default CreateAccountLeftCard;
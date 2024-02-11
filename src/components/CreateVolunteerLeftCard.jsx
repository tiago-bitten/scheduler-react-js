import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';

const CreateVolunteerLeftCard = ({ 
    name,
    lastName,
    cpf,
    phone,
    birthDate,
    handleNameChange,
    handleLastNameChange,
    handleCpfChange,
    handleWhatsappChange,
    handleBirthDateChange
 }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', borderRight: 2, borderColor: "#D9D9D9" }}>
            <Box sx={{ width: '100%', pr: 2 }}>
                <Typography variant="h3" gutterBottom textAlign="center" sx={{ fontSize: "1.5rem" }}>Dados do voluntário</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <AddAPhoto sx={{ fontSize: 60, color: '#A0B4F0' }} />
                    <Typography variant="caption" sx={{ fontStyle: 'italic', color: "#A0B4F0" }}>Adicionar foto</Typography>
                </Box>
                <div className="mb-8">
                    <TextField
                        label="Nome"
                        id="name"
                        variant="standard"
                        onChange={handleNameChange}
                        fullWidth
                        required
                        value={name}
                        autoComplete="off"
                    />
                </div>
                <div className="mb-8">
                    <TextField
                        label="Sobrenome"
                        id="lastName"
                        variant="standard"
                        onChange={handleLastNameChange}
                        fullWidth
                        required
                        value={lastName}
                        autoComplete="off"
                    />
                </div>
                <div className="mb-8">
                    <TextField
                        label="CPF"
                        id="cpf"
                        variant="standard"
                        fullWidth
                        required
                        value={cpf}
                        autoComplete="off"
                        onChange={handleCpfChange}
                    />
                </div>
                <div className="mb-8">
                    <TextField
                        label="Telefone"
                        id="phone"
                        variant="standard"
                        onChange={handleWhatsappChange}
                        fullWidth
                        required
                        value={phone}
                        autoComplete="off"
                    />
                </div>
                <div>
                    <TextField
                        label="Data de nascimento"
                        id="birthDate"
                        variant="standard"
                        type="date"
                        onChange={handleBirthDateChange}
                        fullWidth
                        required
                        value={birthDate}
                        autoComplete="off"
                        InputLabelProps={{ shrink: true }}
                    />
                </div>
            </Box>
        </Box>
    );
};

export default CreateVolunteerLeftCard;

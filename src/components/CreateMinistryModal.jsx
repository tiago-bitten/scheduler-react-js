import React, { useState } from 'react';
import { Modal, Box, IconButton, CircularProgress, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import { HexColorPicker } from 'react-colorful';
import { useSnackbar } from 'notistack';
import { usePost } from '../hooks/usePost';

import RoundButton from './RoundButton';

const CreateMinistryModal = ({ open, handleClose, fetchMinistries }) => {
    const { loading, post } = usePost();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('#000000');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleCreateMinistry = async () => {
        try {
            const payload = { name, description, color };

            const response = await post('/ministries/create', payload);

            if (response.status === 204) {
                enqueueSnackbar('Ministério cadastrado com sucesso!', { variant: 'success' });
                fetchMinistries();            }

        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || 'Error geral - CreateMinistryModal', { variant: 'error' });
        }
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleColorChange = (color) => {
        setColor(color);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true); 
        try {
            await handleCreateMinistry();

            fetchMinistries();        } catch (err) {
            enqueueSnackbar(err.response?.data?.message || 'Erro interno', { variant: 'error' });
        } finally {
            setIsSubmitting(false);
            handleClose();
            resetFields();
        }
    };

    const resetFields = () => {
        setName('');
        setDescription('');
        setColor('#000000');
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
            }}>
                {isSubmitting && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80">
                        <CircularProgress size={80} />
                    </div>
                )}
                <>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <Close />
                    </IconButton>
                    <h1 className="text-3xl text-center text-quinary mb-10">Dados do ministério</h1>
                    <div className="mb-8">
                        <TextField
                            label="Nome"
                            variant="standard"
                            size="small"
                            value={name}
                            onChange={handleNameChange}
                            autoComplete="off"
                            sx={{ width: '100%' }}
                        />
                    </div>
                    <div className="mb-8">
                        <TextField 
                            label="Descrição"
                            variant="standard"
                            size="small"
                            value={description}
                            onChange={handleDescriptionChange}
                            autoComplete="off"
                            sx={{ width: '100%' }}
                        />
                    </div>
                    <div className="mb-8 flex flex-col items-center w-full">
                        <HexColorPicker color={color} onChange={handleColorChange} />
                    </div>
                    <div className="flex flex-col items-center w-full">
                        <RoundButton value="CADASTRAR" onClick={handleSubmit} />
                    </div>
                </>
            </Box>
        </Modal>
    );
};

export default CreateMinistryModal;

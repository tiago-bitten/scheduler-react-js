import React, { useState } from 'react';
import { Modal, Box, IconButton, CircularProgress } from '@mui/material';
import { Close } from '@mui/icons-material';
import { ChromePicker } from 'react-color';
import { useSnackbar } from './SnackBarProvider';

import instance from '../config/axiosConfig';

import DefaultInput from './DefaultInput';
import RoundButton from './RoundButton';

const CreateMinistryModal = ({ open, handleClose, getMinistries }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('#000000');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const enqueueSnackbar = useSnackbar();

    const handleCreateMinistry = async () => {
        try {
            const response = await instance.post('/ministries/create', {
                name,
                description,
                color
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            if (response.status === 204) {
                enqueueSnackbar('Ministério cadastrado com sucesso!');
                getMinistries();
            }

        } catch (err) {
            enqueueSnackbar(err.response.data.message);
        }
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleColorChange = (color) => {
        setColor(color.hex);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true); 
        try {
            await handleCreateMinistry();

            enqueueSnackbar('Ministério cadastrado com sucesso!');
            getMinistries();
        } catch (err) {
            enqueueSnackbar(err.response?.data?.message || 'Ocorreu um erro ao cadastrar o ministério.');
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
                        <DefaultInput label="Nome" id="nome" onChange={handleNameChange} />
                    </div>
                    <div className="mb-8">
                        <DefaultInput label="Descrição" id="descricao" onChange={handleDescriptionChange} />
                    </div>
                    <div className="mb-8 flex flex-col items-center w-full">
                        <ChromePicker
                            color={color}
                            onChangeComplete={handleColorChange}
                        />
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

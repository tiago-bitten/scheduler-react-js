import React from 'react';
import { useFormik } from 'formik';
import { Modal, Box, TextField, Typography } from '@mui/material';
import RoundButton from './RoundButton';
import CloseModal from './CloseModal';
import { usePost } from '../hooks/usePost';
import { useSnackbar } from 'notistack';

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 6,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

const CreateVolunteerModalV2 = ({ open, onClose, fetchVolunteers }) => {
    const postVolunteer = usePost();
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        if (!open) {
            formik.resetForm();
        }
    }, [open]);

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            cpf: '',
            phone: '',
            birthDate: ''
        },
        validate: values => {
            const errors = {};
            if (!values.name) {
                errors.name = 'Nome é obrigatório';
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                const response = await postVolunteer.post('/volunteers/create', values);
                if (response.status === 201) {
                    fetchVolunteers();
                    onClose();
                    enqueueSnackbar('Voluntário cadastrado com sucesso!', { variant: 'success' });
                }
            } catch (error) {
                enqueueSnackbar(error.response?.data?.message || 'Erro geral', { variant: 'error' });
            }
        },
    });

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={boxStyle} component="form" onSubmit={formik.handleSubmit}>
                <Typography variant="h5" align="center" sx={{ color: '#454545' }}>Cadastrar voluntário</Typography>
                <CloseModal onClose={onClose} />
                <TextField
                    label="Nome*"
                    variant="standard"
                    size="small"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    sx={{ mb: 4 }}
                />
                <TextField
                    label="Sobrenome"
                    variant="standard"
                    size="small"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    sx={{ mb: 4 }}
                />
                <TextField
                    label="CPF"
                    variant="standard"
                    size="small"
                    name="cpf"
                    value={formik.values.cpf}
                    onChange={formik.handleChange}
                    sx={{ mb: 4 }}
                />
                <TextField
                    label="Telefone"
                    variant="standard"
                    size="small"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    sx={{ mb: 4 }}
                />
                <TextField
                    label="Data de nascimento"
                    variant="standard"
                    size="small"
                    name="birthDate"
                    value={formik.values.birthDate}
                    onChange={formik.handleChange}
                    sx={{ mb: 2 }}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <RoundButton value="CADASTRAR" type="submit" />
                </Box>
            </Box>
        </Modal>
    );
};

export default CreateVolunteerModalV2;

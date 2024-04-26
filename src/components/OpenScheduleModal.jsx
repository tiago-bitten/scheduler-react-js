import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import RoundButton from './RoundButton';
import { Modal, Box, TextField, Grid, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { usePost } from '../hooks/usePost';

import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup.string().required('Nome da agenda é obrigatório'),
    startDate: yup.date().required('Data de início é obrigatória').nullable(),
    startTime: yup.string().required('Hora de início é obrigatória'),
    duration: yup.number().required('Duração é obrigatória').positive('Duração deve ser positiva').integer('Duração deve ser um número inteiro'),
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const textFieldStyle = {
    width: '100%',
    marginBottom: '20px',
};

const OpenScheduleModal = ({ open, onClose, selectedDate, fetchSchedules }) => {
    const { post } = usePost();
    const { enqueueSnackbar } = useSnackbar();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : '',
        startTime: selectedDate ? moment(selectedDate).format('HH:mm') : '',
        duration: 60,
    });
    const [formErrors, setFormErrors] = useState({});

    const validateForm = async () => {
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setFormErrors({});
            return true;
        } catch (err) {
            const errors = err.inner.reduce((acc, current) => {
                acc[current.path] = current.message;
                return acc;
            }, {});
            setFormErrors(errors);
            return false;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = await validateForm();
        if (!isValid) return;

        const { name, description, startDate, startTime, duration } = formData;
        const startDateTime = moment(`${startDate} ${startTime}`, 'YYYY-MM-DD HH:mm');
        const endDateTime = startDateTime.clone().add(duration, 'minutes');

        const payload = {
            name,
            description,
            startDate: startDateTime.toISOString(),
            endDate: endDateTime.toISOString(),
        };

        try {
            const response = await post('/schedules/open', payload);
            if (response.status === 204) {
                enqueueSnackbar('Agenda aberta com sucesso', { variant: 'success' });
                handleClose();
                fetchSchedules();
            }
        } catch (error) {
            if (error.response?.status === 422) {
                enqueueSnackbar(error.response?.data?.message, { variant: 'warning' });
            }
        }
    };

    useEffect(() => {
        if (open && selectedDate) {
            setFormData({
                ...formData,
                startDate: moment(selectedDate).format('YYYY-MM-DD'),
                startTime: moment(selectedDate).format('HH:mm'),
            });
        }
        // eslint-disable-next-line
    }, [open, selectedDate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    function handleClose() {
        setFormData({
            name: '',
            description: '',
            startDate: '',
            startTime: '',
            duration: 60,
        });
        onClose();
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
                    Abrir Agenda
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <TextField
                                label="Nome"
                                variant="standard"
                                required
                                autoComplete="off"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={!!formErrors.name}
                                helperText={formErrors.name}
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descrição"
                                variant="standard"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Data de início"
                                type="date"
                                required
                                autoComplete="off"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                error={!!formErrors.startDate}
                                helperText={formErrors.startDate}
                                InputLabelProps={{ shrink: true }}
                                variant="standard"
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Hora de início"
                                type="time"
                                required
                                autoComplete="off"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                error={!!formErrors.startTime}
                                helperText={formErrors.startTime}
                                InputLabelProps={{ shrink: true }}
                                variant="standard"
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Duração (minutos)"
                                type="number"
                                required
                                autoComplete="off"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                error={!!formErrors.duration}
                                helperText={formErrors.duration}
                                variant="standard"
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <RoundButton type="submit" value="ABRIR" />
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Modal>
    );
};

export default OpenScheduleModal;

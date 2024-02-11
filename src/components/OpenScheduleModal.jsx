import React from 'react';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import RoundButton from './RoundButton';
import { Modal, Box, TextField, Grid, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { usePost } from '../hooks/usePost';
import { useFormik } from 'formik/dist';

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
    borderRadius: 1,
};

const textFieldStyle = {
    width: '100%',
    marginBottom: '20px',
};

const OpenScheduleModal = ({ open, onClose, selectedDate, fetchSchedules }) => {
    const { response, error, loading, post } = usePost('/schedules/open');
    const { enqueueSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            startDate: selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : '',
            startTime: selectedDate ? moment(selectedDate).format('HH:mm') : '',
            duration: 60,
        },
        validationSchema,
        onSubmit: values => {
            const { name, description, startDate, startTime, duration } = values;
            const startDateTime = moment(`${startDate} ${startTime}`, 'YYYY-MM-DD HH:mm');
            const endDateTime = startDateTime.clone().add(duration, 'minutes');

            const payload = {
                name,
                description,
                startDate: startDateTime.toISOString(),
                endDate: endDateTime.toISOString(),
            };

            post(payload);
        },
    });

    React.useEffect(() => {
        if (open && selectedDate) {
            formik.setValues(prevValues => ({
                ...prevValues,
                startDate: moment(selectedDate).format('YYYY-MM-DD'),
                startTime: moment(selectedDate).format('HH:mm'),
            }));
        }
    }, [open, selectedDate, formik.setValues]);

    React.useEffect(() => {
        if (response?.status === 204) {
            enqueueSnackbar('Agenda aberta com sucesso', { variant: 'success' });
            onClose();
            fetchSchedules();
        } else if (error) {
            enqueueSnackbar(error.response.data.message, { variant: 'error' });
        }
    }, [response, error, fetchSchedules]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
                    Abrir Agenda
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <TextField
                                label="Nome"
                                variant="standard"
                                required
                                autoComplete="off"
                                {...formik.getFieldProps('name')}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descrição"
                                variant="standard"
                                {...formik.getFieldProps('description')}
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Data de início"
                                type="date"
                                required
                                autoComplete="off"
                                {...formik.getFieldProps('startDate')}
                                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                helperText={formik.touched.startDate && formik.errors.startDate}
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
                                {...formik.getFieldProps('startTime')}
                                error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                                helperText={formik.touched.startTime && formik.errors.startTime}
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
                                {...formik.getFieldProps('duration')}
                                error={formik.touched.duration && Boolean(formik.errors.duration)}
                                helperText={formik.touched.duration && formik.errors.duration}
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

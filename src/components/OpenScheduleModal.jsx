import React from 'react';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import instance from '../config/axiosConfig';
import RoundButton from './RoundButton';
import { Modal, Box, TextField, Grid, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
    const [token] = React.useState(sessionStorage.getItem('token'));
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [startTime, setStartTime] = React.useState('');
    const [duration, setDuration] = React.useState(60);

    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        if (selectedDate) {
            setStartDate(moment(selectedDate).format('YYYY-MM-DD'));
            setStartTime(moment(selectedDate).format('HH:mm'));
        } else {
            setStartDate('');
            setStartTime('');
        }
    }, [selectedDate]);

    const handleSubmit = async () => {
        const startDateTime = moment(`${startDate} ${startTime}`);
        const endDateTime = startDateTime.clone().add(duration, 'minutes');

        try {
            const response = await instance.post('/schedules/open', {
                name,
                description,
                startDate: startDateTime.format('YYYY-MM-DDTHH:mm:ss'),
                endDate: endDateTime.format('YYYY-MM-DDTHH:mm:ss'),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 204) {
                enqueueSnackbar('Agenda aberta com sucesso', { variant: 'success' });
                onClose();
                fetchSchedules();
                setName('');
                setDescription('');
                setStartDate(moment(selectedDate).format('YYYY-MM-DD'));
                setStartTime(moment(selectedDate).format('HH:mm'));
                setDuration(60);
            }
        } catch (err) {
            enqueueSnackbar(err.response?.data?.message || 'Não foi possível abrir a agenda', { variant: 'error' });
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
                    Abrir Agenda
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <TextField
                            label="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="standard"
                            autoComplete="off"
                            required
                            sx={textFieldStyle}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            variant="standard"
                            autoComplete="off"
                            sx={textFieldStyle}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Data de início"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                            sx={textFieldStyle}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Hora de início"
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                            sx={textFieldStyle}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Duração (minutos)"
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            variant="standard"
                            sx={textFieldStyle}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <RoundButton value="ABRIR" onClick={handleSubmit} />
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default OpenScheduleModal;

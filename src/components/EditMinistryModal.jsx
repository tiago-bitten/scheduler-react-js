import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { HexColorPicker } from 'react-colorful';
import { usePut } from '../hooks/usePut';
import { useSnackbar } from 'notistack';
import { useFetch } from '../hooks/useFetch';
import RoundButton from './RoundButton';

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    maxWidth: '900px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const EditMinistryModal = ({ open, onClose, ministry, fetchMinistries }) => {
    const { data: dataActivities, fetch: fetchActivities } = useFetch(`/activities/ministry/${ministry?.id}`);
    const { loading, put } = usePut();
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = useState(ministry?.name);
    const [description, setDescription] = useState(ministry?.description);
    const [color, setColor] = useState(ministry?.color);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        if (open && ministry?.id) {
            fetchActivities();
            setActivities(dataActivities?.activities || []);
        }
    }, [open, ministry?.id]);

    const handleEditMinistry = async () => {
        const payload = { name, description, color };

        try {
            const response = await put(`/ministries/edit/${ministry?.id}`, payload);

            if (response.status === 204) {
                fetchMinistries();
                enqueueSnackbar('Ministério editado com sucesso', { variant: 'success' });
            }
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || "Erro ao editar ministério", { variant: 'error' });
        }
    };

    const handleActivityNameChange = (event, id) => {
        const updatedActivities = activities.map(activity => {
            if (activity.id === id) {
                return { ...activity, name: event.target.value };
            }
            return activity;
        });
        setActivities(updatedActivities);
    };

    const handleActivityTotalVolunteersChange = (event, id) => {
        const updatedActivities = activities.map(activity => {
            if (activity.id === id) {
                return { ...activity, defaultTotalVolunteers: Number(event.target.value) };
            }
            return activity;
        });
        setActivities(updatedActivities);
    };


    const handleActivityEdit = async (activity) => {
        const payload = { name: activity.name, defaultTotalVolunteers: activity.defaultTotalVolunteers };

        try {
            const response = await put(`/activities/${activity.id}`, payload);

            if (response.status === 200) {
                fetchActivities();
                enqueueSnackbar('Atividade editada com sucesso', { variant: 'success' });
            }
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || "Erro ao editar atividade", { variant: 'error' });
        }
    };

    const handleSave = async () => {
        await handleEditMinistry();

        for (const activity of activities) {
            await handleActivityEdit(activity);
        }

        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...boxStyle, overflow: 'auto', maxHeight: '80vh', width: '80vw', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mt: '15px' }}>
                    <Typography variant="h5" gutterBottom>
                        Editar Ministério
                    </Typography>
                </Box>
                <Grid container spacing={4} justifyContent="center" alignItems="flex-start" marginTop="5px">
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '100%' }}>
                            <TextField
                                label="Nome"
                                variant="filled"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Descrição"
                                variant="filled"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <Box sx={{ mt: '15px' }}>
                                <HexColorPicker color={color} onChange={setColor} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '100%' }}>
                            <Grid item xs={12} md={10}>
                                {activities.length > 0 ? (
                                    activities.map((activity) => (
                                        <Grid container key={activity.id} spacing={2} alignItems="center">
                                            <Grid item xs={8}>
                                                <TextField
                                                    variant="filled"
                                                    value={activity.name}
                                                    onChange={(event) => handleActivityNameChange(event, activity.id)}
                                                    fullWidth
                                                    margin="normal"
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField
                                                    variant='filled'
                                                    value={activity.defaultTotalVolunteers}
                                                    onChange={(event) => handleActivityTotalVolunteersChange(event, activity.id)}
                                                    fullWidth
                                                    margin="normal"
                                                />
                                            </Grid>
                                        </Grid>
                                    ))
                                ) : (
                                    <Typography>Nenhuma atividade vinculada.</Typography>
                                )}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mt: '15px' }}>
                    <RoundButton value="SALVAR" onClick={handleSave} sx={{ mt: 4 }} />
                </Box>
            </Box>
        </Modal>
    );
};

export default EditMinistryModal;

import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, IconButton, Grid, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { HexColorPicker } from 'react-colorful';
import { usePost } from '../hooks/usePost';
import { usePut } from '../hooks/usePut';
import { useSnackbar } from 'notistack';
import { useFetch } from '../hooks/useFetch';
import { useDelete } from '../hooks/useDelete';
import RoundButton from './RoundButton';

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    maxWidth: '1500px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const EditMinistryModal = ({ open, onClose, ministry, fetchMinistries }) => {
    const { data: dataActivities, fetch: fetchActivities } = useFetch(`/activities/ministry/${ministry?.id}`);
    const { loading, put } = usePut();
    const { post } = usePost();
    const { deleteRequest } = useDelete();
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [activities, setActivities] = useState([]);

    const [newActivityName, setNewActivityName] = useState('');
    const [newActivityTotalVolunteers, setNewActivityTotalVolunteers] = useState(0);

    useEffect(() => {
        if (open && ministry?.id) {
            fetchActivities();
            setName(ministry.name);
            setDescription(ministry.description);
            setColor(ministry.color);
        }
    }, [open, ministry?.id]);

    useEffect(() => {
        if (dataActivities && dataActivities.activities) {
            setActivities(dataActivities.activities);
        }
    }, [dataActivities]);

    const handleEditMinistry = async () => {
        const payload = { name, description, color };

        try {
            const response = await put(`/ministries/edit/${ministry?.id}`, payload);

            if (response.status === 204) {
                fetchMinistries();
                //enqueueSnackbar('Ministério editado com sucesso', { variant: 'success' });
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
                //enqueueSnackbar('Atividade editada com sucesso', { variant: 'success' });
            }
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || "Erro ao editar atividade", { variant: 'error' });
        }
    };

    const handleCreateActivity = async () => {
        const payload = { name: newActivityName, totalVolunteers: newActivityTotalVolunteers };

        try {
            const response = await post(`/activities/create?ministryId=${ministry?.id}`, payload);

            if (response.status === 201) {
                enqueueSnackbar('Atividade cadastrada com sucesso', { variant: 'success' });
                fetchActivities();
                setNewActivityName('');
                setNewActivityTotalVolunteers(0);
            }

        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || 'Error geral - EditMinistryModal', { variant: 'error' });
        }
    };

    const handleRemoveActivity = async (activity) => {
        try {
            const response = await deleteRequest(`/activities/${activity.id}`);

            if (response.status === 204) {
                fetchActivities();
                enqueueSnackbar('Atividade removida com sucesso', { variant: 'success' });
            }

        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || 'Error geral - EditMinistryModal', { variant: 'error' });
        }
    }

    const handleSave = async () => {
        await handleEditMinistry();

        for (const activity of activities) {
            await handleActivityEdit(activity);
        }
        enqueueSnackbar('Ministério editado com sucesso', { variant: 'success' });
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...boxStyle, width: '80vw', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
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
                                margin="normal"
                                sx={{ width: '70%' }}
                            />
                            <TextField
                                label="Descrição"
                                variant="filled"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                margin="normal"
                                sx={{ width: '70%' }}
                            />
                            <Box sx={{ mt: '15px' }}>
                                <HexColorPicker color={color} onChange={setColor} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '100%', overflow: 'auto', maxHeight: 350 }}>
                            <Grid item xs={12} md={10}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Atividades"
                                            variant="standard"
                                            fullWidth
                                            margin="normal"
                                            onChange={(event) => setNewActivityName(event.target.value)}
                                            value={newActivityName}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Total de voluntários"
                                            variant="standard"
                                            fullWidth
                                            margin="normal"
                                            onChange={(event) => setNewActivityTotalVolunteers(event.target.value)}
                                            value={newActivityTotalVolunteers === 0 ? '' : newActivityTotalVolunteers}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Tooltip title="Adicionar atividade" disableInteractive>
                                            <IconButton onClick={handleCreateActivity}>
                                                <AddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                                {activities.length > 0 ? (
                                    activities.map((activity) => (
                                        <Grid container key={activity.id} spacing={2} alignItems="center">
                                            <Grid item xs={6}>
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
                                            <Grid item xs={2}>
                                                <IconButton onClick={() => handleRemoveActivity(activity)}>
                                                    <CloseIcon />
                                                </IconButton>
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

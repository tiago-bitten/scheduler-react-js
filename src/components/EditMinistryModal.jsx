import React from 'react';
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
}

const EditMinistryModal = ({ open, onClose, ministry, fetchMinistries }) => {
    const { data: dataActivities, fetch: fetchActivities } = useFetch(`/activities/ministry/${ministry?.id}`)
    const { loading, put } = usePut();
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = React.useState(ministry?.name);
    const [description, setDescription] = React.useState(ministry?.description);
    const [color, setColor] = React.useState(ministry?.color);

    React.useEffect(() => {
        if (open) {
            fetchActivities();
        }
    }, [open])

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleColorChange = (color) => {
        setColor(color);
    }

    const handleEditMinistry = async () => {

        const payload = { name, description, color };

        try {
            const response = await put(`/ministries/edit/${ministry?.id}`, payload);

            if (response.status === 204) {
                fetchMinistries();
                enqueueSnackbar('Ministério editado', { variant: 'success' });
                onClose();
            }

        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || "Erro geral - EditMinistryModal", { variant: 'error' });
        }
    }

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
                <Grid container spacing={4} justifyContent="center" alignItems="flex-start" marginTop="5px">
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '100%' }}>
                            <Typography variant="h5" gutterBottom component="div">
                                Editar Ministério {ministry?.name}
                            </Typography>
                            <TextField
                                label="Nome"
                                variant="filled"
                                value={name}
                                onChange={handleNameChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Descrição"
                                variant="filled"
                                value={description}
                                onChange={handleDescriptionChange}
                                fullWidth
                                margin="normal"
                            />
                            <Box sx={{ mt: '15px' }}>
                                <HexColorPicker color={color} onChange={handleColorChange} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '100%' }}>
                            <Typography variant="h5" gutterBottom component="div">
                                Atividades vinculadas
                            </Typography>
                            <Grid item xs={12} md={10}>
                                {dataActivities?.activities.length > 0 ? (
                                    dataActivities.activities.map((activity) => (
                                        <Grid container key={activity.id} spacing={2} alignItems="center">
                                            <Grid item xs={8}>
                                                <TextField
                                                    variant="filled"
                                                    defaultValue={activity.name}
                                                    fullWidth
                                                    margin="normal"
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField
                                                    variant='filled'
                                                    defaultValue={activity.defaultTotalVolunteers}
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
                    <RoundButton value="SALVAR" onClick={handleEditMinistry} sx={{ mt: 4 }} />
                </Box>
            </Box>
        </Modal>

    );
};

export default EditMinistryModal;
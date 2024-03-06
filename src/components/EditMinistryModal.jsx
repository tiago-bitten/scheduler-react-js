import React from 'react';
import { Modal, Box, Typography, TextField, IconButton } from '@mui/material';
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
    width: '400px',
    maxWidth: '600px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const EditMinistryModal = ({ open, onClose, ministry, fetchMinistries }) => {
    const {data: dataActivities, fetch: fetchActivities } = useFetch(`/activities/ministry/${ministry?.id}`)
    const { loading, put } = usePut();
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = React.useState(ministry?.name);
    const [description, setDescription] = React.useState(ministry?.description);
    const [color, setColor] = React.useState(ministry?.color);

    React.useEffect(() => {
        if (open) {
            fetchActivities();
        }
    } , [open])

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
            <Box sx={boxStyle}>
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
                <Typography variant="h5" gutterBottom>
                    Editar Ministério {ministry?.name}
                </Typography>
                <TextField
                    label="Nome"
                    variant="filled"
                    defaultValue={ministry?.name}
                    onChange={handleNameChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Descrição"
                    variant="filled"
                    defaultValue={ministry?.description}
                    onChange={handleDescriptionChange}
                    fullWidth
                    margin="normal"
                />
                <Box sx={{ marginTop: 4 }}>
                    <HexColorPicker color={ministry?.color} onChange={handleColorChange} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 4 }}>
                    <RoundButton value="SALVAR" onClick={handleEditMinistry} />
                </Box>
                <Box>
                    {dataActivities?.activities.length > 0 ? (
                        <Typography variant="h6" gutterBottom>
                            Atividades vinculadas
                        </Typography>
                    ) : null}
                    {dataActivities?.activities.map((activity) => (
                        <Box key={activity.id}>
                            <TextField
                                label="Nome"
                                variant="filled"
                                defaultValue={activity.name}
                                fullWidth
                                margin="normal"
                                disabled
                            />

                            <TextField
                                label="Total de voluntários"
                                variant='filled'
                                defaultValue={activity.defaultTotalVolunteers}
                                fullWidth
                                margin="normal"
                                disabled
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Modal>
    );
};

export default EditMinistryModal;
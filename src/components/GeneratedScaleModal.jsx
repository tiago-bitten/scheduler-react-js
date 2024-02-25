import React from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GeneratedScaleLine from './GeneratedScaleLine';
import { usePost } from '../hooks/usePost';
import { useSnackbar } from 'notistack';
import RoundButton from './RoundButton';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '600px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'hidden'
};

const GeneratedScaleModal = ({ open, onClose, scale, schedule, fetchAppointments }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { loading, post } = usePost();
    const [currentScale, setCurrentScale] = React.useState([]);

    React.useEffect(() => {
        setCurrentScale(scale);
    }, [scale]);

    const handleRemoveFromScale = (volunteer, ministry) => {
        const newScale = currentScale.filter(
            item => !(item.volunteer.id === volunteer.id && item.ministry.id === ministry.id)
        );
        setCurrentScale(newScale);
        enqueueSnackbar('Voluntário removido da escala', { variant: 'success' });
    };

    const handleAppointment = async () => {
        try {
            const appointmentPromises = currentScale?.map(({ volunteer, ministry, activity }) => {
                return post(`/appointments/appoint?scheduleId=${schedule?.id}&volunteerId=${volunteer?.id}&ministryId=${ministry?.id}&activityId=${activity?.id}`);
            });
    
            await Promise.all(appointmentPromises);
    
            enqueueSnackbar('Voluntários agendados com sucesso', { variant: 'success' });
            fetchAppointments();
            onClose();
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || 'Erro ao agendar voluntário', { variant: 'error' });
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={modalStyle}>
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                    Escala gerada para {schedule?.title}
                </Typography>
                <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                    Total: {currentScale?.length}
                </Typography>
                <Box sx={{ overflow: 'auto', maxHeight: 500 }}>
                    {currentScale?.map(({ volunteer, ministry, activity }) => (
                        <GeneratedScaleLine
                            key={volunteer.id}
                            volunteer={volunteer}
                            ministry={ministry}
                            activity={activity}
                            onRemove={handleRemoveFromScale}
                        />
                    ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <RoundButton value="AGENDAR" onClick={handleAppointment} />
                </Box>
            </Box>
        </Modal>
    );
};

export default GeneratedScaleModal;
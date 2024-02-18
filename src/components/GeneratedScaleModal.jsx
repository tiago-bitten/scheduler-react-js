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

    const handleAppointment = async () => {
        try {
            scale?.forEach(async ({ volunteer, ministry }) => {
                post(`/appointments/appoint?scheduleId=${schedule?.id}&volunteerId=${volunteer?.id}&ministryId=${ministry?.id}`)
            });

            enqueueSnackbar('Voluntários agendados com sucesso', { variant: 'success' });
            fetchAppointments();
            onClose();
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || 'Erro ao agendar voluntário', { variant: 'error' });
        }
    }

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
                    Escala gerada para o dia {schedule?.startDate}
                </Typography>
                <Box sx={{ overflow: 'auto', maxHeight: 500 }}>
                    {scale?.map(({ volunteer, ministry }) => (
                        <GeneratedScaleLine
                            key={volunteer.id}
                            volunteer={volunteer}
                            ministry={ministry}
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
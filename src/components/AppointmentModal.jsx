import React from "react";

import { Modal, Box, Chip, Typography, IconButton, Grid } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from "notistack";
import AppointmentLine from "./AppointmentLine";
import AppointVolunteer from "./AppointVolunteer";
import NotFoundItem from "./NotFoundItem";
import instance from "../config/axiosConfig";
import moment from "moment";
import html2canvas from "html2canvas";
import RoundButton from "./RoundButton";
import DownloadIcon from '@mui/icons-material/Download';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
};

const AppointmentModal = ({ open, onClose, schedule }) => {
    const [token] = React.useState(sessionStorage.getItem('token'));
    const [appointments, setAppointments] = React.useState([]);
    const [ministries, setMinistries] = React.useState([]);
    const [showAppointVolunteerModal, setShowAppointVolunteerModal] = React.useState(false);
    const [selectedMinistry, setSelectedMinistry] = React.useState(null);
    const [isSchedulePast, setIsSchedulePast] = React.useState(null);

    const { enqueueSnackbar } = useSnackbar();
    const printRef = React.useRef();

    React.useEffect(() => {
        if (schedule) {
            const endDate = moment(schedule.end);
            setIsSchedulePast(endDate.isBefore(moment()));
        }

        fetchAppointments();
        fetchUserMinistries();
    }, [schedule]);

    const fetchAppointments = async () => {
        if (!schedule) {
            return;
        }

        try {
            const response = await instance.get(`/schedules/appointments?scheduleId=${schedule.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setAppointments(response.data.schedule.appointments);
            }

        } catch (err) {
            enqueueSnackbar(err.response.data.message || 'Erro ao buscar agendamentos', { variant: 'error' })
        }
    }

    const fetchUserMinistries = async () => {
        try {
            const response = await instance.get('/users/ministries', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setMinistries(response.data.ministries);
            }
        } catch (err) {
            enqueueSnackbar(err.response.data.message || 'Erro ao buscar ministérios', { variant: 'error' });
        }
    }

    const handleAppointment = (ministry) => {
        if (isSchedulePast) {
            enqueueSnackbar('Não é possível agendar voluntários para eventos passados', { variant: 'error' });
            return;
        }

        setShowAppointVolunteerModal(true);
        setSelectedMinistry(ministry);
    }

    const handleDownloadImage = async () => {
        const canvas = await html2canvas(printRef.current);
        const image = canvas.toDataURL('image/png', 1.0);
        downloadImage(image, `agendamentos-${schedule.title}.png`);
    }

    const downloadImage = (blob, fileName) => {
        const link = document.createElement('a');
        link.href = blob;
        link.download = fileName;
        link.click();
        link.remove();
    }

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box sx={style}>
                    <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" component="h2" sx={{ my: 2 }}>
                            {schedule?.title}
                        </Typography>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={6}>
                                <Typography variant="body1">
                                    Início: {moment(schedule?.start).format('DD/MM/YYYY HH:mm')}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">
                                    Término: {moment(schedule?.end).format('DD/MM/YYYY HH:mm')}
                                </Typography>
                            </Grid>
                        </Grid>
                        {schedule?.description && (
                            <Typography variant="body1" sx={{ my: 1 }}>
                                Descrição: {schedule.description}
                            </Typography>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mb: 2 }}>
                            {ministries.map(ministry => (
                                <Chip
                                    key={ministry.id}
                                    label={ministry.name}
                                    onClick={() => handleAppointment(ministry)}
                                    style={{ backgroundColor: ministry.color, color: 'white', margin: '0.5rem' }}
                                />
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ overflow: 'auto', maxHeight: '500px', mx: 4 }} ref={printRef}>
                        {appointments.length > 0 ? (
                            appointments.map(appointment => (
                                <AppointmentLine
                                    key={appointment.id}
                                    appointment={appointment}
                                    userMinistries={ministries}
                                    fetchAppointments={fetchAppointments}
                                    isSchedulePast={isSchedulePast}
                                />
                            ))
                        ) : (
                            <NotFoundItem entities="agendamentos" />
                        )}
                    </Box>
                    <IconButton onClick={handleDownloadImage} sx={{ position: 'absolute', right: 8, bottom: 8 }}>
                        <DownloadIcon />
                    </IconButton>
                </Box>
            </Modal>
            <AppointVolunteer
                open={showAppointVolunteerModal}
                onClose={() => setShowAppointVolunteerModal(false)}
                schedule={schedule}
                ministry={selectedMinistry}
                fetchAppointments={fetchAppointments}
            />
        </>
    );
};

export default AppointmentModal;

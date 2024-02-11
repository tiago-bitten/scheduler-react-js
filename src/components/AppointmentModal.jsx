import React, { useEffect, useRef, useState } from "react";
import { Modal, Box, Typography, IconButton, Grid, Card, CardContent, LinearProgress, Chip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";
import { useSnackbar } from "notistack";
import DownloadIcon from '@mui/icons-material/Download';
import html2canvas from 'html2canvas';
import { useFetch } from "../hooks/useFetch";
import AppointmentLine from "./AppointmentLine";
import AppointVolunteer from "./AppointVolunteer";
import NotFoundItem from "./NotFoundItem";

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

const AppointmentModal = ({ open, onClose, schedule }) => {
    const { enqueueSnackbar } = useSnackbar();
    const appointmentsFetch = useFetch(`/schedules/appointments?scheduleId=${schedule?.id}`);
    const ministriesFetch = useFetch('/users/ministries');
    const [appointments, setAppointments] = useState([]);

    const [showAppointVolunteerModal, setShowAppointVolunteerModal] = useState(false);
    const [selectedMinistry, setSelectedMinistry] = useState(null);

    const printRef = useRef(null);

    useEffect(() => {
        if (open) {
            appointmentsFetch.fetch();
            ministriesFetch.fetch();
        }
    }, [open]);

    const isSchedulePast = schedule ? moment(schedule.end).isBefore(moment()) : false;

    const handleDownloadImage = async () => {
        const canvas = await html2canvas(printRef.current);
        const image = canvas.toDataURL('image/png', 1.0);
        downloadImage(image, `agendamentos-${schedule?.title}.png`);
    };

    const downloadImage = (blob, fileName) => {
        const link = document.createElement('a');
        link.href = blob;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const handleAppointment = (ministry) => {
        if (isSchedulePast) {
            enqueueSnackbar('Não é possível agendar voluntários para eventos passados', { variant: 'error' });
            return;
        }

        setShowAppointVolunteerModal(true);
        setSelectedMinistry(ministry);
    }

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box sx={modalStyle}>
                    <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" component="h2" textAlign="center">
                        Agenda Information
                    </Typography>
                    {appointmentsFetch.loading || ministriesFetch.loading ? (
                        <LinearProgress sx={{ width: '100%', my: 2 }} />
                    ) : (
                        <Box sx={{ mt: 2 }}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="subtitle1">{schedule?.title}</Typography>
                                    <Typography variant="body1">{moment(schedule?.start).format('DD/MM/YYYY HH:mm')}</Typography>
                                    <Typography variant="body1">End: {moment(schedule?.end).format('DD/MM/YYYY HH:mm')}</Typography>
                                    <Typography variant="body2">Description: {schedule?.description}</Typography>
                                    {/* Render ministries */}
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                                        {ministriesFetch.data?.ministries?.map((ministry) => (
                                            <Chip
                                                key={ministry.id}
                                                label={ministry.name}
                                                onClick={() => handleAppointment(ministry)}
                                                style={{ backgroundColor: ministry.color, color: 'white', margin: '0.5rem' }}
                                            />
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                            <Box sx={{ mt: 2, overflowY: 'auto', maxHeight: 300 }} ref={printRef}>
                                {appointmentsFetch.data?.schedule?.appointments?.length > 0 ? (
                                    appointmentsFetch.data?.schedule?.appointments?.map((appointment) => (
                                        <AppointmentLine
                                            key={appointment.id}
                                            appointment={appointment}
                                            userMinistries={ministriesFetch.data?.ministries || []}
                                            fetchAppointments={appointmentsFetch.fetch}
                                            isSchedulePast={isSchedulePast}
                                        />
                                    ))
                                ) : (
                                    <NotFoundItem entities="agendamentos" />
                                )}
                            </Box>
                            <IconButton onClick={handleDownloadImage} sx={{ mt: 2 }}>
                                <DownloadIcon />
                            </IconButton>
                        </Box>
                    )}
                </Box>
            </Modal>
            <AppointVolunteer
                open={showAppointVolunteerModal}
                onClose={() => setShowAppointVolunteerModal(false)}
                ministry={selectedMinistry}
                schedule={schedule}
                isSchedulePast={isSchedulePast}
                fetchAppointments={appointmentsFetch.fetch}
            />
        </>
    );
};

export default AppointmentModal;

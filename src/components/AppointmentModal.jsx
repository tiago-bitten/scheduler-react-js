    import React, { useEffect, useRef, useState } from "react";
    import { Modal, Box, Typography, IconButton, Card, CardContent, Chip, TextField, Tooltip } from "@mui/material";
    import CloseIcon from '@mui/icons-material/Close';
    import moment from "moment";
    import { useSnackbar } from "notistack";
    import DownloadIcon from '@mui/icons-material/Download';
    import html2canvas from 'html2canvas';
    import { useFetch } from "../hooks/useFetch";
    import AppointmentLine from "./AppointmentLine";
    import AppointVolunteer from "./AppointVolunteer";
    import NotFoundItem from "./NotFoundItem";
    import CreateScaleModal from "./CreateScaleModal";
    import AssignmentIcon from '@mui/icons-material/Assignment';
    import { useDebounce } from '../hooks/useDebouce';

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '65%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        p: 4,
        overflow: 'hidden'
    };

    const AppointmentModal = ({ open, onClose, schedule }) => {
        const { enqueueSnackbar } = useSnackbar();
        const [volunteerName, setVolunteerName] = useState('');
        const appointmentsFetch = useFetch(`/schedules/appointments?scheduleId=${schedule?.id}&volunteerName=${volunteerName}`);
        const ministriesFetch = useFetch('/users/ministries');

        const [showAppointVolunteerModal, setShowAppointVolunteerModal] = useState(false);
        const [selectedMinistry, setSelectedMinistry] = useState(null);

        const [openCreateScaleModal, setOpenCreateScaleModal] = useState(false);

        const debouncedVolunteerName = useDebounce(volunteerName, 500);

        const printRef = useRef(null);

        useEffect(() => {
            if (open) {
                appointmentsFetch.fetch();
            }
        }, [open, debouncedVolunteerName]);

        useEffect(() => {
            if (open) {
                setVolunteerName('');
                ministriesFetch.fetch();
            }
        }, [open]);

        const isSchedulePast = schedule ? moment(schedule?.end).isBefore(moment()) : false;

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

        const handleVolunteerNameChange = (event) => {
            setVolunteerName(event.target.value);
        }

        return (
            <>
                <Modal open={open} onClose={onClose}>
                    <Box sx={modalStyle}>
                        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" component="h2" textAlign="center">
                            Agenda de {schedule?.title}
                        </Typography>
                        <Box sx={{ mt: 2, overflow: 'auto', maxHeight: 500 }}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body1">Dia {moment(schedule?.start).format('DD/MM/YYYY')} das {moment(schedule?.start).format('HH:mm')} até às {moment(schedule?.end).format('HH:mm')}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
                                        {ministriesFetch.data?.ministries?.map((ministry) => (
                                            <Chip
                                                key={ministry.id}
                                                label={ministry.name}
                                                onClick={() => handleAppointment(ministry)}
                                                style={{ backgroundColor: ministry.color, color: 'white', margin: '0.5rem 0.5rem 0 0.5rem', cursor: isSchedulePast ? 'not-allowed' : 'pointer' }}
                                            />
                                        ))}
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Tooltip title="Gerar escalas" disableInteractive>
                                            <IconButton onClick={() => setOpenCreateScaleModal(true)} sx={{ mt: 2 }}>
                                                <AssignmentIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Baixar escalas" disableInteractive>
                                            <IconButton onClick={handleDownloadImage} sx={{ mt: 2 }}>
                                                <DownloadIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </CardContent>
                            </Card>
                            <Box>
                                <TextField
                                    label="Voluntários"
                                    variant="standard"
                                    size="small"
                                    fullWidth
                                    autoComplete="off"
                                    onChange={handleVolunteerNameChange}
                                    value={volunteerName}
                                    sx={{ mt: 2 }}
                                />
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Total: {appointmentsFetch.data?.schedule?.appointments?.length || 0}
                                </Typography>
                            </Box>
                            <Box sx={{ mt: 2 }} ref={printRef}>
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
                        </Box>
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
                <CreateScaleModal
                    open={openCreateScaleModal}
                    onClose={() => setOpenCreateScaleModal(false)}
                    ministries={ministriesFetch.data?.ministries || []}
                    schedule={schedule}
                    fetchAppointments={appointmentsFetch.fetch}
                />
            </>
        );
    };

    export default AppointmentModal;

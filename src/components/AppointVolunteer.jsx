import React, { useEffect, useState } from "react";
import { Modal, Box, IconButton, Grid, Typography, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import instance from "../config/axiosConfig";
import NotFoundItem from "./NotFoundItem";
import { useSnackbar } from "notistack";
import moment from "moment";
import AppointVolunteerLine from "./AppointVolunteerLine";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    overflow: 'hidden',
};

const AppointVolunteer = ({ open, onClose, ministry, schedule, fetchAppointments }) => {
    const [token] = useState(sessionStorage.getItem('token'));
    const [volunteers, setVolunteers] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!ministry || !open) return;
        fetchVolunteers();
    }, [ministry, token, open]);

    const fetchVolunteers = async () => {
        try {
            const response = await instance.get(`/volunteers/not-in-schedule/${schedule.id}/ministry/${ministry.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setVolunteers(response.data.volunteers);
            }
        } catch (err) {
            enqueueSnackbar(err.response.data.message || 'Erro ao buscar voluntários', { variant: 'error' });
        }
    }

    const handleAppointment = async (volunteerId) => {
        try {
            const response = await instance.post(`/appointments/appoint?scheduleId=${schedule.id}&volunteerId=${volunteerId}&ministryId=${ministry.id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 204) {
                enqueueSnackbar('Voluntário agendado com sucesso', { variant: 'success' });
                fetchAppointments();
                fetchVolunteers();
            }

        } catch (err) {
            enqueueSnackbar(err.response.data.message || 'Erro ao agendar voluntário', { variant: 'error' });
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Agendar para {schedule?.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" gutterBottom>Voluntários</Typography>
                        <TextField
                            label="Buscar"
                            variant="standard"
                            size="small"
                            fullWidth
                            autoComplete="off"
                            sx={{ mb: 2 }}
                        />
                        <List sx={{ maxHeight: '400px', overflowY: 'auto', backgroundColor: 'grey.200' }}>
                            {volunteers.length > 0 ? (
                                volunteers.map(volunteer => (
                                    <AppointVolunteerLine
                                        key={volunteer.id}
                                        volunteer={volunteer}
                                        handleAppointment={handleAppointment}
                                    />
                                ))) : (
                                <NotFoundItem entities="voluntários" />
                            )}
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" gutterBottom>Grupos</Typography>
                        <TextField
                            label="Buscar"
                            variant="standard"
                            size="small"
                            fullWidth
                            autoComplete="off"
                            sx={{ mb: 2 }}
                        />
                        <List sx={{ maxHeight: '400px', overflowY: 'auto', backgroundColor: 'grey.200' }}>
                            <NotFoundItem entities="grupos" />
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}

export default AppointVolunteer;

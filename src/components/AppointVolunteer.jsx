import React, { useEffect, useState } from "react";
import { Modal, Box, IconButton, Grid, Typography, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import instance from "../config/axiosConfig";
import NotFoundItem from "./NotFoundItem";
import { useSnackbar } from "notistack";
import moment from "moment";
import AppointVolunteerLine from "./AppointVolunteerLine";
import { usePost } from "../hooks/usePost";
import { useFetch } from "../hooks/useFetch";
import CreateScaleModal from "./CreateScaleModal";

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
    const { enqueueSnackbar } = useSnackbar();

    const volunteersFetch = useFetch(`/volunteers/not-in-schedule/${schedule?.id}/ministry/${ministry?.id}`);
    const { post } = usePost();

    const [openCreateScaleModal, setOpenCreateScaleModal] = useState(false);

    React.useEffect(() => {
        if (open) {
            volunteersFetch.fetch();
        }
        // eslint-disable-next-line
    }, [open]);

    const handleAppointment = async (volunteerId) => {
        try {
            const response = await post(`/appointments/appoint?scheduleId=${schedule?.id}&volunteerId=${volunteerId}&ministryId=${ministry?.id}`);

            if (response.status === 204) {
                enqueueSnackbar('Voluntário agendado com sucesso', { variant: 'success' });
                fetchAppointments();
                volunteersFetch.fetch();
            }

        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || "Erro geral", { variant: 'error' });
        }
    };

    return (
        <>
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
                                {volunteersFetch.data?.volunteers?.length > 0 ? (
                                    volunteersFetch.data?.volunteers?.map(volunteer => (
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
                                <ListItem button onClick={() => setOpenCreateScaleModal(true)}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                                            <DoneIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Criar escala" />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <CreateScaleModal
                open={openCreateScaleModal}
                onClose={() => setOpenCreateScaleModal(false)}
                schedule={schedule}
                ministry={ministry}
            />
        </>
    );
}

export default AppointVolunteer;
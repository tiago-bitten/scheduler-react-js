import React from "react";
import instance from "../config/axiosConfig";
import { useSnackbar } from "./SnackbarProvider";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Modal, Box, IconButton, Grid, Typography, TextField } from "@mui/material";

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
};

const AppointVolunteer = ({ open, onClose, ministry, schedule, fetchAppointments }) => {
    const [token] = React.useState(sessionStorage.getItem('token'));
    const [volunteers, setVolunteers] = React.useState([]);

    const enqueueSnackbar = useSnackbar();

    React.useEffect(() => {

        fetchVolunteers();
    }, [ministry, token]);

    const fetchVolunteers = async () => {
        if (!ministry) {
            return;
        }

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
            enqueueSnackbar(err.response.data.message || 'Erro ao buscar voluntários');
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
                enqueueSnackbar('Voluntário agendado com sucesso');
                fetchAppointments();
                fetchVolunteers();
            }

        } catch (err) {
            enqueueSnackbar(err.response.data.message || 'Erro ao agendar voluntário');
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={style}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Agendar para {schedule?.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" gutterBottom>Voluntários</Typography>
                        <TextField
                            label="Buscar voluntário"
                            variant="standard"
                            size="small"
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {volunteers.map(volunteer => (
                                <div key={volunteer.id} className="flex items-center justify-between p-4 border-b border-gray-200">
                                    <div className="flex items-center">
                                        <img
                                            src="https://thispersondoesnotexist.com/"
                                            alt="thispersondoesnotexists"
                                            className="rounded-full w-14 h-14 mr-4" />
                                        <div>
                                            <p className="text-xl text-quinary">{volunteer.name} {volunteer.lastName}</p>
                                        </div>
                                    </div>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleAppointment(volunteer.id)}>
                                        <CheckCircleOutlineIcon />
                                    </IconButton>
                                </div>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" gutterBottom>Grupos</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}

export default AppointVolunteer;

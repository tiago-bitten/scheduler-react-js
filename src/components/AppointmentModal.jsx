import React from "react";

import { Modal, Box } from "@mui/material";
import { useSnackbar } from "./SnackbarProvider";
import AppointmentLine from "./AppointmentLine";
import instance from "../config/axiosConfig";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
};

const AppointmentModal = ({ open, onClose, schedule }) => {
    const [token] = React.useState(sessionStorage.getItem('token'));
    const [appoinments, setAppointments] = React.useState([]);
    const [ministries, setMinistries] = React.useState([]);

    const enqueueSnackbar = useSnackbar();

    React.useEffect(() => {
        const fetchAppointments = async () => {
            if (!schedule.id) {
                onClose();
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
                    console.log(response.data.schedule.appointments);
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

        fetchAppointments();
        fetchUserMinistries();
    }, [schedule]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Box>
                    <h1 className="text-center">{schedule.title}</h1>
                    {ministries.map(ministry => (
                        <p key={ministry.id}>{ministry.name}</p>
                    ))}
                </Box>
                <Box>
                    {appoinments.map(appointment => (
                        <AppointmentLine key={appointment.id} appointment={appointment} />
                    ))}
                </Box>
            </Box>
        </Modal>
    );
};

export default AppointmentModal;

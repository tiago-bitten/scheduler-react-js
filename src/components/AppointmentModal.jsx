import React from "react";

import { Modal, Box } from "@mui/material";
import { useSnackbar } from "./SnackbarProvider";
import instance from "../config/axiosConfig";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
};

const AppointmentModal = ({ open, onClose, scheduleId }) => {
    const [token] = React.useState(sessionStorage.getItem('token'));
    const [appoinments, setAppointments] = React.useState([]);

    const enqueueSnackbar = useSnackbar();

    React.useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await instance.get(`/schedules/appointments?scheduleId=${scheduleId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setAppointments(response.data.schedule.appoinments);
                }

            } catch (err) {
                enqueueSnackbar(err.response.data.message || 'Erro ao buscar agendamentos', { variant: 'error' })
            }   
        }

        fetchAppointments();
    }, [scheduleId])
    

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                {appoinments.map(appointment => (
                    <div key={appointment.id}>
                        <p>{appointment.volunteer.name} {appointment.ministry.name}</p>
                    </div>
                ))}
            </Box>
        </Modal>
    );
};

export default AppointmentModal;

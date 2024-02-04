import React from "react";

import instance from "../config/axiosConfig";
import { useSnackbar } from "./SnackbarProvider";

import { Modal, Box } from "@mui/material";

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

const AppointVolunteer = ({ open, onClose, ministry, schedule }) => {
    const [token] = React.useState(sessionStorage.getItem('token'));
    const [volunteers, setVolunteers] = React.useState([]);

    const enqueueSnackbar = useSnackbar();

    React.useEffect(() => {
        const fetchVolunteers = async () => {
            if (!ministry) {
                return;
            }

            try {
                const response = await instance.get(`/volunteers?ministryId=${ministry.id}`, {
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

        fetchVolunteers();
    }, [ministry, token, enqueueSnackbar]);

    const handleAppointment = async (volunteerId) => {
        try {
            const response = await instance.post(`/appointments/appoint?scheduleId=${schedule.id}&volunteerId=${volunteerId}&ministryId=${ministry.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 204) {
                enqueueSnackbar('Voluntário agendado com sucesso');
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
                <h1>Voluntários</h1>
                {volunteers.map(volunteer => (
                    <div key={volunteer.id} className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center">
                            <img
                                src="https://thispersondoesnotexist.com/"
                                alt="thispersondoesnotexists"
                                className="rounded-full w-14 h-14 mr-4" />
                            <div>
                                <p className="text-xl text-quinary">{volunteer.name} {volunteer.lastName}</p>
                                <p className="text-sm font-semibold text-primary">
                                    {volunteer.email}
                                </p>
                            </div>
                        </div>
                        <button
                            className="bg-primary text-white px-4 py-2 rounded-md"
                            onClick={() => handleAppointment(volunteer.id)}
                        >
                            Agendar
                        </button>
                    </div>
                ))}
            </Box>
        </Modal>
    );
}

export default AppointVolunteer;
/* eslint-disable react/prop-types */
import React from "react";

import instance from "../config/axiosConfig";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip, Box, Typography } from "@mui/material";

import { useSnackbar } from "notistack";

const AppointmentLine = ({ appointment, userMinistries, fetchAppointments, isSchedulePast }) => {
    const [token] = React.useState(sessionStorage.getItem('token'));
    const { enqueueSnackbar } = useSnackbar();

    const handleDelete = async (id) => {
        try {
            const response = await instance.delete(`/appointments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 204) {
                enqueueSnackbar('Voluntário desagendado com sucesso', { variant: 'success' });
                fetchAppointments();
            }

        } catch (err) {
            enqueueSnackbar(err.response?.data?.message || 'Erro ao desagendar voluntário', { variant: 'error' });
        }
    } 

    const isUserAllowedInMinistry = userMinistries.some(ministry =>
        ministry.id === appointment.volunteerMinistry.ministry.id
    );

    const isActive = appointment.volunteerMinistry.isActive;

    const tooltipContent = isActive ? "" : `Não existe mais vinculo entre o voluntário ${appointment.volunteerMinistry.volunteer.name} e o ministério ${appointment.volunteerMinistry.ministry.name}`;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: 1, borderColor: 'grey.300', backgroundColor: 'grey.200' }}>
            <Tooltip title={tooltipContent} disableHoverListener={isActive}>
                <Box sx={{ display: 'flex', alignItems: 'center', opacity: !isActive ? 0.7 : 1 }}>
                    <img
                        src="https://thispersondoesnotexist.com/"
                        alt="thispersondoesnotexists"
                        className={`rounded-full w-14 h-14 mr-4 ${!isActive ? 'grayscale' : ''}`} />
                    <Box>
                        <Typography variant="h6" component="p" sx={{ color: !isActive ? 'grey.400' : 'grey.900', mb: 0.3 }}>
                            {appointment.volunteerMinistry.volunteer.name} {appointment.volunteerMinistry.volunteer.lastName}
                        </Typography>
                        <Typography variant="body2" component="p" sx={{ color: !isActive ? 'grey.400' : appointment.volunteerMinistry.ministry.color, fontWeight: 'bold' }}>
                            {appointment.volunteerMinistry.ministry.name}
                        </Typography>
                    </Box>
                </Box>
            </Tooltip>
            <Box>
                {isUserAllowedInMinistry && !isSchedulePast ? (
                    <IconButton
                        onClick={() => handleDelete(appointment.id)}
                    >
                        <CloseIcon fontSize="large" />
                    </IconButton>
                ) : null}
            </Box>
        </Box>
    );
};

export default AppointmentLine;

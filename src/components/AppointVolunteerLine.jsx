import React from 'react';
import { ListItemText, ListItem, ListItemAvatar, Avatar, IconButton, Tooltip, Box } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

const AppointVolunteerLine = ({ volunteer, handleAppointment }) => {
    const isUnavailable = volunteer.isUnavailable;

    return (
        <Tooltip title={isUnavailable ? 'Voluntário não pode ser agendado nesta data' : ''}>
            <ListItem
                key={volunteer.id}
                divider
                sx={{
                    backgroundColor: isUnavailable ? '#E0E0E0' : '',
                    opacity: isUnavailable ? 0.5 : 1,
                }}
            >
                <ListItemAvatar>
                    <Avatar src="https://thispersondoesnotexist.com/" alt={volunteer.name} />
                </ListItemAvatar>
                <ListItemText
                    primary={volunteer.name + ' ' + volunteer.lastName}
                />
                {!isUnavailable && (
                    <Tooltip title="Agendar">
                        <Box>
                            <IconButton onClick={() => handleAppointment(volunteer.id)}>
                                <DoneIcon fontSize="medium" />
                            </IconButton>
                        </Box>
                    </Tooltip>
                )}
            </ListItem>
        </Tooltip>
    );
};

export default AppointVolunteerLine;

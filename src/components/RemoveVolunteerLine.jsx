import React from 'react';
import { ListItemText, ListItem, ListItemAvatar, Avatar, IconButton, Tooltip, Box } from '@mui/material';
import Close from '@mui/icons-material/Close';

const RemoveVolunteerLine = ({ volunteer, removeVolunteer }) => {

    return (
        <ListItem
            key={volunteer.id}
            divider
        >
            <ListItemAvatar>
                <Avatar src="https://thispersondoesnotexist.com/" alt={volunteer.name} />
            </ListItemAvatar>
            <ListItemText
                primary={volunteer.name + ' ' + volunteer.lastName}
            />
            <Tooltip title="Remover">
                <Box>
                    <IconButton onClick={removeVolunteer}>
                        <Close fontSize="medium" />
                    </IconButton>
                </Box>
            </Tooltip>
        </ListItem>
    );
};

export default RemoveVolunteerLine;
import React from 'react';
import { ListItemText, ListItem, ListItemAvatar, Avatar, IconButton, Tooltip, Box } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

const AddVolunteerLine = ({ volunteer, addVolunteer }) => {

    return (
        <ListItem
            key={volunteer.id}
            divider
        >
            <ListItemAvatar>
                <Avatar /*src="https://thispersondoesnotexist.com/"*/ alt={volunteer.name} />
            </ListItemAvatar>
            <ListItemText
                primary={volunteer.name + ' ' + volunteer.lastName}
            />
            <Tooltip title="Adicionar">
                <Box>
                    <IconButton onClick={addVolunteer}>
                        <DoneIcon fontSize="medium" />
                    </IconButton>
                </Box>
            </Tooltip>
        </ListItem>
    );
};

export default AddVolunteerLine;
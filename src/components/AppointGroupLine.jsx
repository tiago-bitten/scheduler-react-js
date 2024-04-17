import React from "react";
import { Modal, Box, IconButton, Grid, Typography, Tooltip, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const listItemStyle = {
    transition: 'opacity 0.3s ease-in-out',
    '&:hover': {
        cursor: 'pointer',
        opacity: 0.5,
    },
};;

const AppointGroupLine = ({ group, seeGroup }) => {
    return (
        <>
            <Tooltip title="" disableInteractive>
                <ListItem key={group.id} divider>
                    <ListItemAvatar>
                        <Avatar>
                            <GroupIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={group.name}
                        secondary={group.description}
                    />
                    <Tooltip title="Visualizar" disableInteractive>
                        <Box>
                            <IconButton onClick={() => seeGroup(group)}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Box>
                    </Tooltip>
                </ListItem>
            </Tooltip>
        </>
    );
}

export default AppointGroupLine;
import React from "react";
import { Modal, Box, IconButton, Grid, Typography, Tooltip, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import GroupIcon from '@mui/icons-material/Group';
import instance from "../config/axiosConfig";
import NotFoundItem from "./NotFoundItem";
import { useSnackbar } from "notistack";
import moment from "moment";
import AppointVolunteerLine from "./AppointVolunteerLine";
import { usePost } from "../hooks/usePost";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from '../hooks/useDebouce';
import AppointGroup from "./AppointGroup";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const listItemStyle = {
    transition: 'opacity 0.3s ease-in-out',
    '&:hover': {
        cursor: 'pointer',
        opacity: 0.5,
    },
};;

const AppointGroupLine = ({ group, handleAppointment }) => {
    const [openAppointGroup, setOpenAppointGroup] = React.useState(false);

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
                            <IconButton onClick={() => setOpenAppointGroup(true)}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Box>
                    </Tooltip>
                </ListItem>
            </Tooltip>
            <AppointGroup
                open={openAppointGroup}
                onClose={() => setOpenAppointGroup(false)}
                group={group}
                fetchAppointments={null}
            />
        </>
    );
}

export default AppointGroupLine;
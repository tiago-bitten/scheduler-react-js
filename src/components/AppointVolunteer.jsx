import React, { useEffect, useState } from "react";
import { Modal, Box, IconButton, Grid, Typography, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
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
import IndicateActivity from "./IndicateActivity";
import AppointGroupLine from "./AppointGroupLine";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    overflow: 'hidden',
};

const AppointVolunteer = ({ open, onClose, ministry, schedule, fetchAppointments }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [volunteerName, setVolunteerName] = useState('');
    const [groupName, setGroupName] = useState('');

    const volunteersFetch = useFetch(`/volunteers/not-in-schedule/${schedule?.id}/ministry/${ministry?.id}?volunteerName=${volunteerName}`);
    const groupsFetch = useFetch(`/groups/ministry/${ministry?.id}/schedule/${schedule?.id}?groupName=${groupName}`)
    const { post } = usePost();

    const [volunteer, setVolunteer] = useState({});

    const [openIndicateActivity, setOpenIndicateActivity] = useState(false);

    const debouncedVolunteerName = useDebounce(volunteerName, 500);
    const debouncedGroupName = useDebounce(volunteerName, 500);

    React.useEffect(() => {
        if (open) {
            volunteersFetch.fetch();
        }
        // eslint-disable-next-line
    }, [open, debouncedVolunteerName]);

    React.useEffect(() => {
        if (open) {
            groupsFetch.fetch();
        }
        // eslint-disable-next-line
    }, [open, debouncedGroupName]);

    React.useEffect(() => {
        if (open) {
            setVolunteerName('');
            setGroupName('');
        }
    }, [open]);

    const handleAppointment = async (volunteer) => {
        setVolunteer(volunteer);
        setOpenIndicateActivity(true);
    };

    const handleVolunteerNameChange = (event) => {
        setVolunteerName(event.target.value);
    };

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    };

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box sx={style}>
                    <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Agendar para {schedule?.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom>Voluntários</Typography>
                            <TextField
                                label="Buscar"
                                variant="standard"
                                size="small"
                                fullWidth
                                autoComplete="off"
                                onChange={handleVolunteerNameChange}
                                value={volunteerName}
                                sx={{ mb: 2 }}
                            />
                            <List sx={{ maxHeight: '400px', overflowY: 'auto', backgroundColor: 'grey.200' }}>
                                {volunteersFetch.data?.volunteers?.length > 0 ? (
                                    volunteersFetch.data?.volunteers?.map(volunteer => (
                                        <AppointVolunteerLine
                                            key={volunteer.id}
                                            volunteer={volunteer}
                                            handleAppointment={handleAppointment}
                                        />
                                    ))) : (
                                    <NotFoundItem entities="voluntários" />
                                )}
                            </List>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom>Grupos</Typography>
                            <TextField
                                label="Buscar"
                                variant="standard"
                                size="small"
                                fullWidth
                                autoComplete="off"
                                sx={{ mb: 2 }}
                            />
                            <List sx={{ maxHeight: '400px', overflowY: 'auto', backgroundColor: 'grey.200' }}>
                                {groupsFetch.data?.groups?.length > 0 ? (
                                    groupsFetch.data?.groups?.map(group => (
                                        <AppointGroupLine
                                            key={group.id}
                                            group={group}
                                            handleAppointment={handleAppointment}
                                        />
                                    ))) : (
                                    <NotFoundItem entities="grupos" />
                                )}
                            </List>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <IndicateActivity
                open={openIndicateActivity}
                onClose={() => setOpenIndicateActivity(false)}
                volunteer={volunteer}
                ministry={ministry}
                schedule={schedule}
                fetchAppointments={fetchAppointments}
                fetchVolunteers={volunteersFetch.fetch}
                fetchGroups={groupsFetch.fetch}
            />
        </>
    );
}

export default AppointVolunteer;
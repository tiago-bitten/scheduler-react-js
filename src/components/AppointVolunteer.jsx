import React, { useEffect, useState } from "react";
import { Modal, Box, IconButton, Grid, Typography, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import NotFoundItem from "./NotFoundItem";
import { useSnackbar } from "notistack";
import AppointVolunteerLine from "./AppointVolunteerLine";
import { usePost } from "../hooks/usePost";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from '../hooks/useDebouce';
import IndicateActivity from "./IndicateActivity";
import AppointGroupLine from "./AppointGroupLine";
import VolunteerMinistryModalSkeleton from "./VolunteerMinistryModalSkeleton";
import AppointGroup from "./AppointGroup";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    minHeight: '85%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    overflow: 'hidden',
};

/**
 *
 * [
 *      { volunteerId: 1, activityId: 1, checked: true }
 * ] 
 *
 */

const AppointVolunteer = ({ open, onClose, ministry, schedule, fetchAppointments }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [volunteerName, setVolunteerName] = useState('');
    const [groupName, setGroupName] = useState('');
    const [isSearchingVolunteers, setIsSearchingVolunteers] = useState(false);
    const [isSearchingGroups, setIsSearchingGroups] = useState(false);

    const [appointGroup, setAppointGroup] = useState([]);

    const volunteersFetch = useFetch(`/volunteers/not-in-schedule/${schedule?.id}/ministry/${ministry?.id}?volunteerName=${volunteerName}`);
    const groupsFetch = useFetch(`/groups/ministry/${ministry?.id}/schedule/${schedule?.id}?groupName=${groupName}`)
    const { post } = usePost();

    const [volunteer, setVolunteer] = useState({});
    const [selectedGroup, setSelectedGroup] = useState({});

    const [openIndicateActivity, setOpenIndicateActivity] = useState(false);
    const [openAppointGroup, setOpenAppointGroup] = useState(false);

    const debouncedVolunteerName = useDebounce(volunteerName, 500);
    const debouncedGroupName = useDebounce(groupName, 500);

    React.useEffect(() => {
        if (open) {
            volunteersFetch.fetch();
            setIsSearchingVolunteers(false);
        }
        // eslint-disable-next-line
    }, [open, debouncedVolunteerName]);

    React.useEffect(() => {
        if (open) {
            groupsFetch.fetch();
            setIsSearchingGroups(false);
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
        setIsSearchingVolunteers(true);
    };

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
        setIsSearchingGroups(true);
    };

    const handleSeeGroup = (group) => {
        setSelectedGroup(group);
        setOpenAppointGroup(true);
    }

    const handleSetVolunteerAppointGroup = (volunteerId) => {
        // { volunteerId: 1, activityId: 1, checked: true }
        setAppointGroup([...appointGroup, { volunteerId }]);
    }

    const handleSetActivityAppointGroup = (volunteerId, activityId) => {
        const newAppointGroup = appointGroup.map(item => {
            if (item.volunteerId === volunteerId) {
                return { ...item, activityId };
            }
            return item;
        });

        setAppointGroup(newAppointGroup);
    }

    const handleSetCheckedAppointGroup = (volunteerId, checked) => {
        const newAppointGroup = appointGroup.map(item => {
            if (item.volunteerId === volunteerId) {
                return { ...item, checked };
            }
            return item;
        });

        setAppointGroup(newAppointGroup);
    }

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box sx={style}>
                    <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Agendar para {schedule?.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Buscar voluntários"
                                variant="standard"
                                size="small"
                                fullWidth
                                autoComplete="off"
                                onChange={handleVolunteerNameChange}
                                value={volunteerName}
                                sx={{ mb: 2 }}
                            />
                            <List sx={{ width: '100%', minHeight: '400px', maxHeight: '400px', overflowY: 'auto', backgroundColor: 'grey.200' }}>
                                {volunteersFetch?.loading || isSearchingVolunteers ? <VolunteerMinistryModalSkeleton /> :
                                    volunteersFetch.data?.volunteers?.length > 0 ? (
                                        volunteersFetch.data?.volunteers?.map(volunteer => (
                                            <ListItem key={volunteer.id}>
                                                <AppointVolunteerLine
                                                    key={volunteer.id}
                                                    volunteer={volunteer}
                                                    handleAppointment={handleAppointment}
                                                />
                                            </ListItem>
                                        ))) : (
                                        <NotFoundItem entities="voluntários" />
                                    )}
                            </List>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Buscar grupos"
                                variant="standard"
                                size="small"
                                fullWidth
                                autoComplete="off"
                                sx={{ mb: 2 }}
                                onChange={handleGroupNameChange}
                            />
                            <List sx={{ minHeight: '400px', maxHeight: '400px', overflowY: 'auto', backgroundColor: 'grey.200' }}>
                                {groupsFetch?.loading || isSearchingGroups ? <VolunteerMinistryModalSkeleton /> :
                                    groupsFetch.data?.groups?.length > 0 ? (
                                        groupsFetch.data?.groups?.map(group => (
                                            <ListItem key={group.id}>
                                                <AppointGroupLine
                                                    key={group.id}
                                                    group={group}
                                                    seeGroup={handleSeeGroup}
                                                />
                                            </ListItem>
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
            <AppointGroup
                open={openAppointGroup}
                onClose={() => setOpenAppointGroup(false)}
                group={selectedGroup}
                schedule={schedule}
                ministry={ministry}
                fetchAppointments={fetchAppointments}
            />
        </>
    );
}

export default AppointVolunteer;
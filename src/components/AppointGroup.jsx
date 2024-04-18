import React from "react";
import { Modal, Box, Typography, ListItem, List } from "@mui/material";
import CloseModal from "./CloseModal";
import AppointGroupVolunteerItem from "./AppointGroupVolunteerItem";
import RoundButton from "./RoundButton";
import { usePost } from "../hooks/usePost";
import { useSnackbar } from "notistack";
import { useFetch } from "../hooks/useFetch";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 5,
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

const AppointGroup = ({ open, onClose, group, schedule, ministry, fetchAppointments, appointGroup, setAppointGroup, handleSetVolunteerAppointGroup, handleSetActivityAppointGroup, handleSetCheckedAppointGroup }) => {
    const activitiesFetch = useFetch(`/activities/ministry/${ministry?.id}`);
    const { post } = usePost();
    const { enqueueSnackbar } = useSnackbar();
    const [checkedVolunteers, setCheckedVolunteers] = React.useState([]);

    React.useEffect(() => {
        if (open) {
            activitiesFetch.fetch();
            const initialAppointGroup = group?.volunteers.map(volunteer => ({
                volunteerId: volunteer.id,
                activityId: null,
                checked: volunteer.available
            }));
            setAppointGroup(initialAppointGroup || []);
        } else {
            setAppointGroup([]);
        }
    }, [open, group]);

    const handleActivitySelect = (volunteerId, activityId) => {
        setAppointGroup(prev => prev.map(item => {
            if (item.volunteerId === volunteerId) {
                return { ...item, activityId: activityId };
            }
            return item;
        }));
    };

    const handleGroupAppointment = async () => {
        const payload = {};

        try {
            const response = await post(`/appointments/appoint-group?scheduleId=${schedule?.id}&ministryId=${ministry?.id}`, payload);

            if (response.status === 204) {
                enqueueSnackbar("Grupo agendado com sucesso", { variant: "success" });
                fetchAppointments();
                onClose();
            }

        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || "Error geral - AppointGroup", { variant: "error" });
            console.error(error);
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <CloseModal onClose={onClose} />
                <List sx={{ overflow: 'auto', maxHeight: 500 }}>
                    {group?.volunteers?.map((volunteer, index) => (
                        <ListItem key={index} divider sx={{
                            backgroundColor: !volunteer.available ? '#E0E0E0' : '',
                            opacity: !volunteer.available ? 0.7 : 1,
                        }}>
                            <AppointGroupVolunteerItem
                                volunteer={volunteer}
                                checkedVolunteers={checkedVolunteers}
                                setCheckedVolunteers={setCheckedVolunteers}
                                activities={activitiesFetch?.data?.activities}
                                onActivitySelect={handleActivitySelect}
                            />
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <RoundButton value="Agendar" onClick={() => console.log(appointGroup)} />
                </Box>
            </Box>
        </Modal>
    );
};

export default AppointGroup;
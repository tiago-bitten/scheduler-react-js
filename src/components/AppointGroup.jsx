import React from "react";
import { Modal, Box, Typography, ListItem, List } from "@mui/material";
import CloseModal from "./CloseModal";
import AppointGroupVolunteerItem from "./AppointGroupVolunteerItem";
import RoundButton from "./RoundButton";

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

const AppointGroup = ({ open, onClose, group, fetchAppointments }) => {
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
                    {group.volunteers.map((volunteer, index) => (
                        <ListItem key={index} divider sx={{
                            backgroundColor: !volunteer.available ? '#E0E0E0' : '',
                            opacity: !volunteer.available ? 0.7 : 1,
                        }}>
                            <AppointGroupVolunteerItem volunteer={volunteer} />
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <RoundButton value="Agendar" />
                </Box>
            </Box>
        </Modal>
    );
};

export default AppointGroup;
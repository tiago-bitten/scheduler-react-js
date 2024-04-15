import React from "react";
import { Modal, Box, Typography, ListItem, List } from "@mui/material";
import CloseModal from "./CloseModal";
import AppointGroupVolunteerItem from "./AppointGroupVolunteerItem";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
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
                <List>
                    {group.volunteers.map((volunteer, index) => (
                        <ListItem key={index} divider>
                            <AppointGroupVolunteerItem volunteer={volunteer} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Modal>
    );
};

export default AppointGroup;
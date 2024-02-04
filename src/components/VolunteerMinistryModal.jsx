import React from "react";
import {
    Modal,
    Box,
    Typography,
    List,
    ListItem,
    IconButton,
    ListItemText,
    CircularProgress
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RoundButton from "./RoundButton";
import NotFoundItem from "./NotFoundItem";

const VolunteerMinistryModal = ({ open, handleClose, volunteers, changeAction, action, title, handleAssociateVolunteer, handleDisassociateVolunteer }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                maxHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: 2,
                }}>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                    <RoundButton value={action} onClick={changeAction} />
                </Box>
                <Box sx={{
                    overflowY: 'auto',
                    maxHeight: '50vh',
                    bgcolor: '#F5F5F5',
                }}>
                    <List>
                        {volunteers.length > 0 ? (
                            volunteers.map((volunteer) => (
                                    <ListItem key={volunteer.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <ListItemText primary={volunteer.name} />
                                        <span>
                                            {action === "ADICIONAR" ? (
                                                <IconButton color="error" onClick={() => handleDisassociateVolunteer(volunteer.id)}>
                                                    <HighlightOffIcon />
                                                </IconButton>
                                            ) : (
                                                <IconButton color="primary" onClick={() => handleAssociateVolunteer(volunteer.id)}>
                                                    <CheckCircleOutlineIcon />
                                                </IconButton>
                                            )}
                                        </span>
                                    </ListItem>
                                ))
                        ) : (
                            <NotFoundItem entities="voluntários" />
                        )}
                    </List>
                </Box>
            </Box>
        </Modal>
    );
};

export default VolunteerMinistryModal;

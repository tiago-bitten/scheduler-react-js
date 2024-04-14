import React from "react";
import {
    Modal,
    Box,
    Tabs,
    Tab,
    List,
    ListItem,
    TextField,
    IconButton,
    ListItemText,
    CircularProgress
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RoundButton from "./RoundButton";
import NotFoundItem from "./NotFoundItem";
import { TabPanel, a11yProps } from '../components/TabPanel';
import CloseModal from "./CloseModal";
import RemoveVolunteerLine from "./RemoveVolunteerLine";
import AddVolunteerLine from "./AddVolunteerLine";
import { useFetch } from "../hooks/useFetch";
import { usePost } from "../hooks/usePost";

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    maxWidth: '1200px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const VolunteerMinistryModal = ({ open, handleClose, ministry, volunteers, changeAction, action, title, handleAssociateVolunteer, handleDisassociateVolunteer }) => {
    const [value, setValue] = React.useState(0);

    const associatedVolunteersFetch = useFetch(`volunteer-ministries/ministry/${ministry?.id}`);
    const notAssociatedVolunteersFetch = useFetch(`/volunteers/not-in-ministry/${ministry?.id}`);

    React.useEffect(() => {
        if (open) {
            associatedVolunteersFetch.fetch();
            notAssociatedVolunteersFetch.fetch();
        }
    }, [open]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={boxStyle}>
                <CloseModal onClose={handleClose} />
                <Tabs value={value} onChange={handleTabChange} aria-label="vinculo voluntarios">
                    <Tab label="Vinculados" {...a11yProps(0)} />
                    <Tab label="Sem vinculo" {...a11yProps(1)} />
                </Tabs>
                <Box sx={{ width: '100%' }}>
                    <TabPanel value={value} index={0}>
                        <Box sx={{ mb: 4 }}>
                            <TextField
                                label="Buscar voluntário"
                                variant="standard"
                                width="100%"
                            />
                        </Box>
                        <List sx={{ width: '100%', overflow: 'auto', maxHeight: 400, bgcolor: 'grey.200' }}>
                            {associatedVolunteersFetch.data && associatedVolunteersFetch.data?.volunteers.length > 0 ? (
                                associatedVolunteersFetch.data?.volunteers.map(volunteer => (
                                    <ListItem key={volunteer.id}>
                                        <RemoveVolunteerLine
                                            key={volunteer.id}
                                            volunteer={volunteer}
                                            removeVolunteer={null}
                                        />
                                    </ListItem>
                                ))
                            ) : (
                                <NotFoundItem entities="voluntários" />
                            )}
                        </List>
                    </TabPanel>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <TabPanel value={value} index={1}>
                        <Box sx={{ mb: 4 }}>
                            <TextField
                                label="Buscar voluntário"
                                variant="standard"
                                width="100%"
                            />
                        </Box>
                        <List sx={{ width: '100%', overflow: 'auto', maxHeight: 400, bgcolor: 'grey.200' }}>
                            {notAssociatedVolunteersFetch.data && notAssociatedVolunteersFetch.data?.volunteers.length > 0 ? (
                                notAssociatedVolunteersFetch.data?.volunteers.map(volunteer => (
                                    <ListItem key={volunteer.id}>
                                        <AddVolunteerLine
                                            key={volunteer.id}
                                            volunteer={volunteer}
                                            addVolunteer={null}
                                        />
                                    </ListItem>
                                ))
                            ) : (
                                <NotFoundItem entities="voluntários" />
                            )}
                        </List>
                    </TabPanel>
                </Box>
            </Box>
        </Modal>
    );
};

export default VolunteerMinistryModal;

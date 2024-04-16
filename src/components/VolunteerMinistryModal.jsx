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
import { usePut } from "../hooks/usePut";
import { enqueueSnackbar } from "notistack";
import { useDebounce } from "../hooks/useDebouce";
import VolunteerMinistryModalSkeleton from "./VolunteerMinistryModalSkeleton";

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    maxWidth: '1200px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const VolunteerMinistryModal = ({ open, handleClose, ministry }) => {
    const [value, setValue] = React.useState(0);
    const [associatedVolunteerName, setAssociatedVolunteerName] = React.useState('');

    const debouncedAssociatedVolunteerName = useDebounce(associatedVolunteerName, 500);

    const { post } = usePost();
    const { put } = usePut();

    const associatedVolunteersFetch = useFetch(`volunteer-ministries/ministry/${ministry?.id}?volunteerName=${associatedVolunteerName}`);
    const notAssociatedVolunteersFetch = useFetch(`/volunteers/not-in-ministry/${ministry?.id}`);

    React.useEffect(() => {
        if (open) {
            associatedVolunteersFetch.fetch();
            notAssociatedVolunteersFetch.fetch();
        }
    }, [open]);

    React.useEffect(() => {
        if (!open) {
            setAssociatedVolunteerName('');
        }
    }, [open]);

    React.useEffect(() => {
        associatedVolunteersFetch.fetch();
    }, [debouncedAssociatedVolunteerName])

    const handleAssociatedVolunteerNameChange = (event) => {
        setAssociatedVolunteerName(event.target.value);
    }

    const associateVolunteer = async (volunteer) => {
        try {
            const response = await post(`/volunteer-ministries/associate?volunteerId=${volunteer.id}&ministryId=${ministry.id}`);

            if (response.status === 204) {
                associatedVolunteersFetch.fetch();
                notAssociatedVolunteersFetch.fetch();
                enqueueSnackbar('Voluntário vinculado com sucesso', { variant: 'success' });
            }

        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || 'Erro ao vincular voluntário - VolunteerMinistryModal', { variant: 'error' });
        }
    }

    const disassociateVolunteer = async (volunteer) => {
        try {
            const response = await put(`/volunteer-ministries/disassociate?volunteerId=${volunteer.id}&ministryId=${ministry.id}`);

            if (response.status === 204) {
                notAssociatedVolunteersFetch.fetch();
                associatedVolunteersFetch.fetch();
                enqueueSnackbar('Voluntário desvinculado com sucesso', { variant: 'success' });
            }

        } catch (error) {
            enqueueSnackbar(error?.response.data?.message || 'Erro ao desvincular voluntário - VolunteerMinistryModal', { variant: 'error' })
        }
    }

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
                                fullWidth
                                onChange={handleAssociatedVolunteerNameChange}
                            />
                        </Box>
                        <List sx={{ width: '100%', overflow: 'auto', maxHeight: 400, bgcolor: 'grey.200' }}>
                            {associatedVolunteersFetch.loading ? <VolunteerMinistryModalSkeleton /> :
                                associatedVolunteersFetch.data && associatedVolunteersFetch.data?.volunteers.length > 0 ? (
                                    associatedVolunteersFetch.data?.volunteers.map(volunteer => (
                                        <ListItem key={volunteer.id}>
                                            <RemoveVolunteerLine
                                                key={volunteer.id}
                                                volunteer={volunteer}
                                                removeVolunteer={() => disassociateVolunteer(volunteer)}
                                            />
                                        </ListItem>
                                    ))
                                ) : (
                                    <NotFoundItem entities="voluntários com vinculo" />
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
                                fullWidth
                            />
                        </Box>
                        <List sx={{ width: '100%', overflow: 'auto', maxHeight: 400, bgcolor: 'grey.200' }}>
                            {notAssociatedVolunteersFetch.data && notAssociatedVolunteersFetch.data?.volunteers.length > 0 ? (
                                notAssociatedVolunteersFetch.data?.volunteers.map(volunteer => (
                                    <ListItem key={volunteer.id}>
                                        <AddVolunteerLine
                                            key={volunteer.id}
                                            volunteer={volunteer}
                                            addVolunteer={() => associateVolunteer(volunteer)}
                                        />
                                    </ListItem>
                                ))
                            ) : (
                                <NotFoundItem entities="voluntários sem vinculo" />
                            )}
                        </List>
                    </TabPanel>
                </Box>
            </Box>
        </Modal>
    );
};

export default VolunteerMinistryModal;

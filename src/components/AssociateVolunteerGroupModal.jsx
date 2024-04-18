import React from 'react';
import { Modal, Box, Tabs, Tab, List, ListItem, TextField } from '@mui/material';
import { TabPanel, a11yProps } from '../components/TabPanel';
import AddVolunteerLine from './AddVolunteerLine';
import RemoveVolunteerLine from './RemoveVolunteerLine';
import CloseModal from '../components/CloseModal'
import NotFoundItem from './NotFoundItem';
import VolunteerMinistryModalSkeleton from '../components/VolunteerMinistryModalSkeleton';
import { useFetch } from '../hooks/useFetch';
import { useSnackbar } from 'notistack';
import { usePost } from '../hooks/usePost';
import { usePut } from '../hooks/usePut';

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

const AssociateVolunteerGroupModal = ({ open, onClose, group, fetchGroups }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [value, setValue] = React.useState(0);

    const { post } = usePost();
    const { put } = usePut();

    const associatedVolunteersFetch = useFetch(`/volunteers/group/${group?.id}`);
    const notAssociatedVolunteersFetch = useFetch(`/volunteers/not-in-group`);

    React.useEffect(() => {
        if (open) {
            associatedVolunteersFetch.fetch();
            notAssociatedVolunteersFetch.fetch();
        }
    }, [open]);

    const handleAddVolunteer = async (volunteerId) => {
        try {
            const response = await post(`/groups/${group?.id}/associate?volunteerId=${volunteerId}`)

            if (response.status === 204) {
                enqueueSnackbar('Voluntário associado ao grupo', { variant: 'success' });
                fetchGroups();
                notAssociatedVolunteersFetch.fetch();
                associatedVolunteersFetch.fetch();
            }

        } catch (error) {
            if (error.response) {
                enqueueSnackbar(error.response.data.message || "Erro geral - AssociateVolunteerGroupModal", { variant: 'error' });
            }
        }
    };

    const handleRemoveVolunteer = async (volunteerId) => {
        try {
            const response = await put(`/groups/${group?.id}/disassociate?volunteerId=${volunteerId}`)
            if (response.status === 204) {
                enqueueSnackbar('Voluntário desassociado do grupo', { variant: 'success' });
                fetchGroups();
                associatedVolunteersFetch.fetch();
                notAssociatedVolunteersFetch.fetch();
            }

        } catch (error) {
            if (error.response) {
                enqueueSnackbar(error.response.data.message || "Erro geral - AssociateVolunteerGroupModal", { variant: 'error' });
            }
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={boxStyle}>
                <CloseModal onClose={onClose} />
                <Tabs value={value} onChange={handleChange} aria-label="volunteers tabs">
                    <Tab label="Associados" {...a11yProps(0)} />
                    <Tab label="Não Associados" {...a11yProps(1)} />
                </Tabs>
                <Box sx={{ width: '100%' }} >
                    <TabPanel value={value} index={0}>
                        <Box sx={{ mb: 4 }}>
                            <TextField
                                label="Buscar voluntário"
                                variant="standard"
                                fullWidth
                            />
                        </Box>
                        <List sx={{ width: '100%', overflow: 'auto', maxHeight: 370, minHeight: 370, bgcolor: 'grey.200' }}>
                            {associatedVolunteersFetch.loading ? <VolunteerMinistryModalSkeleton /> :
                                associatedVolunteersFetch.data?.volunteers?.length > 0 ? (
                                    associatedVolunteersFetch.data?.volunteers?.map(volunteer => (
                                        <ListItem key={volunteer.id}>
                                            <RemoveVolunteerLine
                                                key={volunteer.id}
                                                volunteer={volunteer}
                                                removeVolunteer={() => handleRemoveVolunteer(volunteer.id)}
                                            />
                                        </ListItem>
                                    ))
                                ) : (
                                    <NotFoundItem entities="voluntários" />
                                )}
                        </List>
                    </TabPanel>
                </Box>
                <Box sx={{ width: '100%' }} >
                    <TabPanel value={value} index={1}>
                        <Box sx={{ mb: 4 }}>
                            <TextField
                                label="Buscar voluntário"
                                variant="standard"
                                fullWidth
                            />
                        </Box>
                        <List sx={{ width: '100%', overflow: 'auto', maxHeight: 370, minHeight: 370, bgcolor: 'grey.200' }}>
                            {notAssociatedVolunteersFetch.loading ? <VolunteerMinistryModalSkeleton /> :
                                notAssociatedVolunteersFetch.data?.volunteers?.length > 0 ? (
                                    notAssociatedVolunteersFetch.data?.volunteers?.map(volunteer => (
                                        <ListItem key={volunteer.id}>
                                            <AddVolunteerLine
                                                key={volunteer.id}
                                                volunteer={volunteer}
                                                addVolunteer={() => handleAddVolunteer(volunteer.id)}
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

export default AssociateVolunteerGroupModal;
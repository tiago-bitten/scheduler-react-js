import React from 'react';
import { Modal, Box, Tabs, Tab } from '@mui/material';
import { TabPanel, a11yProps } from '../components/TabPanel';
import AddVolunteerLine from './AddVolunteerLine';
import RemoveVolunteerLine from './RemoveVolunteerLine';
import NotFoundItem from './NotFoundItem';
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
                <Tabs value={value} onChange={handleChange} aria-label="volunteers tabs">
                    <Tab label="Associados" {...a11yProps(0)} />
                    <Tab label="Não Associados" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    {!associatedVolunteersFetch.loading && associatedVolunteersFetch.data?.volunteers?.length > 0 ? (
                        associatedVolunteersFetch.data?.volunteers?.map(volunteer => (
                            <RemoveVolunteerLine
                                key={volunteer.id}
                                volunteer={volunteer}
                                removeVolunteer={() => handleRemoveVolunteer(volunteer.id)}
                            />
                        ))
                    ) : (
                        <NotFoundItem entities="voluntários" />
                    )}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box sx={{ width: '100%', overflow: 'auto', maxHeight: 400 }}>
                        {!notAssociatedVolunteersFetch.loading && notAssociatedVolunteersFetch.data?.volunteers?.length > 0 ? (
                            notAssociatedVolunteersFetch.data?.volunteers?.map(volunteer => (
                                <AddVolunteerLine
                                    key={volunteer.id}
                                    volunteer={volunteer}
                                    addVolunteer={() => handleAddVolunteer(volunteer.id)}
                                />
                            ))
                        ) : (
                            <NotFoundItem entities="voluntários" />
                        )}
                    </Box>
                </TabPanel>
            </Box>
        </Modal>
    );
};

export default AssociateVolunteerGroupModal;
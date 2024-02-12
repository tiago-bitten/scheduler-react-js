import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { usePost } from '../hooks/usePost';
import { Modal, Box } from '@mui/material';
import NotFoundItem from './NotFoundItem';
import AddVolunteerLine from './AddVolunteerLine';
import { useSnackbar } from 'notistack';

const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const AssociateVolunteerGroupModal = ({ open, onClose, group, fetchGroups }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { data, error, loading, fetch } = useFetch('/volunteers');
    const { post } = usePost();

    React.useEffect(() => {
        if (open) {
            fetch();
        }
    }, [fetch, open]);

    const handleAddVolunteer = async (volunteerId) => {
        try {
            const response = await post(`/groups/${group?.id}/associate?volunteerId=${volunteerId}`)

            if (response.status === 204) {
                enqueueSnackbar('Voluntário associado ao grupo', { variant: 'success' });
                fetchGroups();
                fetch();
            }

        } catch (error) {
            if (error.response) {
                enqueueSnackbar(error.response.data.message || "Erro geral - AssociateVolunteerGroupModal", { variant: 'error' });
            }
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles}>
                <h2 id="modal-modal-title">Associar voluntário ao grupo</h2>
                <p id="modal-modal-description">
                    {group?.name}
                </p>

                {!loading && data?.volunteers?.length > 0 ? (
                    data?.volunteers?.map(volunteer => (
                        <AddVolunteerLine
                            key={volunteer.id}
                            volunteer={volunteer}
                            addVolunter={() => handleAddVolunteer(volunteer.id)}
                        />
                    ))
                ) : (
                    <NotFoundItem entities="voluntários" />
                )}
            </Box>
        </Modal>
    );

}

export default AssociateVolunteerGroupModal;
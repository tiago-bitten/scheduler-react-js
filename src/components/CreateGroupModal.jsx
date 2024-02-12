import React from 'react';
import { Modal, Box, TextField } from '@mui/material';
import RoundButton from './RoundButton';
import { usePost } from '../hooks/usePost';
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

const CreateGroupModal = ({ open, onClose, fetchGroups, handleAssociateVolunteer }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { loading, post} = usePost();
    const [groupName, setGroupName] = React.useState('');

    const handleCreateGroup = async () => {
        try {
            const response = await post('/groups/create', { name: groupName });

            if (response.status === 201) {
                fetchGroups();
                onClose();
                handleAssociateVolunteer(response.data.group);
                enqueueSnackbar('Grupo criado, adicione os voluntários', { variant: 'success' });
            }

        } catch (error) {
            console.log(error)
            enqueueSnackbar(error.response?.data?.message || "Erro geral - CreateGroupModal", { variant: 'error' });
        }
    }

    const handleOnGroupNameChange = ({ target: { value } }) => {
        setGroupName(value)
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles}>
                <TextField
                    label="Nome do grupo"
                    fullWidth
                    margin="normal"
                    variant="standard"
                    value={groupName}
                    onChange={handleOnGroupNameChange}
                />
                <RoundButton value="CRIAR" onClick={handleCreateGroup} />
            </Box>
        </Modal>
    );
};

export default CreateGroupModal;
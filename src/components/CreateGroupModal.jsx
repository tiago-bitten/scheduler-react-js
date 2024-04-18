import React from 'react';
import { Modal, Box, TextField, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usePost } from '../hooks/usePost';
import { useSnackbar } from 'notistack';
import RoundButton from './RoundButton';
import CloseModal from './CloseModal';

const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const CreateGroupModal = ({ open, onClose, fetchGroups, handleAssociateVolunteer }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { post } = usePost();

    React.useEffect(() => {
        if (open) {
            formik.resetForm();
        }
    }, [open])

    const formik = useFormik({
        initialValues: {
            groupName: '',
        },
        validationSchema: Yup.object({
            groupName: Yup.string().required('O nome do grupo é obrigatório'),
        }),
        onSubmit: async (values) => {
            const payload = {
                name: values.groupName,
            };

            handleSubmit(payload);
        },
    });

    const handleSubmit = async (payload) => {
        try {
            const response = await post(`/groups/create`, payload);

            if (response.status === 201) {
                fetchGroups();
                onClose();
                handleAssociateVolunteer(response.data.group);
                enqueueSnackbar('Grupo criado, adicione os voluntários', { variant: 'success' });
            }
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || "Erro geral - CreateGroupModal", { variant: 'error' });
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles} component="form" onSubmit={formik.handleSubmit}>
                <CloseModal onClose={onClose} />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        Escolha o nome do grupo
                    </Typography>
                </Box>
                <TextField
                    id="groupName"
                    name="groupName"
                    label="Nome do grupo *"
                    variant="standard"
                    fullWidth
                    value={formik.values.groupName}
                    onChange={formik.handleChange}
                    error={formik.touched.groupName && Boolean(formik.errors.groupName)}
                    helperText={formik.touched.groupName && formik.errors.groupName}
                    autoComplete="off"
                />


                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <RoundButton type="submit" value="CRIAR" />
                </Box>
            </Box>
        </Modal>
    );
};

export default CreateGroupModal;

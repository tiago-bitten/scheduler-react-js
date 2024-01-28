import React from 'react';

import { Modal, Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import { useSnackbar } from './SnackBarProvider';
import DefaultInput from './DefaultInput';
import RoundButton from './RoundButton';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'space-between',
};

const CreateMinistryModal = ({ open, handleClose, getMinistries }) => {
    const [token] = React.useState(sessionStorage.getItem('token'));
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [color, setColor] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const enqueueSnackbar = useSnackbar();

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'grey'
                    }}
                >
                    <Close />
                </IconButton>
            </Box>
        </Modal>
    );
};

export default CreateMinistryModal;
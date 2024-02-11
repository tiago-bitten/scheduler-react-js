import React from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    maxWidth: '400px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
};

const buttonContainerStyle = {
    marginTop: 3,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
};

const ConfirmModal = ({ open, onClose, title, content, action }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                {title && (
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                )}
                <Typography variant="body1">{content}</Typography>
                <Box sx={buttonContainerStyle}>
                    <Button variant="outlined" onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" color="error" onClick={action}>Confirmar</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ConfirmModal;

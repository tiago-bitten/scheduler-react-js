import React from "react";
import { Modal, Box, Typography, TextField } from "@mui/material";
import RoundButton from "./RoundButton";
import VerificationCode from "./VerificationCode";

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

const ForgotPasswordModal = ({ open, onClose }) => {
    const [send, setSend] = React.useState(false);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Esqueci minha senha
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Insira seu e-mail para recuperar sua senha
                </Typography>
                <TextField
                    label="E-mail *"
                    variant="filled"
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <RoundButton value="ENVIAR" onClick={() => setSend(true)} />
                </Box>
                {send && <VerificationCode onCodeFilled={(code) => console.log('Código completo:', code)} />}
            </Box>
        </Modal>
    );
};

export default ForgotPasswordModal;
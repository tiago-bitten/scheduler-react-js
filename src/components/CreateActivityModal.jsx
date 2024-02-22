import React from "react";
import { Modal, Box, TextField, Typography, Grid, IconButton } from "@mui/material";
import RoundButton from "./RoundButton";
import CloseModal from "./CloseModal";
import AddIcon from '@mui/icons-material/Add';

const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    textAlign: "center",
};

const CreateActivityModal = ({ open, handleClose, ministry }) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={boxStyle}>
                <CloseModal onClose={handleClose} />
                <Typography variant="h6" sx={{ mb: 4 }}>Atividades</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <TextField
                            id="activity-name"
                            label="Nome da atividade"
                            variant="filled"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            id="activity-volunteers"
                            label="Total de voluntários"
                            variant="filled"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="add">
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <RoundButton value="CADASTRAR" />
                </Box>
            </Box>
        </Modal>
    );
};

export default CreateActivityModal;

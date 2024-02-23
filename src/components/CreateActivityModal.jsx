import React, { useState } from "react";
import { Modal, Box, TextField, Typography, Grid, IconButton } from "@mui/material";
import RoundButton from "./RoundButton";
import CloseModal from "./CloseModal";
import AddIcon from '@mui/icons-material/Add';
import ActivityLine from "./ActivityLine";
import { useFetch } from "../hooks/useFetch";
import { usePost } from "../hooks/usePost";
import { useSnackbar } from "notistack";
import { RepeatOneSharp } from "@mui/icons-material";

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
    const { enqueueSnackbar } = useSnackbar();
    const { data: activitiesFetch, fetch } = useFetch(`/activities/ministry/${ministry.id}`);
    const { loading, post } = usePost();
    const [activityName, setActivityName] = useState("");
    const [activityVolunteers, setActivityVolunteers] = useState(0);
    
    React.useEffect(() => {
        if (open) {
            fetch();
        }
    }, [ministry, open]);

    const handleCreateActivity = async () => {
        const payload = { name: activityName, totalVolunteers: activityVolunteers };

        try {
            const response = await post(`/activities/create?ministryId=${ministry?.id}`, payload);
            
            if (response.status === 201) {
                enqueueSnackbar('Atividade cadastrada com sucesso', { variant: 'success' });
                fetch();
                setActivityName("");
                setActivityVolunteers(0);
            }

        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || 'Error geral - CreateActivityModal', { variant: 'error' });
        }
    };

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
                            value={activityName}
                            onChange={(e) => setActivityName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            id="activity-volunteers"
                            label="Total de voluntários"
                            variant="filled"
                            fullWidth
                            type="number"
                            value={activityVolunteers}
                            onChange={(e) => setActivityVolunteers(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="add" onClick={handleCreateActivity}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 4 }}>
                    {activitiesFetch?.activities && activitiesFetch?.activities.length > 0 && activitiesFetch?.activities.map((activity) => (
                        <ActivityLine key={activity.id} activity={activity} />
                    ))}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <RoundButton value="SALVAR" />
                </Box>
            </Box>
        </Modal>
    );
};

export default CreateActivityModal;
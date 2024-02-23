import React from "react";
import { useSnackbar } from "notistack";
import { Box, Typography, Modal, IconButton } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import { useFetch } from "../hooks/useFetch";
import { usePost } from "../hooks/usePost";

const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    textAlign: "center",
};

const IndicateActivity = ({ open, handleClose, volunteer, ministry, schedule }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { data: activitiesFetch, fetch } = useFetch(`/activities/ministry/${ministry?.id}`);
    const { loading, post } = usePost();

    React.useEffect(() => {
        if (open) {
            fetch();
        }
    }, [ministry, open]);

    const handleIndicateActivity = async (activity) => {
        try {
            const response = await post(`/appointments/appoint?scheduleId=${schedule?.id}&volunteerId=${volunteer?.id}&ministryId=${ministry?.id}&activityId=${activity?.id}`);
            if (response.status === 204) {
                enqueueSnackbar(`Voluntário ${volunteer.name} indicado para a atividade ${activity.name}`, { variant: "success" });
            }
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || "Error geral - IndicateActivity", { variant: "error" });
            console.error(error);
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={boxStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Selecione uma atividade
                </Typography>
                {activitiesFetch?.activities.map((activity) => (
                    <Box>
                        {activity.name}
                        <IconButton onClick={() => handleIndicateActivity(activity)}>
                            <DoneIcon />
                        </IconButton>
                    </Box>
                ))}
            </Box>
        </Modal>
    );
}

export default IndicateActivity;
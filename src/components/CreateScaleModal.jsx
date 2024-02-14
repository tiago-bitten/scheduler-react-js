import React from "react";
import { Modal, Box, IconButton, Typography, TextField } from "@mui/material";
import { usePost } from "../hooks/usePost";
import { useSnackbar } from "notistack";
import RoundButton from "./RoundButton";

const boxStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const CreateScaleModal = ({ open, onClose, schedule, ministry, fetchAppointments }) => {
    const { post } = usePost();
    const { enqueueSnackbar } = useSnackbar();
    const [maxVolunteers, setMaxVolunteers] = React.useState(15);
    const [volunteers, setVolunteers] = React.useState([]);

    const appointAllVolunteers = async () => {
        volunteers.forEach(async volunteer => {
            try {
                await post(`/appointments/appoint?scheduleId=${schedule?.id}&volunteerId=${volunteer.id}&ministryId=${ministry?.id}`);
            } catch (error) {
                enqueueSnackbar(error.response?.data?.message || "Erro geral - CreateScaleModal", { variant: 'error' });
            }
        })

        fetchAppointments();
    }

    const handleCreateScale = async () => {
        try {
            const response = await post(`/scales/create?scheduleId=${schedule?.id}&ministryId=${ministry?.id}&maxVolunteers=${maxVolunteers}`)

            if (response.status === 201) {
                enqueueSnackbar('Escala criada com sucesso', { variant: 'success' });
                setVolunteers(response.data.volunteers);
            }

        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || "Erro geral - CreateScaleModal", { variant: 'error' });
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={boxStyles}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Criar escala do ministério {ministry?.name}
                </Typography>
                <TextField
                    label="Número de voluntários"
                    type="number"
                    variant="filled"
                    value={maxVolunteers}
                    onChange={(e) => setMaxVolunteers(e.target.value)}
                />

                {volunteers.length > 0 && (
                    <Box>
                        <Typography variant="h6" component="h2">
                            Voluntários
                        </Typography>
                        <Typography variant="body1" component="p">
                            {volunteers.map(volunteer => volunteer.name).join(', ')}
                        </Typography>
                        <RoundButton onClick={appointAllVolunteers} value="AGENDAR TODOS" />
                    </Box>
                )} :
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <RoundButton onClick={handleCreateScale} value="GERAR" />
                </Box>

            </Box>
        </Modal>
    );
}

export default CreateScaleModal;

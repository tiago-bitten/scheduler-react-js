import React from "react";
import { Box, Typography, Modal, TextField } from "@mui/material";
import RoundButton from "./RoundButton";
import { useFetch } from "../hooks/useFetch";

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

const GenerateScaleModal = ({ open, onClose, ministry }) => {
    const { data, error, loading: loadingActivities, fetch: fetchActivities } = useFetch(`/activities/ministry/${ministry?.id}`);
    const [totalVolunteers, setTotalVolunteers] = React.useState([]);

    React.useEffect(() => {
        if (open && data?.activities) {
            setTotalVolunteers(data.activities.map(activity => ({ id: activity.id, total: activity.defaultTotalVolunteers })));
        }
    }, [data?.activities, open]);

    React.useEffect(() => {
        if (open) {
            fetchActivities();
        }
    }, [ministry, open]);

    const handleTotalVolunteersChange = (event, id) => {
        const newTotalVolunteers = totalVolunteers.map(volunteer => {
            if (volunteer.id === id) {
                return { ...volunteer, total: Number(event.target.value) };
            }
            return volunteer;
        });
        setTotalVolunteers(newTotalVolunteers);
    }

    const handleGenerateScale = () => {
        console.log(totalVolunteers);
    }

    const defaultTotalVolunteersValue = (value) => {
        if (value === 0) {
            return '';
        }
        return value;
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={boxStyle}>
                {loadingActivities && <Typography>Carregando...</Typography>}
                {!loadingActivities && totalVolunteers.length > 0 && totalVolunteers.map((volunteer) => (
                    <Box key={volunteer.id}>
                        <TextField
                            id={`textfield${volunteer.id}`}
                            variant="filled"
                            value={data?.activities.find(activity => activity.id === volunteer.id)?.name || 'Erro interno'}
                            disabled
                            sx={{ mr: 2 }}
                        />
                        <TextField
                            id={`textfieldMAX${volunteer.id}`}
                            variant="filled"
                            value={defaultTotalVolunteersValue(volunteer.total)}
                            onChange={(event) => handleTotalVolunteersChange(event, volunteer.id)}
                            autoComplete="off"
                            type="number"
                        />
                    </Box>
                ))}
                {!loadingActivities && totalVolunteers.length === 0 && <Typography>Primeiro registre uma atividade antes de agendar o voluntário</Typography>}
                <RoundButton value="AGENDAR" onClick={handleGenerateScale} sx={{ mt: 2 }} />
            </Box>
        </Modal>
    );
};

export default GenerateScaleModal;

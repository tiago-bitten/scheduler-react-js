import React, { useState, useEffect } from "react";
import { Box, Typography, Modal } from "@mui/material";
import RoundButton from "./RoundButton";
import { useFetch } from "../hooks/useFetch";
import ActivityField from "./ActivityField";

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
    const { data, loading, fetch } = useFetch(`/activities/ministry/${ministry?.id}`);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        if (open) {
            fetch();
        }
    }, [ministry, open, fetch]);

    useEffect(() => {
        if (open && data?.activities) {
            setActivities(data.activities.map(activity => ({ id: activity.id, name: activity.name, total: activity.defaultTotalVolunteers })));
        }
    }, [data?.activities, open]);

    const handleTotalVolunteersChange = (event, id) => {
        const updatedActivities = activities.map(activity => {
            if (activity.id === id) {
                return { ...activity, total: Number(event.target.value) };
            }
            return activity;
        });
        setActivities(updatedActivities);
    };

    const handleGenerateScale = () => {
        console.log(activities);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...boxStyle, overflow: 'auto', maxHeight: '60vh' }}>
                {loading ? (
                    <Typography>Carregando...</Typography>
                ) : (
                    activities.map(activity => (
                        <ActivityField
                            key={activity.id}
                            activity={activity}
                            totalVolunteers={activity.total}
                            onTotalChange={(event) => handleTotalVolunteersChange(event, activity.id)}
                        />
                    ))
                )}
                {!loading && activities.length === 0 && (
                    <Typography>Primeiro registre uma atividade antes de agendar o voluntário</Typography>
                )}
                <RoundButton value="AGENDAR" onClick={handleGenerateScale} sx={{ mt: 2 }} />
            </Box>

        </Modal>
    );
};

export default GenerateScaleModal;
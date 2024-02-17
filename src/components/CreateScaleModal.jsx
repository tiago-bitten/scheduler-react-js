import React from "react";
import { Box, Typography, Modal, Grid } from "@mui/material";
import SwitchMinistry from "./SwitchMinistry";
import RoundButton from "./RoundButton";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '600px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'hidden'
};

const CreateScaleModal = ({ open, onClose, ministries, schedule }) => {
    const [selectedMinistries, setSelectedMinistries] = React.useState([]);

    const handleSelectMinistry = (ministry, isChecked, maxVolunteers) => {
        if (isChecked) {
            const updatedMinistries = selectedMinistries.filter(m => m.ministry.id !== ministry.id);
            setSelectedMinistries([...updatedMinistries, { ministry, maxVolunteers }]);
        } else {
            setSelectedMinistries(selectedMinistries.filter(m => m.ministry.id !== ministry.id));
        }
    }
    

    const handleGenerate = () => {
        console.log(selectedMinistries);
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h5" gutterBottom>
                    Selecione os ministérios
                </Typography>
                <Box sx={{ overflow: 'auto', maxHeight: 500 }}>
                    <Grid container spacing={2}>
                        {ministries.length > 0 ? (
                            ministries.map(ministry => (
                                <Grid item xs={12} sm={6} key={ministry.id}>
                                    <SwitchMinistry
                                        ministry={ministry}
                                        onSelect={handleSelectMinistry}
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="body2" gutterBottom>
                                Não há ministérios cadastrados
                            </Typography>
                        )}
                    </Grid>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <RoundButton value="GERAR" onClick={handleGenerate} />
                </Box>
            </Box>
        </Modal>
    );
}

export default CreateScaleModal;

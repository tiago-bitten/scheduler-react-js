// eslint-disable-next-line
import React from "react";
import { Box, Typography, Modal, Grid, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SwitchMinistry from "./SwitchMinistry";
import RoundButton from "./RoundButton";
import { usePost } from '../hooks/usePost';
import { useSnackbar } from 'notistack';

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
    const { enqueueSnackbar } = useSnackbar();
    const { loading, post } = usePost();
    const [selectedMinistries, setSelectedMinistries] = React.useState([]);

    const handleSelectMinistry = (ministry, isChecked, maxVolunteers) => {
        if (isChecked) {
            const updatedMinistries = selectedMinistries.filter(m => m.ministry.id !== ministry.id);
            setSelectedMinistries([...updatedMinistries, { ministry, maxVolunteers }]);
        } else {
            setSelectedMinistries(selectedMinistries.filter(m => m.ministry.id !== ministry.id));
        }
    }

    const handleGenerate = async () => {
        if (selectedMinistries.length === 0) {
            enqueueSnackbar("Selecione ao menos um ministério", { variant: 'warning' });
            return;
        }
        const ministryIdMaxVolunteers = selectedMinistries.reduce((acc, { ministry, maxVolunteers }) => {
            acc[ministry.id] = Number(maxVolunteers);
            return acc;
        }, {});

        const payload = {
            ministryIdMaxVolunteers
        };

        try {
            const response = await post(`/scales/create?scheduleId=${schedule?.id}`, payload);

            if (response.status === 201) {
                console.log(response.data);
            }
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || "Erro geral - CreateScaleModal", { variant: 'error' });
        }

    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
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

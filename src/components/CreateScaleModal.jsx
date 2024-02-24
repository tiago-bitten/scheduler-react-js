// eslint-disable-next-line
import React from "react";
import { Box, Typography, Modal, Grid, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SwitchMinistry from "./SwitchMinistry";
import RoundButton from "./RoundButton";
import { usePost } from '../hooks/usePost';
import { useSnackbar } from 'notistack';
import GeneratedScaleModal from './GeneratedScaleModal';
import MinistryBox from "./MinistryBox";
import GenerateScaleModal from "./GenerateScaleModal";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '700px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'hidden'
};

const CreateScaleModal = ({ open, onClose, ministries, schedule, fetchAppointments }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { loading, post } = usePost();

    const [ministry, setMinistry] = React.useState({});
    const [scale, setScale] = React.useState([]);
    const [openGeneratedScaleModal, setOpenGeneratedScaleModal] = React.useState(false);
    const [openGenerateScaleModal, setOpenGenerateScaleModal] = React.useState(false);

    const handleSelectMinistry = (ministry) => {
        setMinistry(ministry);
        setOpenGenerateScaleModal(true);
    }

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box sx={modalStyle}>
                    <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Selecione o ministério
                        </Typography>
                    </Box>
                    <Box sx={{ overflow: 'auto', maxHeight: 500 }}>
                        <Grid container spacing={2}>
                            {ministries.length > 0 ? (
                                ministries.map(ministry => (
                                    <Grid item xs={12} sm={6} key={ministry.id}>
                                        <MinistryBox
                                            name={ministry.name}
                                            color={ministry.color}
                                            onClick={() => handleSelectMinistry(ministry)}
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
                </Box>
            </Modal>
            <GenerateScaleModal
                open={openGenerateScaleModal}
                onClose={() => setOpenGenerateScaleModal(false)}
                ministry={ministry}
            />
            <GeneratedScaleModal
                open={openGeneratedScaleModal}
                onClose={() => setOpenGeneratedScaleModal(false)}
                scale={scale}
                schedule={schedule}
                fetchAppointments={fetchAppointments}
            />
        </>
    );
}

export default CreateScaleModal;

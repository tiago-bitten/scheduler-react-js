import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { useFetch } from '../hooks/useFetch';
import { useSnackbar } from 'notistack';
import MinistryCheckbox from './MinistryCheckbox';

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 6,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

const VolunteerAssociateMinistryModal = ({ open, onClose, volunteer, fetchVolunteers }) => {
    const { enqueueSnackbar } = useSnackbar();
    const userMinistriesFetch = useFetch(`/users/ministries`);

    React.useEffect(() => {
        if (open) {
            userMinistriesFetch.fetch();
        }
    }, [open]);

    const handleCheckboxChange = (ministryId) => (event) => {
        console.log(`Ministry ID: ${ministryId}, Checked: ${event.target.checked}`);
        fetchVolunteers();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={boxStyle}>
                <Typography variant='h4'>Associar voluntário a um ministério</Typography>

                {userMinistriesFetch.loading && <Typography>Carregando...</Typography>}
                {userMinistriesFetch.error && <Typography>Erro ao carregar ministérios</Typography>}
                {userMinistriesFetch.data && (
                    <Box sx={{ overflow: 'auto', maxHeight: 200, minHeight: 200 }}>
                        {!userMinistriesFetch.loading && userMinistriesFetch.data?.ministries?.map((ministry) => (
                            <MinistryCheckbox
                                key={ministry.id}
                                ministry={ministry}
                                checked={volunteer.ministries.includes(ministry.id)} // Assumindo que `volunteer.ministries` contém IDs de ministérios
                                onChange={handleCheckboxChange(ministry.id)}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

export default VolunteerAssociateMinistryModal;

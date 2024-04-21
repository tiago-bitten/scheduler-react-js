import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { useFetch } from '../hooks/useFetch';
import { useSnackbar } from 'notistack';
import CheckboxMinistry from './CheckboxMinistry';
import RoundBotton from './RoundButton';
import { usePost } from '../hooks/usePost';

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
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
    const postVolunteer = usePost();

    const [selectedMinistries, setSelectedMinistries] = React.useState([]);

    React.useEffect(() => {
        if (open) {
            userMinistriesFetch.fetch();
        }
    }, [open]);

    const handleToggle = (ministry) => {
        setSelectedMinistries((prevSelected) => {
            const isAlreadySelected = prevSelected.some((m) => m.id === ministry.id);
            if (isAlreadySelected) {
                return prevSelected.filter((m) => m.id !== ministry.id);
            }
            return [...prevSelected, ministry];
        });
    }

    const handleAssociate = async () => {
        try {
            if (selectedMinistries.length === 0) {
                enqueueSnackbar('Selecione ao menos um ministério', { variant: 'warning' });
                return;
            }

            const ministriesPromisses = selectedMinistries.map(async (ministry) => {
                await postVolunteer.post(`/volunteer-ministries/associate?volunteerId=${volunteer?.id}&ministryId=${ministry.id}`)
            });

            await Promise.all(ministriesPromisses);
            fetchVolunteers();
            enqueueSnackbar('Voluntário associado com sucesso', { variant: 'success' });
            onClose();

        } catch (error) {
            enqueueSnackbar(error.response.data.message || "Erro geral - VolunteerAssociateMinistryModal", { variant: 'error' });
  
        } finally {
            setSelectedMinistries([]);
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={boxStyle}>
                <Typography variant='h6' textAlign="center" gutterBottom sx={{ mb: 4, color: '#454545' }}>Associar voluntário a um ministério</Typography>

                {!userMinistriesFetch.loading && userMinistriesFetch.data && (
                    <Box sx={{ maxHeight: 350, overflowY: 'auto', mb: 6, backgroundColor: '#F3F3F3' }}>
                        {userMinistriesFetch.data.ministries.map((ministry) => (
                            <CheckboxMinistry
                                key={ministry.id}
                                ministry={ministry}
                                checked={selectedMinistries.some(m => m.id === ministry.id)}
                                onToggle={() => handleToggle(ministry)}
                            />
                        ))}
                    </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <RoundBotton value="ASSOCIAR" onClick={handleAssociate} />
                </Box>
            </Box>
        </Modal>
    );
};

export default VolunteerAssociateMinistryModal;

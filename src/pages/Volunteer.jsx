import React from 'react';
import Header from '../components/Header';
import RoundButton from '../components/RoundButton';
import NotFoundItem from '../components/NotFoundItem';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { useDelete } from '../hooks/useDelete';
import { useFetch } from '../hooks/useFetch';
import { Switch, TextField, Tooltip, IconButton, Typography, Grid, Box, Container } from '@mui/material';
import ConfirmModal from '../components/ConfirmModal';
import { useDebounce } from '../hooks/useDebouce';
import Pagination from '@mui/material/Pagination';
import CreateVolunteerModalV2 from '../components/CreateVolunteerModalV2';

import { useSnackbar } from 'notistack';

import VolunteerBox from '../components/VolunteerBox';
import CreateVolunteerModal from '../components/CreateVolunteerModal';
import VolunteerListSkeleton from '../components/VolunteerListSkeleton';
import EditVolunteerModal from '../components/EditVolunteerModal';

const Volunteer = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { deleteRequest } = useDelete();
    const [page, setPage] = React.useState(0);
    const [size, setSize] = React.useState(10);
    const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);
    const [selectedVolunteer, setSelectedVolunteer] = React.useState({});
    const [volunteerCompleteName, setVolunteerCompleteName] = React.useState('');
    const [ministryName, setMinistryName] = React.useState('');
    const [isLinkedToAnyMinistry, setIsLinkedToAnyMinistry] = React.useState(false);

    const debouncedVolunteerName = useDebounce(volunteerCompleteName, 500);
    const debouncedMinistryName = useDebounce(ministryName, 500);
    const debouncedIsLinkedToAnyMinistry = useDebounce(isLinkedToAnyMinistry, 120);

    const { data, error, loading, fetch } = useFetch(`/volunteers?volunteerName=${volunteerCompleteName.split(" ")[0]}&volunteerLastName=${volunteerCompleteName.split(" ")[1]}&ministryName=${ministryName}&isLinkedToAnyMinistry=${isLinkedToAnyMinistry}&page=${page}&size=${size}`);
    const [open, setOpen] = React.useState(false);
    const [openEditVolunteerModal, setOpenEditVolunteerModal] = React.useState(false);
    const [selectedEditVolunteer, setSelectedEditVolunteer] = React.useState({});

    React.useEffect(() => {
        document.title = 'Voluntários';
    }, []);

    React.useEffect(() => {
        setPage(0);
        setSize(10);
        fetch();
    }, [debouncedVolunteerName, debouncedMinistryName, debouncedIsLinkedToAnyMinistry]);

    React.useEffect(() => {
        fetch();
    }, [page, size]);

    const handleVolunteerNameChange = (event) => {
        setVolunteerCompleteName(event.target.value);
    };

    const handleMinistryNameChange = (event) => {
        setMinistryName(event.target.value);
    };

    const handleSwitchChange = (event) => {
        setIsLinkedToAnyMinistry(event.target.checked);
    };

    const handleSwitchChangeByLabel = () => {
        setIsLinkedToAnyMinistry(!isLinkedToAnyMinistry);
    }

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const copyAutocadastroLink = async () => {
        navigator.clipboard.writeText(`http://localhost:5173/voluntario/entrar`);
        enqueueSnackbar('Link de autocadastro copiado.', { variant: 'success' });
    };

    const handleDeleteClick = (volunteer) => {
        setSelectedVolunteer(volunteer);
        setConfirmModalOpen(true);
    }

    const handleEditClick = (volunteer) => {
        setSelectedEditVolunteer(volunteer);
        setOpenEditVolunteerModal(true);
    }

    const handleDeleteConfirm = async (id) => {
        try {
            const response = await deleteRequest(`/volunteers/${id}`);

            if (response.status === 204) {
                enqueueSnackbar('Voluntário removido com sucesso', { variant: 'success' });
                fetch();
            }

        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || "Erro geral", { variant: 'error' });
        } finally {
            setConfirmModalOpen(false);
        }
    }

    return (
        <>
            <Header />
            <Box sx={{ mt: 4, mx: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Voluntários"
                            variant="standard"
                            size="small"
                            value={volunteerCompleteName}
                            onChange={handleVolunteerNameChange}
                            sx={{ width: '300px' }}
                            autoComplete="off"
                        />

                        <TextField
                            label="Ministério"
                            variant="standard"
                            size="small"
                            value={ministryName}
                            onChange={handleMinistryNameChange}
                            sx={{ width: '300px' }}
                            autoComplete="off"
                        />
                    </Box>
                    <Box>
                        <RoundButton value="CADASTRAR VOLUNTÁRIO" onClick={handleClick} />
                        <Tooltip title="Copiar link de autocadastro" disableInteractive>
                            <IconButton onClick={copyAutocadastroLink} sx={{ ml: '5px' }}>
                                <AddLinkIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Box sx={{ mb: 4 }}>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                            <Switch
                                checked={isLinkedToAnyMinistry}
                                onChange={handleSwitchChange}
                                name="checked"
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: "#4169E1",
                                        '& + .MuiSwitch-track': {
                                            backgroundColor: "#4169E1",
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" sx={{ '&:hover': { cursor: 'pointer' } }} onClick={handleSwitchChangeByLabel}>
                                Vinculado a algum ministério
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                {loading && <VolunteerListSkeleton />}
                {!loading && data?.volunteers?.length === 0 ? (
                    <NotFoundItem entities="voluntários" />
                ) : (
                    <>
                        <Box sx={{ bgcolor: '#F3F3F3', p: 2, mb: 2 }}>
                            {data?.volunteers.map((volunteer) => (
                                <VolunteerBox
                                    key={volunteer.id}
                                    volunteer={volunteer}
                                    ministries={volunteer.ministries}
                                    handleDeleteClick={() => handleDeleteClick(volunteer)}
                                    handleEditClick={() => handleEditClick(volunteer)}
                                />
                            ))}
                        </Box>
                    </>
                )}
                <CreateVolunteerModalV2
                    open={open}
                    onClose={handleClose}
                    fetchVolunteers={fetch}
                />
                <EditVolunteerModal
                    open={openEditVolunteerModal}
                    onClose={() => setOpenEditVolunteerModal(false)}
                    volunteer={selectedEditVolunteer}
                    fetchVolunteers={fetch}
                />

                <ConfirmModal
                    open={confirmModalOpen}
                    onClose={() => setConfirmModalOpen(false)}
                    title="Remover voluntário"
                    content="Deseja realmente remover este voluntário? Esta ação não poderá ser desfeita."
                    action={() => handleDeleteConfirm(selectedVolunteer?.id)}
                />
            </Box>
        </>
    );
};

export default Volunteer;

import React from 'react';

import instance from '../config/axiosConfig';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { useDebounce } from '../hooks/useDebouce';
import RoundButton from '../components/RoundButton';
import MinistryLine from '../components/MinistryLine';
import CreateMinistryModal from '../components/CreateMinistryModal';
import VolunteerMinistryModal from '../components/VolunteerMinistryModal';
import NotFoundItem from '../components/NotFoundItem';
import EditMinistryModal from '../components/EditMinistryModal';
import { Box, Table, TableHead, TableRow, TableCell, TableBody, TextField } from '@mui/material';
import { useFetch } from '../hooks/useFetch';
import { useDelete } from '../hooks/useDelete';

import Header from '../components/Header';

const Ministries = () => {
    const { deleteRequest } = useDelete();
    const [token] = React.useState(sessionStorage.getItem('token'));
    const [ministries, setMinistries] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openVolunteerMinistryModal, setVolunteerMinistryModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [requestCompleted, setRequestCompleted] = React.useState(false);
    const [volunteerRequestCompleted, setVolunteerRequestCompleted] = React.useState(false);
    const [volunteers, setVolunteers] = React.useState([]);
    const [action, setAction] = React.useState('ADICIONAR');
    const [title, setTitle] = React.useState('Voluntários vinculados');
    const [ministryId, setMinistryId] = React.useState(null);
    const [selectedMinistry, setSelectedMinistry] = React.useState({});

    const [ministryName, setMinistryName] = React.useState('');
    const [volunteerName, setVolunteerName] = React.useState('');

    const debouncedMinistryName = useDebounce(ministryName, 500);
    const debouncedVolunteerName = useDebounce(volunteerName, 500);

    const { data, error, fetch: fetchMinistries } = useFetch(`/ministries?ministryName=${ministryName}&volunteerName=${volunteerName}`);

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    React.useEffect(() => {
        document.title = 'Ministérios';
    }, []);

    React.useEffect(() => {
        resetAction();
    }, [ministryId]);

    React.useEffect(() => {
        fetchMinistries();
    }, [fetchMinistries, debouncedMinistryName, debouncedVolunteerName]);

    const fetchVolunteerMinistry = async (ministryId) => {
        setVolunteerRequestCompleted(false);
        try {
            const response = await instance.get(`volunteer-ministries/ministry/${ministryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setVolunteers(response.data.volunteers);
                setVolunteerRequestCompleted(true);
            }

        } catch (err) {
            enqueueSnackbar(err.response.data.message || "Erro ao buscar voluntários", { variant: "error" });
        }
    }

    const fetchVolunteerNotInMinistry = async (ministryId) => {
        setVolunteerRequestCompleted(false);
        try {
            const response = await instance.get(`/volunteers/not-in-ministry/${ministryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setVolunteers(response.data.volunteers);
                setVolunteerRequestCompleted(true);
            }

        } catch (err) {
            enqueueSnackbar(err.response?.data?.message || "Erro ao buscar voluntários", { variant: "error" });
        }
    }

    const handleAssociateVolunteer = async (volunteerId) => {
        try {
            const response = await instance.post(`/volunteer-ministries/associate?volunteerId=${volunteerId}&ministryId=${ministryId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 204) {
                fetchVolunteerNotInMinistry(ministryId);
                enqueueSnackbar("Voluntário associado com sucesso ao ministério", { variant: "success" });
                fetchMinistries();
            }

        } catch (err) {
            enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
    }

    const handleDisassociateVolunteer = async (volunteerId) => {
        try {
            const response = await instance.put(`/volunteer-ministries/disassociate?volunteerId=${volunteerId}&ministryId=${ministryId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 204) {
                fetchVolunteerMinistry(ministryId);
                enqueueSnackbar("Voluntário desassociado com sucesso do ministério", { variant: "success" });
                fetchMinistries();
            }

        } catch (err) {
            enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
    }

    const handleMinistryNameChange = (event) => {
        setMinistryName(event.target.value);
    }

    const handleVolunteerNameChange = (event) => {
        setVolunteerName(event.target.value);
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleVolunteerMinistryModal = (_ministryId) => {
        setVolunteerMinistryModal(true);
        setMinistryId(_ministryId);
        resetAction();
        fetchVolunteerMinistry(_ministryId);
    }

    const handleCloseVolunteerMinistryModal = () => {
        setVolunteerMinistryModal(false);
    }

    const handleAction = () => {
        if (action === 'ADICIONAR') {
            setAction('LISTAR');
            setTitle('Voluntários não vinculados');
            setVolunteerRequestCompleted(false);
            fetchVolunteerNotInMinistry(ministryId);
        } else {
            setAction('ADICIONAR');
            setTitle('Voluntários vinculados');
            setVolunteerRequestCompleted(false);
            fetchVolunteerMinistry(ministryId);
        }
    }

    const resetAction = () => {
        setAction('ADICIONAR');
        setTitle('Voluntários vinculados');
    }

    const handleEditClick = (ministry) => {
        setSelectedMinistry(ministry);
        setOpenEditModal(true);
    }

    const v2handleOpenAssociateModal = (ministry) => {
        setSelectedMinistry(ministry);
        setVolunteerMinistryModal(true);
    }

    const handleDeteleClick = async (ministry) => {
        try {
            const response = await deleteRequest(`/ministries/delete/${ministry.id}`);

            if (response.status === 204) {
                fetchMinistries();
                enqueueSnackbar("Ministério excluído com sucesso", { variant: "success" });
            }

        } catch (error) {
            enqueueSnackbar(error.response?.data?.message, { variant: "error" });
            console.error(error);
        }
    }

    return (
        <>
            <Header />
            <Box sx={{ mt: 4, mx: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Ministério"
                            variant="standard"
                            size="small"
                            value={ministryName}
                            onChange={handleMinistryNameChange}
                            sx={{ width: '300px', mr: 2 }}
                            autoComplete="off"
                        />
                        <TextField
                            label="Voluntário"
                            variant="standard"
                            size="small"
                            value={volunteerName}
                            onChange={handleVolunteerNameChange}
                            sx={{ width: '300px' }}
                            autoComplete="off"
                        />
                    </Box>
                    <Box>
                        <RoundButton value="CRIAR MINISTÉRIO" onClick={handleClick} />

                    </Box>
                </Box>
                {data && data.ministries.length > 0 ? (
                    <Box sx={{ bgcolor: '#F3F3F3', p: 2, mb: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ width: '25%', pr: 10 }}>Nome</TableCell>
                                    <TableCell align="left">Descrição</TableCell>
                                    <TableCell align="right" sx={{ width: '25%', textAlign: 'right' }}>Voluntários</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.ministries.map((ministry) => (
                                    <MinistryLine
                                        key={ministry.id}
                                        ministry={ministry}
                                        handleEdit={() => handleEditClick(ministry)}
                                        handleDelete={() => handleDeteleClick(ministry)}
                                        onMinistryNameClick={() => v2handleOpenAssociateModal(ministry)}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                ) : (
                    <NotFoundItem entities="ministérios" />
                )}
            </Box>
            <CreateMinistryModal
                open={open}
                handleClose={handleClose}
                fetchMinistries={fetchMinistries}
            />
            <VolunteerMinistryModal
                open={openVolunteerMinistryModal}
                handleClose={handleCloseVolunteerMinistryModal}
                ministry={selectedMinistry}
                volunteers={volunteers}
                changeAction={handleAction}
                action={action}
                title={title}
                handleAssociateVolunteer={handleAssociateVolunteer}
                handleDisassociateVolunteer={handleDisassociateVolunteer}
                volunteerRequestCompleted={volunteerRequestCompleted}
            />
            <EditMinistryModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                ministry={selectedMinistry}
                fetchMinistries={fetchMinistries}
            />
        </>
    );
};

export default Ministries;
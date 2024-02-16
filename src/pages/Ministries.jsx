import React from 'react';

import instance from '../config/axiosConfig';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { useDebounce } from '../hooks/useDebouce';
import RoundButton from '../components/RoundButton';
import MinistryLine from '../components/MinistryLine';
import CreateMinistryModal from '../components/CreateMinistryModal';
import VolunteerMinistryModal from '../components/VolunteerMinistryModal';
import MinistriesSkeleton from '../components/MinistriesSkeleton';
import NotFoundItem from '../components/NotFoundItem';
import EditMinistryModal from '../components/EditMinistryModal';
import { TextField } from '@mui/material';
import { useFetch } from '../hooks/useFetch';

import Header from '../components/Header';

const Ministries = () => {
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
    }, [debouncedMinistryName, debouncedVolunteerName]);

    const getMinistries = async () => {
        try {
            const response = await instance.get('/ministries', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setMinistries(response.data.ministries);
            }

        } catch (err) {
            enqueueSnackbar(err.response?.data?.message || 'Erro ao buscar ministérios', { variant: 'error' });
        }
    };

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
                getMinistries();
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
                getMinistries();
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

    return (
        <>
            <Header />
            <div className="flex justify-between items-center mt-16 mx-12">
                <div className="flex flex-1 gap-4">
                    <TextField
                        label="Ministério"
                        variant="standard"
                        size="small"
                        fullWidth
                        value={ministryName}
                        onChange={handleMinistryNameChange}
                        autoComplete="off"
                        sx={{ width: '300px' }}
                    />

                    <TextField
                        label="Voluntário"
                        variant="standard"
                        size="small"
                        fullWidth
                        value={volunteerName}
                        onChange={handleVolunteerNameChange}
                        autoComplete="off"
                        sx={{ width: '300px' }}
                    />
                </div>
                <div>
                    <RoundButton value="CRIAR MINISTÉRIO" onClick={handleClick} />
                </div>
            </div>
            <div className="bg-septenary p-4 mx-12 mt-12">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="w-1/4 font-normal text-center px-4 py-2 text-quinary">Nome</th>
                            <th className="w-2/4 font-normal text-left px-10 py-2 text-quinary">Descrição</th>
                            <th className="text-center font-normal px-4 py-2 text-quinary">Voluntários</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.ministries.length > 0 ? (
                            data?.ministries.map((ministry) => (
                                <MinistryLine
                                    key={ministry.id}
                                    ministry={ministry}
                                    onMinistryNameClick={() => handleVolunteerMinistryModal(ministry.id)}
                                    handleEdit={() => handleEditClick(ministry)}
                                />
                            ))
                        ) : (
                            <NotFoundItem entities="ministérios" />
                        )}
                    </tbody>
                </table>
            </div>
            <CreateMinistryModal
                open={open}
                handleClose={handleClose}
                getMinistries={getMinistries}
            />
            <VolunteerMinistryModal
                open={openVolunteerMinistryModal}
                handleClose={handleCloseVolunteerMinistryModal}
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
                fetchMinistries={getMinistries}
            />
        </>
    );
};

export default Ministries;
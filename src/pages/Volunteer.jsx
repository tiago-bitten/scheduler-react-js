import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import DefaultInput from '../components/DefaultInput';
import RoundButton from '../components/RoundButton';
import Switch from '@mui/material/Switch';
import NotFoundItem from '../components/NotFoundItem';
import IconButton from '@mui/material/IconButton';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { useDelete } from '../hooks/useDelete';
import { useFetch } from '../hooks/useFetch';
import { TextField, Tooltip } from '@mui/material';
import ConfirmModal from '../components/ConfirmModal';
import { useDebounce } from '../hooks/useDebouce';

import { useSnackbar } from 'notistack';

import VolunteerBox from '../components/VolunteerBox';
import CreateVolunteerModal from '../components/CreateVolunteerModal';
import VolunteerListSkeleton from '../components/VolunteerListSkeleton';

const Volunteer = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { deleteRequest } = useDelete();
    const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);
    const [selectedVolunteer, setSelectedVolunteer] = React.useState({});
    const [volunteerName, setVolunteerName] = React.useState('');
    const [ministryName, setMinistryName] = React.useState('');
    const [isLinkedToAnyMinistry, setIsLinkedToAnyMinistry] = React.useState(false);

    const debouncedVolunteerName = useDebounce(volunteerName, 500);
    const debouncedMinistryName = useDebounce(ministryName, 500);
    const debouncedIsLinkedToAnyMinistry = useDebounce(isLinkedToAnyMinistry, 120);
    
    const { data, error, loading, fetch } = useFetch(`/volunteers?volunteerName=${volunteerName}&ministryName=${ministryName}&isLinkedToAnyMinistry=${isLinkedToAnyMinistry}`);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        document.title = 'Voluntários';
    }, []);

    React.useEffect(() => {
        fetch();
    }, [debouncedVolunteerName, debouncedMinistryName, debouncedIsLinkedToAnyMinistry]);

    const handleVolunteerNameChange = (event) => {
        setVolunteerName(event.target.value);
    };

    const handleMinistryNameChange = (event) => {
        setMinistryName(event.target.value);
    };

    const handleSwitchChange = (event) => {
        setIsLinkedToAnyMinistry(event.target.checked);
    };

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
            <div className="flex justify-between items-center mt-16 mx-12">
                <div className="flex flex-1 gap-4">
                    <TextField
                        label="Voluntários"
                        variant="standard"
                        size="small"
                        value={volunteerName}
                        onChange={handleVolunteerNameChange}
                        sx={{ width: '300px' }}
                    />

                    <TextField
                        label="Ministério"
                        variant="standard"
                        size="small"
                        value={ministryName}
                        onChange={handleMinistryNameChange}
                        sx={{ width: '300px' }}
                    />
                </div>
                <div>
                    <RoundButton value="CADASTRAR VOLUNTÁRIO" onClick={handleClick} />
                    <Tooltip title="Copiar link de autocadastro" arrow>
                        <IconButton onClick={copyAutocadastroLink} sx={{ ml: '5px' }}>
                            <AddLinkIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className="ml-10 mt-4">
                <Switch
                    checked={isLinkedToAnyMinistry}
                    onChange={handleSwitchChange}
                    name="checked"
                    color="primary"
                />
                <span className="text-quinary">Apenas voluntários com ministérios</span>
            </div>
            {!loading && data?.volunteers?.length === 0 ? (
                <NotFoundItem entities="voluntários" />
            ) : (
                <div className="bg-septenary p-4 mx-12 mt-12">
                    {data?.volunteers.map((volunteer) => (
                        <VolunteerBox
                            key={volunteer.id}
                            volunteer={volunteer}
                            ministries={volunteer.ministries}
                            handleDeleteClick={() => handleDeleteClick(volunteer)}
                        />
                    ))}
                </div>
            )}
            <CreateVolunteerModal
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                fetch={fetch}
            />
            <ConfirmModal
                open={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                title="Remover voluntário"
                content="Deseja realmente remover este voluntário? Esta ação não poderá ser desfeita."
                action={() => handleDeleteConfirm(selectedVolunteer?.id)}
            />
        </>
    );
};

export default Volunteer;

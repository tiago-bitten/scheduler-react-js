import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import DefaultInput from '../components/DefaultInput';
import RoundButton from '../components/RoundButton';
import Switch from '@mui/material/Switch';
import { SearchOff } from '@mui/icons-material';

import instance from '../config/axiosConfig';
import { useSnackbar } from 'notistack';

import VolunteerBox from '../components/VolunteerBox';
import CreateVolunteerModal from '../components/CreateVolunteerModal';
import VolunteerListSkeleton from '../components/VolunteerListSkeleton';

const Volunteer = () => {
    const navigate = useNavigate();
    const [token] = React.useState(sessionStorage.getItem('token'));
    const [loading, setLoading] = React.useState(true);
    const [checked, setChecked] = React.useState(false);
    const [volunteers, setVolunteers] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [requestCompleted, setRequestCompleted] = React.useState(false);

    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        if (!token) {
            navigate('/entrar');
            enqueueSnackbar('Você precisa estar logado para acessar essa página.');
            return;
        }

        const fetchVolunteers = async () => {
            try {
                const response = await instance.get('/volunteers', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setVolunteers(response.data.volunteers);
            } catch (err) {
                enqueueSnackbar(err.response?.data?.message || 'Erro ao buscar voluntários', { variant: 'error' });
            } finally {
                setLoading(false);
                setRequestCompleted(true);
            }
        };

        fetchVolunteers();
    }, [token, navigate, enqueueSnackbar]);

    const getVolunteers = async () => {
        try {
            const response = await instance.get('/volunteers', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setVolunteers(response.data.volunteers);
            }

        } catch (err) {
            enqueueSnackbar(err.response?.data?.message || 'Erro ao buscar voluntários', { variant: 'error' });
        }
    };

    const handleSwitchChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    if (loading) {
        return <VolunteerListSkeleton />
    }

    return (
        <>
            <Header />
            <div className="flex justify-between items-center mt-16 mx-12">
                <div className="flex flex-1 gap-4">
                    <DefaultInput label="Voluntários" id="voluntarios" />
                    <DefaultInput label="Ministérios" id="ministerios" />
                </div>
                <div>
                    <RoundButton value="CADASTRAR VOLUNTÁRIO" onClick={handleClick} />
                </div>
            </div>
            <div className="ml-10 mt-4">
                <Switch
                    checked={checked}
                    onChange={handleSwitchChange}
                    name="checked"
                    color="primary"
                />
                <span className="text-quinary">Apenas voluntários com ministérios</span>
            </div>
            {requestCompleted && volunteers.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-16">
                    <SearchOff style={{ fontSize: 76, color: '#A0B4F0' }} />
                    <p className="text-tertiary text-lg mt-2">Não existem voluntários cadastrados</p>
                </div>
            ) : (
                <div className="bg-septenary p-4 mx-12 mt-12">
                    {volunteers.map((volunteer) => (
                        <VolunteerBox key={volunteer.id} name={volunteer.name} lastName={volunteer.lastName} ministries={volunteer.ministries} />
                    ))}
                </div>
            )}
            <CreateVolunteerModal open={open} setOpen={setOpen} handleClose={handleClose} getVolunteers={getVolunteers} />
        </>
    );
};

export default Volunteer;

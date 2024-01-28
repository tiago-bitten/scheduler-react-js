import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import DefaultInput from '../components/DefaultInput';
import RoundButton from '../components/RoundButton';
import Switch from '@mui/material/Switch';

import instance from '../config/axiosConfig'
import { useSnackbar } from '../components/SnackBarProvider';

import VolunteerBox from '../components/VolunteerBox';

const Volunteer = () => {
    const navigate = useNavigate();
    const [token] = React.useState(sessionStorage.getItem('token'));
    const [checked, setChecked] = React.useState(false);
    const [volunteers, setVolunteers] = React.useState([]);

    const enqueueSnackbar = useSnackbar();

    React.useEffect(() => {
        const getVolunteers = async () => {
            try {
                const response = await instance.get('/volunteers' ,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (response.status === 200) {
                    setVolunteers(response.data.volunteers);
                }

            } catch (err) {
                enqueueSnackbar(err.response.data.message);
            }
        }

        getVolunteers();
    }, []);

    React.useEffect(() => {
        if (!token) {
            navigate('/login');
            enqueueSnackbar('Você precisa estar logado para acessar essa página!');
        }
    }, [token, navigate]);

    const handleSwitchChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <>
            <Header />
            <div className="flex justify-between items-center mt-16 mx-12">
                <div className="flex flex-col gap-4 w-full max-w-md">
                    <div className="flex gap-4">
                        <DefaultInput label="Voluntários" id="voluntarios" />
                        <DefaultInput label="Ministérios" id="ministerios" />
                    </div>
                </div>
                <div>
                    <RoundButton value="CADASTRAR VOLUNTÁRIO" />
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
            <div className="bg-septenary p-4 mx-12 mt-12">
            {volunteers.length > 0 ? (
                volunteers.map((volunteer) => (
                    <VolunteerBox key={volunteer.id} name={volunteer.name} lastName={volunteer.lastName} ministries={volunteer.ministries} />
                ))
            ) : (
                <p>Não há voluntários para exibir.</p>
            )}
        </div>
        </>
    );
};

export default Volunteer;

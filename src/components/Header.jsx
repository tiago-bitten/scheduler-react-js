import React from 'react';
import { Person, Notifications } from '@mui/icons-material';
import { Badge } from '@mui/material';
import NacoesImg from '../assets/melhorada.png';

import { useNavigate } from 'react-router-dom';
import instance from '../config/axiosConfig';

const liClass = "px-3 rounded-lg mx-6 cursor-pointer text-xl transition-colors duration-300 hover:bg-secondary";

const Header = () => {
    const [token] = React.useState(sessionStorage.getItem('token'));
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [usersCount, setUsersCount] = React.useState(0);

    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await instance.get('/users/approve', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setUsersCount(response.data.users.length);
                }
            } catch (err) {
                if(err.response?.status === 401) {
                    navigate('/login');
                }
            }
        }

        fetchUsers();
    }, [usersCount]);

    const navigate = useNavigate();

    const handleMinistries = () => {
        navigate('/ministerios');
    }

    const handleVolunteers = () => {
        navigate('/voluntarios');
    }	

    const handleAgendas = () => {
        navigate('/agendas');
    }

    const handleNotifications = () => {
        navigate('/aprovar-contas');
    }

    return (
        <div className="bg-primary flex justify-between items-center w-full text-white" style={{ height: '80px' }}>
            <div className="flex items-center">
                <img src={NacoesImg} alt="Nacoes" className="w-24 h-24 ml-4" />
                <nav>
                    <ul className="flex">
                        <li className={liClass} onClick={handleVolunteers}>Voluntários</li>
                        <li className={liClass} onClick={handleMinistries}>Ministérios</li>
                        <li className={liClass} onClick={handleAgendas}>Agendas</li>
                    </ul>
                </nav>
            </div>
            <div className="flex items-center">
                {user?.isSuperUser && 
                    <div className="text-white mr-12">
                    <Badge badgeContent={usersCount} color="error" max={99}>
                        <Notifications onClick={handleNotifications} />
                    </Badge>
                </div>}
                <Person className="text-white mr-12" />
            </div>
        </div>
    );
};

export default Header;

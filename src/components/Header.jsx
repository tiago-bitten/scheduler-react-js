import React from 'react';
import { Home, Person, Notifications } from '@mui/icons-material';
import NacoesImg from '../assets/melhorada.png';

import { useNavigate } from 'react-router-dom';

const liClass = "px-3 rounded-lg mx-6 cursor-pointer text-xl transition-colors duration-300 hover:bg-secondary";

const Header = () => {
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
                <Notifications className="text-white mr-12" />
                <Person className="text-white mr-12" />
            </div>
        </div>
    );
};

export default Header;

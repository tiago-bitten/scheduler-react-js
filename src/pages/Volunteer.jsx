import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../components/SnackBarProvider';

import Header from '../components/Header';

const Volunteer = () => {
    const navigate = useNavigate();
    const [token] = React.useState(sessionStorage.getItem('token'));

    React.useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);


    return (
        <>
            <Header />
            <div className="flex flex-col justify-center items-center w-full">
                <h1 className="text-4xl text-center mb-10 text-quinary">Bem-vindo</h1>
                <div className="mb-10">
                    <h1 className="text-2xl text-center mb-10 text-quinary">Volunteer</h1>
                </div>
            </div>
        </>
    );
};

export default Volunteer;

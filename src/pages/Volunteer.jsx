import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Button } from '@mui/material';

const Volunteer = () => {
    const navigate = useNavigate();
    const [token] = useState(sessionStorage.getItem('token'));
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification(false);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <Button variant="contained" onClick={() => setNotification(true)}>
                Mostrar Notificação
            </Button>
            <Snackbar
                open={notification}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Notificação do voluntário"
            />
        </div>
    );
};

export default Volunteer;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Button } from '@mui/material';

const Volunteer = () => {
    const navigate = useNavigate();
    const [token] = React.useState(sessionStorage.getItem('token'));
    const [notification, setNotification] = React.useState(false);
    const [notificationMessage, setNotificationMessage] = React.useState('');

    React.useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification(false);
        setNotificationMessage('');
    };

    return (
        <div>
            <h1>Volunteer</h1>
        </div>
    );
};

export default Volunteer;

import React from 'react';
import LoginRightCard from '../components/LoginRightCard';
import LoginLeftCard from '../components/LoginLeftCard';
import { Box } from '@mui/material';

const Login = () => {
    React.useEffect(() => {
        document.title = 'Entrar';
    }, []);

    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#4169E1',
            boxShadow: 1,
        }}>
            <Box sx={{
                bgcolor: '#A0B4F0', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 450,
                height: 550,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8
            }}>
                <LoginLeftCard />
            </Box>
            <Box sx={{
                bgcolor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 450,
                height: 550,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8
            }}>
                <LoginRightCard />
            </Box>
        </Box>
    );
};

export default Login;

import React from 'react';
import { Box, Typography } from '@mui/material';
import perdeu from '../assets/perdeu.webp';

const NotFound = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            background: '#4169E1',
            margin: 0, 
            padding: 0, 
            overflow: 'hidden' 
        }}>
            <img src={perdeu} alt="Página não encontrada" style={{ width: '24rem', height: '24rem' }} />
            <Box>
                <Typography variant="h3" sx={{ color: 'white', textAlign: 'left' }}>Ops...</Typography>
                <Typography variant="h3" sx={{ color: 'white', textAlign: 'center', fontSize: '1.5rem' }}>Página não encontrada</Typography>
            </Box>
        </Box>
    );
}

export default NotFound;

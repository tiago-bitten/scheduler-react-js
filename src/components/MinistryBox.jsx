import React from 'react';
import { Box, Typography } from '@mui/material';

const MinistryBox = ({ name, color, onClick }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 270,
                height: 55,
                backgroundColor: color,
                borderRadius: '12px',
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.55)',
                }
            }}
            onClick={onClick}
        >
            <Typography variant="body1" color="white">
                {name}
            </Typography>
        </Box>
    );
};

export default MinistryBox;

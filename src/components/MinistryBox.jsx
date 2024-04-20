import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

const MinistryBox = ({ name, color, onClick }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleMouseDown = () => {
        setIsPressed(true);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
    };

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
                transform: isPressed ? 'scale(0.96)' : 'scale(1)',
                transition: 'transform 0.1s ease-in-out',
                '&:hover': {
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.55)',
                }
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={onClick}
        >
            <Typography variant="body1" color="white">
                {name}
            </Typography>
        </Box>
    );
};

export default MinistryBox;

import React from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = ({ onClick }) => {
    return (
        <button onClick={onClick}>
            <ArrowBackIcon />
        </button>
    );
};

export default BackButton;

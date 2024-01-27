import React from 'react';

import { CheckCircleOutlineOutlined } from '@mui/icons-material';

const CreateAccountLeftCardFinished = () => {

    return (
        <div>
            <div className="border-t-4 border-senary" style={{ width: '100%' }}>
                <h1 className="text-3xl mt-4 text-center text-quinary">Dados cadastrais</h1>
            </div>
            <div className="flex flex-col mt-28 items-center w-full">
                <CheckCircleOutlineOutlined sx={{ fontSize: 100, color: '#A0B4F0' }} />
            </div>
        </div>
    );
};

export default CreateAccountLeftCardFinished;
import React from 'react';

import { LockOutlined } from '@mui/icons-material';

const CreateAccountRightCardWait = () => {

    return (
        <div>
            <div className="border-t-4 border-senary" style={{ width: '100%' }}>
                <h1 className="text-3xl mt-4 text-center text-senary">Perfil de acesso</h1>
            </div>
            <div className="flex flex-col mt-20 items-center w-full">
                <LockOutlined sx={{ fontSize: 100, color: '#A0B4F0' }} />
                <span className="text-tertiary mt-4" style={{ fontStyle: 'italic' }} >Conclua o preenchimento dos dados para prosseguir</span>
            </div>
        </div>
    );
};
// A0B4F0
export default CreateAccountRightCardWait;
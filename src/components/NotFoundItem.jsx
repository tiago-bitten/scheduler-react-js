import React from "react";

import { SearchOff } from '@mui/icons-material';

const NotFoundItem = ({ entities }) => {

    return (
        <div className="flex flex-col items-center justify-center my-4">
            <SearchOff style={{ fontSize: 76, color: '#A0B4F0' }} />
            <p className="text-tertiary text-lg mt-2">Não foram encontrados {entities}</p>
        </div>
    );
};

export default NotFoundItem;
import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const VolunteerBox = ({ name, lastName, ministries }) => {
    const avatarBorderClass = ministries.length > 0 ? 'border-2 border-primary' : 'border-2 border-quinary';

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
                <img
                    src="https://thispersondoesnotexist.com/"
                    alt={name}
                    className={`w-16 h-16 rounded-full mr-4 ${avatarBorderClass}`}
                />
                <div>
                    <p className="text-xl text-quinary">{name} {lastName}</p>
                    <p className="text-sm font-semibold text-primary">
                        {ministries.map((ministry) => ministry.name).join(' | ')}
                    </p>
                </div>
            </div>
            <div className="flex items-center">
                <Tooltip title="Editar">
                    <IconButton>
                        <Edit className="cursor-pointer text-quinary mx-2" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                    <IconButton>
                        <Delete className="cursor-pointer text-quinary" />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
};

export default VolunteerBox;

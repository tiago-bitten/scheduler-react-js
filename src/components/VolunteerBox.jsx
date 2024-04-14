import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import ConfirmModal from './ConfirmModal';
import Avatar from '@mui/material/Avatar';

const VolunteerBox = ({ volunteer, ministries, handleDeleteClick }) => {
    const avatarBorderClass = ministries.length > 0 ? { border: 2, borderColor: '#4169E1' } : { border: 2, borderColor: '#454545' };

    return (
        <>
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center">
                <Avatar sx={{ height: 54, width: 54, mr: 2, border: 2, ...avatarBorderClass }} />
                    <div>
                        <p className="text-xl text-quinary">{volunteer.name} {volunteer.lastName}</p>
                        <p className="text-sm font-semibold text-primary">
                            {ministries.map((ministry) => ministry.name).join(' | ')}
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Tooltip title="Editar">
                        <IconButton>
                            <Edit className="cursor-pointer mx-2" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <IconButton onClick={handleDeleteClick}>
                            <Delete className="cursor-pointer" />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </>
    );
};

export default VolunteerBox;

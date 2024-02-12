import React from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import MinistryBox from './MinistryBox';

const MinistryLine = ({ ministry, onMinistryNameClick, handleEdit }) => {
    return (
        <tr className="border-b">
            <td className="text-center p-2">
                <MinistryBox name={ministry.name} color={ministry.color} onClick={onMinistryNameClick} />
            </td>
            <td className="text-left p-10">{ministry.description}</td>
            <td className="text-center font-bold text-quinary p-10 hover:underline cursor-pointer" onClick={onMinistryNameClick}>{ministry.totalVolunteers}</td>
            <td className="text-right p-4">
                <Tooltip title="Editar">
                    <IconButton onClick={handleEdit}>
                        <Edit className="cursor-pointer mx-2" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                    <IconButton>
                        <Delete className="cursor-pointer" />
                    </IconButton>
                </Tooltip>
            </td>
        </tr>
    );
};

export default MinistryLine;

import React from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { IconButton, Tooltip, TableRow, TableCell } from '@mui/material';

import MinistryBox from './MinistryBox';

const MinistryLine = ({ ministry, onMinistryNameClick, handleEdit }) => {
    return (
        <TableRow>
            <TableCell align="center">
                <MinistryBox name={ministry.name} color={ministry.color} onClick={onMinistryNameClick} />
            </TableCell>
            <TableCell sx={{ fontSize: '1rem' }}>{ministry.description}</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', color: '#454545', '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }} onClick={onMinistryNameClick}>
                {ministry.totalVolunteers}
            </TableCell>
            <TableCell align="right">
                <Tooltip title="Editar">
                    <IconButton onClick={handleEdit}>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                    <IconButton>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};

export default MinistryLine;

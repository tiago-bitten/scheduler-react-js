import React from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmModal from './ConfirmModal';

const GroupLine = ({ openConfirm, onCloseConfirm, group, handleAssociateVolunteer, handleDeleteClick, handleDeleteConfirm }) => {

    return (
        <>
            <Box sx={{ backgroundColor: '#D9D9D9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, borderRadius: 3, marginBottom: 2 }}>
                <Box>
                    <Typography variant="h6">{group.name}</Typography>
                    <Typography variant="subtitle1">
                        {group.volunteers.length > 0
                            ? `Integrantes: ${group.volunteers.map(volunteer => volunteer.name).join(', ')}`
                            : 'Sem integrantes'}
                    </Typography>
                </Box>
                <Box>
                    <Tooltip title="Editar">
                        <IconButton onClick={handleAssociateVolunteer}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <IconButton onClick={handleDeleteClick}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <ConfirmModal
                open={openConfirm}
                onClose={onCloseConfirm}
                title="Remover grupo"
                content="Deseja realmente remover este grupo? Esta ação não poderá ser desfeita."
                action={() => handleDeleteConfirm(group.id)}
            />
        </>
    );
};

export default GroupLine;

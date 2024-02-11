import React from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const GroupLine = ({ group }) => {

    return (
        <Box sx={{ backgroundColor: '#D9D9D9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, borderRadius: 3, marginBottom: 2 }}>
            <Box>
                <Typography variant="h6">Familia Silveira</Typography>
                <Typography variant="subtitle1">
                    Integrantes: Jose, Carlos, Pedro
                </Typography>
            </Box>
            <Box>
                <Tooltip title="Editar">
                    <IconButton onClick={null}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                    <IconButton onClick={null}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default GroupLine;

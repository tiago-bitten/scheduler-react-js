import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const UnavailableDateLine = ({ startDate, endDate, onRemove }) => {
    const formattedStartDate = format(new Date(startDate), 'dd/MM/yyyy HH:mm', { locale: ptBR });
    const formattedEndDate = format(new Date(endDate), 'dd/MM/yyyy HH:mm', { locale: ptBR });

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 3,
            p: 2,
            mt: 1,
            bgcolor: '#f0f0f0',
            width: '100%'
        }}>
            <Typography variant="body1">
                {formattedStartDate} até {formattedEndDate}
            </Typography>
            <IconButton onClick={onRemove}>
                <Close />
            </IconButton>
        </Box>
    );
};

export default UnavailableDateLine;

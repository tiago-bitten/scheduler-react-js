import React from 'react';
import { Box, Grid, Typography, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import UnavailableDateLine from './UnavailableDateLine';

const UnavailableDate = () => {
    const [dates, setDates] = React.useState([]);
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

    const { enqueueSnackbar } = useSnackbar();

    const handleAddDate = () => {
        if (!startDate || !endDate) {
            enqueueSnackbar('Preencha as datas corretamente', { variant: 'warning' });
            return;
        }

        const convertedStartDate = new Date(startDate);
        const convertedEndDate = new Date(endDate);

        if (convertedStartDate > convertedEndDate) {
            enqueueSnackbar('A data inicial não pode ser maior que a data final', { variant: 'warning' });
            return;
        }

        setDates([...dates, { startDate, endDate }]);
        setStartDate('');
        setEndDate('');
    };

    const handleRemoveDate = (indexToRemove) => {
        setDates(dates.filter((_, index) => index !== indexToRemove));
    };

    return (
        <Box sx={{
            backgroundColor: 'white',
            py: 4,
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '60%'
        }}>
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    color: 'grey.700',
                    mb: 6,
                    fontSize: '1.7rem'
                }}>
                Informe as datas que você não estará disponível
            </Typography>
            <Grid container spacing={0.5} alignItems="center" justifyContent="center">
                <Grid item xs>
                    <TextField
                        sx={{ width: '70%' }}
                        id="startDate"
                        name="startDate"
                        label="Data Inicial"
                        type="datetime-local"
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setStartDate(e.target.value)}
                        value={startDate}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        sx={{ width: '70%' }}
                        id="endDate"
                        name="endDate"
                        label="Data Final"
                        type="datetime-local"
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setEndDate(e.target.value)}
                        value={endDate}
                    />
                </Grid>
                <Grid item>
                    <IconButton
                        sx={{ '& svg': { fontSize: 28 } }}
                        onClick={handleAddDate}
                    >
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Box sx={{ mt: 6, width: '100%' }}>
                {dates.length > 0 && dates.map((date, index) => (
                    <UnavailableDateLine
                        key={index}
                        startDate={date.startDate}
                        endDate={date.endDate}
                        onRemove={() => handleRemoveDate(index)}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default UnavailableDate;

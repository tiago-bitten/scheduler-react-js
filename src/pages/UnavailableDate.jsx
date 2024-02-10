import React from 'react';
import { Box, Grid, Typography, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import UnavailableDateLine from './UnavailableDateLine';
import { usePost } from '../hooks/usePost';
import { useFetch } from '../hooks/useFetch';
import { format } from 'date-fns';

const UnavailableDate = ({ volunteerId }) => {
    const { post } = usePost(`/unavailable-dates/create?volunteerId=${volunteerId}`);
    const { data, error, loading, fetch } = useFetch(`/unavailable-dates/${volunteerId}`);

    const [dates, setDates] = React.useState([]);
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        fetch();
    }, [fetch, volunteerId]);

    React.useEffect(() => {
        if (data) {
            setDates(data.unavailableDates);
        }
    }, [data]);

    const handleAddDate = () => {
        if (!startDate || !endDate) {
            enqueueSnackbar('Preencha as datas corretamente', { variant: 'warning' });
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        const formattedStartDate = format(start, "yyyy-MM-dd'T'HH:mm");
        const formattedEndDate = format(end, "yyyy-MM-dd'T'HH:mm");

        if (start > end) {
            enqueueSnackbar('A data inicial não pode ser maior que a data final', { variant: 'warning' });
            return;
        }

        post({ startDate: formattedStartDate, endDate: formattedEndDate });
        setStartDate('');
        setEndDate('');

        enqueueSnackbar('Data adicionada com sucesso', { variant: 'success' });
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
                {dates.length > 0 && dates.map((date) => (
                    <UnavailableDateLine
                        key={date.id}
                        startDate={date.startDate}
                        endDate={date.endDate}
                        onRemove={() => console.log('remover')}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default UnavailableDate;

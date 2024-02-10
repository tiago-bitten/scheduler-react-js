import React from 'react';
import { Box, Grid, Typography, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const UnavailableDate = () => {
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
                    />
                </Grid>
                <Grid item>
                    <IconButton sx={{ '& svg': { fontSize: 28 } }}>
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UnavailableDate;

import React from "react";
import { Box, TextField, Grid } from "@mui/material";

const ActivityField = ({ activity, totalVolunteers, onTotalChange }) => (
    <Grid container spacing={2} alignItems="center" key={activity.id}>
        <Grid item xs={8}>
            <TextField
                id={`textfield${activity.id}`}
                variant="filled"
                value={activity.name || 'Erro interno'}
                disabled
                fullWidth
            />
        </Grid>
        <Grid item xs={4}>
            <TextField
                id={`textfieldMAX${activity.id}`}
                variant="filled"
                value={totalVolunteers || ''}
                onChange={onTotalChange}
                autoComplete="off"
                type="number"
                sx={{ width: '80%' }}
            />
        </Grid>
    </Grid>
);

export default ActivityField;

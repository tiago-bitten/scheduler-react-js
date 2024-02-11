import React from 'react';
import Header from '../components/Header';
import { TextField, Box, Grid } from '@mui/material';
import RoundButton from '../components/RoundButton';
import GroupLine from '../components/GroupLine';

const Group = () => {

    return (
        <>
            <Header />
            <Box sx={{ flexGrow: 1, marginX: 6, marginTop: 4 }}>
                <Grid container justifyContent="space-between" alignItems="flex-end" spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Box>
                            <TextField
                                label="Nome do grupo"
                                fullWidth
                                margin="normal"
                                variant="standard"
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <RoundButton value="CRIAR" />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{
                backgroundColor: '#F3F3F3',
                padding: 4,
                marginX: 6,
                marginTop: 4,
            }}>
                <GroupLine />
                <GroupLine />
            </Box>
        </>
    );
};

export default Group;

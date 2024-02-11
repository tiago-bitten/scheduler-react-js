import React from 'react';
import Header from '../components/Header';
import { TextField, Box, Grid } from '@mui/material';
import RoundButton from '../components/RoundButton';
import GroupLine from '../components/GroupLine';
import NotFoundItem from '../components/NotFoundItem';
import { useFetch } from '../hooks/useFetch';

const Group = () => {
    const { data, error, loading, fetch } = useFetch('/groups');
    const [groups, setGroups] = React.useState([]);

    React.useEffect(() => {
        document.title = 'Grupos';
    }, []);


    React.useEffect(() => {
        fetch();

        if (data) {
            setGroups(data.groups);
        }
    }, [fetch, data]);

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
            {!loading && groups.length > 0 ?
                <Box sx={{
                    backgroundColor: '#F3F3F3',
                    padding: 4,
                    marginX: 6,
                    marginTop: 4,
                }}>
                    groups.map((group) => (
                    <GroupLine key={group.id} group={group} />
                    ))
                </Box>
                :
                <NotFoundItem entities="grupos" />
            }
        </>
    );
};

export default Group;

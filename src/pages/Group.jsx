import React from 'react';
import Header from '../components/Header';
import { TextField, Box, Grid } from '@mui/material';
import RoundButton from '../components/RoundButton';
import GroupLine from '../components/GroupLine';
import NotFoundItem from '../components/NotFoundItem';
import { useFetch } from '../hooks/useFetch';
import CreateGroupModal from '../components/CreateGroupModal';
import AssociateVolunteerGroupModal from '../components/AssociateVolunteerGroupModal';

const Group = () => {
    const { data, error, loading, fetch } = useFetch('/groups');
    const [openCreateGroupModal, setOpenCreateGroupModal] = React.useState(false);
    const [openAssociateVolunteerGroupModal, setOpenAssociateVolunteerGroupModal] = React.useState(false);
    const [selectedGroup, setSelectedGroup] = React.useState({});

    React.useEffect(() => {
        document.title = 'Grupos';
    }, []);


    React.useEffect(() => {
        fetch();
    }, [fetch]);

    const handleAssociateVolunteer = (group) => {
        setSelectedGroup(group);
        setOpenAssociateVolunteerGroupModal(true);
    };

    return (
        <>
            <Header />
            <Box sx={{ flexGrow: 1, marginX: 6, marginTop: 4 }}>
                <Grid container justifyContent="space-between" alignItems="flex-end" spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Nome do grupo"
                            fullWidth
                            margin="normal"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item>
                        <RoundButton value="CRIAR" onClick={() => setOpenCreateGroupModal(true)} />
                    </Grid>
                </Grid>
            </Box>
            {!loading && data && data.groups.length > 0 ? (
                <Box sx={{
                    backgroundColor: '#F3F3F3',
                    padding: 4,
                    marginX: 6,
                    marginTop: 4,
                }}>
                    {data.groups.map(group => (
                        <GroupLine
                            key={group.id}
                            group={group}
                            handleAssociateVolunteer={() => handleAssociateVolunteer(group)}
                        />
                    ))}
                </Box>
            ) : (
                <NotFoundItem entities="grupos" />
            )}
            <CreateGroupModal
                open={openCreateGroupModal}
                onClose={() => setOpenCreateGroupModal(false)}
                fetchGroups={fetch}
                handleAssociateVolunteer={handleAssociateVolunteer}
            />
            <AssociateVolunteerGroupModal
                open={openAssociateVolunteerGroupModal}
                onClose={() => setOpenAssociateVolunteerGroupModal(false)}
                fetchGroups={fetch}
                group={selectedGroup}
            />
        </>
    );
};

export default Group;

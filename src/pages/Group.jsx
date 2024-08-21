import React from 'react';
import Header from '../components/Header';
import { TextField, Box, Grid } from '@mui/material';
import RoundButton from '../components/RoundButton';
import GroupLine from '../components/GroupLine';
import NotFoundItem from '../components/NotFoundItem';
import { useFetch } from '../hooks/useFetch';
import { useDelete } from '../hooks/useDelete';
import CreateGroupModal from '../components/CreateGroupModal';
import AssociateVolunteerGroupModal from '../components/AssociateVolunteerGroupModal';
import { useSnackbar } from 'notistack';
import ConfirmModal from '../components/ConfirmModal';
import { useDebounce } from '../hooks/useDebouce';
import GroupListSkeleton from '../components/GroupListSkeleton';

const Group = () => {
    const { deleteRequest } = useDelete();
    const [groupName, setGroupName] = React.useState('');
    const [volunteerName, setVolunteerName] = React.useState('');
    const { data, error, loading, fetch } = useFetch(`/groups?groupName=${groupName}&volunteerName=${volunteerName}`);
    const { enqueueSnackbar } = useSnackbar();
    const [openCreateGroupModal, setOpenCreateGroupModal] = React.useState(false);
    const [openAssociateVolunteerGroupModal, setOpenAssociateVolunteerGroupModal] = React.useState(false);
    const [selectedGroup, setSelectedGroup] = React.useState({});
    const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);

    const debouncedGroupName = useDebounce(groupName, 500);
    const debouncedVolunteerName = useDebounce(volunteerName, 500);

    React.useEffect(() => {
        document.title = 'Grupos';
    }, []);


    React.useEffect(() => {
        fetch();
    }, [fetch]);

    React.useEffect(() => {
        fetch();
    }, [debouncedGroupName, debouncedVolunteerName]);

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    }

    const handleAssociateVolunteer = (group) => {
        setSelectedGroup(group);
        setOpenAssociateVolunteerGroupModal(true);
    };

    const handleDeleteClick = (group) => {
        setSelectedGroup(group);
        setConfirmModalOpen(true);
    }

    const handleDeleteConfirm = async (id) => {
        try {
            const response = await deleteRequest(`/groups/${id}`);

            if (response.status === 204) {
                enqueueSnackbar('Grupo removido', { variant: 'success' });
                fetch();
            }

        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || "Erro geral - Group", { variant: 'error' });
        } finally {
            setConfirmModalOpen(false);
        }
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
                            value={groupName}
                            onChange={handleGroupNameChange}
                        />
                    </Grid>
                    <Grid item>
                        <RoundButton value="CRIAR" onClick={() => setOpenCreateGroupModal(true)} />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{
                backgroundColor: '#F3F3F3',
                padding: 4,
                marginX: 6,
                marginTop: 4,
            }}>
                {loading && <GroupListSkeleton />}
                {!loading && data?.groups.length === 0 ? (
                    <NotFoundItem />
                ) : (
                    data?.groups.map((group) => (
                        <GroupLine
                            key={group.id}
                            group={group}
                            handleDeleteClick={handleDeleteClick}
                            handleAssociateVolunteer={handleAssociateVolunteer}
                        />
                    ))
                )}

            </Box>

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
            <ConfirmModal
                open={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                title="Remover grupo"
                content="Deseja realmente remover este grupo? Esta ação não poderá ser desfeita."
                action={() => handleDeleteConfirm(selectedGroup?.id)}
            />
        </>
    );
};

export default Group;

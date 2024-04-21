import React from "react";
import { Modal, Box, TextField, Typography, Tab, Tabs } from "@mui/material";
import { TabPanel, a11yProps } from '../components/TabPanel';

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 6,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

const EditVolunteerModal = ({ open, onClose, volunteer, fetchVolunteers }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={boxStyle}>
                <Typography variant="h6" align="center">Editar voluntário</Typography>
                <Tabs
                    value={0}
                    onChange={() => { }}
                    aria-label="simple tabs example"
                >
                    <Tab label="Dados pessoais" {...a11yProps(0)} />
                    <Tab label="Ministérios" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={0} index={0}>
                    <TextField
                        label="Nome"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        value={volunteer?.name}
                    />
                    <TextField
                        label="Sobrenome"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        value={volunteer?.lastName}
                    />
                    <TextField
                        label="CPF"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        value={volunteer?.cpf}
                    />
                    <TextField
                        label="Telefone"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        value={volunteer?.phone}
                    />
                    <TextField
                        label="Data de nascimento"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        value={volunteer?.birthDate}
                    />
                </TabPanel>
                <TabPanel value={1} index={1}>
                    <Typography>Ministérios</Typography>
                </TabPanel>
            </Box>
        </Modal>
    );
}

export default EditVolunteerModal;
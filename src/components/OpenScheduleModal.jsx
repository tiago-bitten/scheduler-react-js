import React from "react";
import moment from "moment";

import { useSnackbar } from "./SnackbarProvider";
import instance from "../config/axiosConfig";

import { Modal, Box, TextField, Button, Grid } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'space-between',
  };

const OpenScheduleModal = ({ open, onClose, selectedDate }) => {
    const [token] = React.useState(sessionStorage.getItem("token"));
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [startDate, setStartDate] = React.useState(selectedDate);
    const [endDate, setEndDate] = React.useState(selectedDate);

    const enqueueSnackbar = useSnackbar();

    const handleSubmit = async () => {
        const formattedStartDate = moment(startDate).format('YYYY-MM-DDTHH:mm:ss');
        const formattedEndDate = moment(endDate).format('YYYY-MM-DDTHH:mm:ss');

        try {
            const response = await instance.post('/schedules/open', {
                name,
                description,
                startDate: formattedEndDate,
                endDate: formattedEndDate
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                enqueueSnackbar('Agenda aberta com sucesso');
                onClose();
            }
        } catch (err) {
            enqueueSnackbar(err.response.data.message || "Não foi possível abrir a agenda");
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h2>Abrir agenda</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Data de início"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Data de término"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Salvar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default OpenScheduleModal;

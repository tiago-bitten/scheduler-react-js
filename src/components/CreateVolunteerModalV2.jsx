ear
import React from "react";
import { usePost } from "../hooks/usePost";
import { useSnackbar } from "notistack";
import { Modal, Box, TextField } from "@mui/material";
import RoundButton from "./RoundButton";
import CloseModal from "./CloseModal";

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 6,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}

const CreateVolunteerModalV2 = ({ open, onClose, fetchVolunteers }) => {
    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [cpf, setCpf] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [birthDate, setBirthDate] = React.useState('');

    const postVolunteer = usePost();
    const { enqueueSnackbar } = useSnackbar();

    const handleCleanFields = () => {
        setName('');
        setLastName('');
        setCpf('');
        setPhone('');
        setBirthDate('');
    };

    React.useEffect(() => {
        if (!open) {
            handleCleanFields();
        }
    }, [open]);

    const handleCreateVolunteer = async () => {
        if (name === '') {
            enqueueSnackbar("Nome é obrigatório", { variant: 'warning' });
            return;
        }

        console.log(name, lastName, cpf, phone, birthDate)

        const payload = {
            name,
            lastName,
            cpf,
            phone,
            birthDate
        };

        try {
            const response = await postVolunteer.post(`/volunteers/create`, payload)

            if (response.status === 201) {
                fetchVolunteers();
                onClose();
                console.log(response.data);
            }

        } catch (error) {
            console.log(error)
            enqueueSnackbar(error.response?.data?.message || "Erro geral", { variant: 'error' });
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={boxStyle}>
                <CloseModal onClose={onClose} />
                <TextField
                    label="Nome"
                    variant="standard"
                    size="small"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 4 }}
                />
                <TextField
                    label="Sobrenome"
                    variant="standard"
                    size="small"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{ mb: 4 }}
                />
                <TextField
                    label="CPF"
                    variant="standard"
                    size="small"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    sx={{ mb: 4 }}
                />
                <TextField
                    label="Telefone"
                    variant="standard"
                    size="small"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{ mb: 4 }}
                />
                <TextField
                    label="Data de nascimento"
                    variant="standard"
                    size="small"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    sx={{ mb: 2 }}
                    type="date"
                    InputLabelProps={{ shrink: true }}

                />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <RoundButton value="CADASTRAR" onClick={handleCreateVolunteer} />
                </Box>
            </Box>
        </Modal>
    );
};

export default CreateVolunteerModalV2;
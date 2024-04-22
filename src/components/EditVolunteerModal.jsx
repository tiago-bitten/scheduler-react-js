import React from "react";
import { Modal, Box, TextField, Typography, Tab, Tabs } from "@mui/material";
import { TabPanel, a11yProps } from '../components/TabPanel';
import RoundButton from "./RoundButton";
import CheckboxMinistry from "./CheckboxMinistry";
import { useFetch } from "../hooks/useFetch";
import CloseModal from "./CloseModal";
import { useSnackbar } from "notistack";
import UnavailableDateLine from './UnavailableDateLine';

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 6,
    minHeight: 600,
    maxHeight: 600,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

const EditVolunteerModal = ({ open, onClose, volunteer, fetchVolunteers }) => {
    const [value, setValue] = React.useState(0);
    const [selectedMinistries, setSelectedMinistries] = React.useState([]);
    const [unavailableDates, setUnavailableDates] = React.useState([]);

    const userMinitiesFetch = useFetch('/users/ministries');
    const unavailableDatesFetch = useFetch(`/unavailable-dates/${volunteer?.id}`);

    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        if (open) {
            userMinitiesFetch.fetch();
            unavailableDatesFetch.fetch();
            setSelectedMinistries(userMinitiesFetch.data?.ministries);
            setUnavailableDates(unavailableDatesFetch.data?.unavailableDates);
        }
    }, [open]);

    React.useEffect(() => {
        if (!open) {
            setSelectedMinistries([]);
            setUnavailableDates([]);
            setValue(0);
        }
    }, [open]);

    React.useEffect(() => {
        if (value === 1) {
            enqueueSnackbar("Não está funcionando ainda", { variant: "warning" })
        }
    }, [value])

    React.useEffect(() => {
        if (userMinitiesFetch.data && volunteer.ministries) {
            const selected = userMinitiesFetch.data.ministries.map(ministry => ({
                ...ministry,
                checked: volunteer.ministries.some(m => m.id === ministry.id),
            }));
            setSelectedMinistries(selected);
        }
    }, [userMinitiesFetch.data, volunteer.ministries]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={boxStyle}>
                <CloseModal onClose={onClose} />
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    aria-label="simple tabs example"
                    centered
                >
                    <Tab label="Dados pessoais" {...a11yProps(0)} />
                    <Tab label="Ministérios" {...a11yProps(1)} />
                    <Tab label="Datas indisponíves" {...a11yProps(2)} />
                </Tabs>
                <Box sx={{ width: '100%' }}>
                    <TabPanel value={value} index={0}>
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
                </Box>
                <Box sx={{ width: '100%' }}>
                    <TabPanel value={value} index={1}>
                        <Box sx={{ maxHeight: 350, overflowY: 'auto', mb: 2, backgroundColor: '#F3F3F3' }}>
                            {selectedMinistries?.map((ministry) => (
                                <CheckboxMinistry
                                    key={ministry.id}
                                    ministry={ministry}
                                    checked={ministry.checked}
                                    onToggle={() => { }}
                                />
                            ))}
                        </Box>
                    </TabPanel>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <TabPanel value={value} index={2}>
                        <Box sx={{ mb: 4 }}>
                            <TextField
                                label="Data"
                                variant="standard"
                                fullWidth
                                margin="normal"
                            />
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            {unavailableDates?.length > 0 && unavailableDates?.map((date) => (
                                <UnavailableDateLine
                                    key={date.id}
                                    startDate={date.startDate}
                                    endDate={date.endDate}
                                    onRemove={() => { }}
                                />
                            ))}
                        </Box>
                    </TabPanel>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <RoundButton onClick={onClose} value="SALVAR" />
                </Box>
            </Box>
        </Modal>
    );
}

export default EditVolunteerModal;
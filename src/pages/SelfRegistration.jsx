import React from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import instance from '../config/axiosConfig';
import { useSnackbar } from 'notistack';
import { TextField, Box, Typography, Container, Tab, Tabs, Grid } from '@mui/material';
import { TabPanel, a11yProps } from '../components/TabPanel';
import RoundButton from '../components/RoundButton';

const validationSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    lastName: yup.string().required('Sobrenome é obrigatório'),
    phone: yup.string().required('Telefone é obrigatório'),
    birthDate: yup.date().required('Data de nascimento é obrigatória'),
});

const SelfRegistration = () => {
    const { uuid } = useParams();
    const [message, setMessage] = React.useState('');
    const [tabValue, setTabValue] = React.useState(0);
    const [unavailableDates, setUnavailableDates] = React.useState([]);
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        const fetchAutoRegistration = async () => {
            try {
                const response = await instance.get(`/self-registrations/validate/${uuid}`);
                if (response.status === 204) {
                    setMessage('');
                }
            } catch (error) {
                setMessage(error.response.data.message);
            }
        };
        fetchAutoRegistration();
    }, [uuid]);

    const postVolunteer = async (values) => {
        try {
            const response = await instance.post(`/self-registrations/create/${uuid}`, values);
            if (response.status === 201) {
                return response.data.volunteer.id;                
            }
        } catch (error) {
            enqueueSnackbar('Erro ao enviar o formulário de autocadastro', { variant: 'error' });
        }
    };

    const postUnavailableDates = async (startDate, endDate, volunteerId) => {
        try {
            const response = await instance.post(`/unavailable-dates/create?volunteerId=${volunteerId}`, {
                startDate,
                endDate,
                rrule: 'FREQ=WEEKLY;COUNT=1',
            });
            if (response.status === 204) {
                console.log('Datas indisponíveis enviadas com sucesso');
            }
        } catch (error) {
            throw new Error('Erro ao enviar as datas indisponíveis');
        }
    };

    const handlePostUnavailableDates = async (volunteerId) => {
        if (unavailableDates.length > 0) {
            console.log(unavailableDates)
            unavailableDates.forEach((date) => {
                postUnavailableDates(date.startDate, date.endDate, volunteerId);
            });
        }
        setUnavailableDates([]);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            phone: '',
            birthDate: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const volunteerId = await postVolunteer(values);
                if (volunteerId) {
                    await handlePostUnavailableDates(volunteerId);
                    enqueueSnackbar('Cadastro realizado com sucesso', { variant: 'success' });
                } 
            } catch (err) {
                enqueueSnackbar('Erro ao enviar o formulário de autocadastro', { variant: 'error' });
            }
        },
    });

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleAddUnavailableDate = () => {
        if (startDate && endDate) {
            setUnavailableDates([...unavailableDates, { startDate, endDate }]);
            setStartDate('');
            setEndDate('');
        } else {
            enqueueSnackbar('Por favor, preencha todas as datas', { variant: 'warning' });
        }
    };

    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', minWidth: '100vw', backgroundColor: '#4169E1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ backgroundColor: 'white', py: 4, px: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                {message ? (
                    <Typography variant="h6" component="h1" sx={{ color: 'grey.700', mb: 2 }}>
                        {message}
                    </Typography>
                ) : (
                    <>
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="autocadastro tabs">
                            <Tab label="Autocadastro" {...a11yProps(0)} />
                            <Tab label="Datas Indisponíveis" {...a11yProps(1)} />
                        </Tabs>
                        <TabPanel value={tabValue} index={0}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Se cadastre
                            </Typography>
                            <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
                                <TextField
                                    fullWidth
                                    required
                                    id="name"
                                    name="name"
                                    label="Nome"
                                    variant="standard"
                                    autoComplete="off"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    margin="normal"

                                />
                                <TextField
                                    fullWidth
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="Sobrenome"
                                    variant="standard"
                                    autoComplete="off"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                    margin="normal"

                                />
                                <TextField
                                    fullWidth
                                    required
                                    id="phone"
                                    name="phone"
                                    label="Telefone"
                                    variant="standard"
                                    autoComplete="off"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                    margin="normal"

                                />
                                <TextField
                                    fullWidth
                                    required
                                    id="birthDate"
                                    name="birthDate"
                                    label="Data de Nascimento"
                                    type="date"
                                    variant="standard"
                                    autoComplete="off"
                                    value={formik.values.birthDate}
                                    onChange={formik.handleChange}
                                    error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                                    helperText={formik.touched.birthDate && formik.errors.birthDate}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{ marginTop: 4 }}
                                />
                                <Box sx={{ textAlign: 'center', marginTop: 4, width: '100%' }}>
                                    <RoundButton value="CRIAR" type="submit" />
                                </Box>
                            </form>
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={5}>
                                    <TextField
                                        fullWidth
                                        label="Data de Início"
                                        type="datetime-local"
                                        value={startDate}
                                        variant="standard"
                                        onChange={(e) => setStartDate(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        fullWidth
                                        label="Data de Fim"
                                        type="datetime-local"
                                        value={endDate}
                                        variant="standard"
                                        onChange={(e) => setEndDate(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <RoundButton value="Adicionar" onClick={handleAddUnavailableDate} />
                                </Grid>
                            </Grid>
                            {unavailableDates.map((date, index) => (
                                <Typography key={index} sx={{ mt: 2 }}>
                                    De {date.startDate} até {date.endDate}
                                </Typography>
                            ))}
                        </TabPanel>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default SelfRegistration;

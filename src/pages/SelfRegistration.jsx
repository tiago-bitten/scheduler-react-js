import React from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import instance from '../config/axiosConfig';
import { useSnackbar } from 'notistack';
import { TextField, Box, Typography, Container } from '@mui/material';
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
        }

        fetchAutoRegistration();
    }, [uuid]);

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            phone: '',
            birthDate: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await instance.post(`/self-registrations/create/${uuid}`, values);

                if (response.status === 204) {
                    enqueueSnackbar('Autocadastro realizado com sucesso', { variant: 'success' });
                    setMessage('Autocadastro realizado com sucesso');
                }
            } catch (error) {
                enqueueSnackbar('Erro ao enviar o formulário de autocadastro', { variant: 'error' });
            }
        },
    });

    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', minWidth: '100vw', backgroundColor: '#4169E1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ backgroundColor: 'white', py: 4, px: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
                {message ? (
                    <Typography variant="h6" component="h1" sx={{ color: 'grey.700', mb: 2 }}>
                        {message}
                    </Typography>
                ) : (
                    <>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: 2, textAlign: 'center' }}>
                            Se cadastre
                        </Typography>
                        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
                            <TextField
                                fullWidth
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
                    </>
                )}
            </Box>
        </Container>
    );
};

export default SelfRegistration;

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { usePost } from '../hooks/usePost';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RoundButton from '../components/RoundButton';

const validationSchema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  lastName: yup.string().required('O sobrenome é obrigatório'),
  phone: yup.string().required('O telefone é obrigatório'),
});

const AutoCreateVolunteer = () => {
    const { cpf, birthDate } = useParams();
    const { data, error, post } = usePost('/volunteers/auto-create');

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (data) {
            enqueueSnackbar(`Bem vindo ${data.volunteer.name}`, { variant: 'success' });
            navigate(`/voluntario/${data.volunteer.accessKey}/indisponibilidade`);
        }

    }, [data, error, enqueueSnackbar]);

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            phone: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const payload = { ...values, cpf, birthDate };
            post(payload);
        },
    });

    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', minWidth: '100vw', backgroundColor: '#4169E1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{
                backgroundColor: 'white',
                py: 4,
                px: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '30%'
            }}>
                <Typography variant="h3" component="h1" sx={{ color: 'grey.700', mb: 2, fontSize: '1.7rem' }}>
                    Criar conta
                </Typography>
                <form onSubmit={formik.handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Nome"
                        variant="standard"
                        margin="normal"
                        required
                        autoComplete="off"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Sobrenome"
                        variant="standard"
                        margin="normal"
                        required
                        autoComplete="off"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                    <TextField
                        fullWidth
                        id="phone"
                        name="phone"
                        label="Telefone"
                        variant="standard"
                        margin="normal"
                        required
                        autoComplete="off"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                    <Box sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <RoundButton type="submit" value="CRIAR" />
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default AutoCreateVolunteer;

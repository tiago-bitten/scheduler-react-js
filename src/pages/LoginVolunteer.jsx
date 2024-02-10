import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, TextField, Container } from "@mui/material";
import { usePost } from "../hooks/usePost";
import { useSnackbar } from 'notistack';
import { cpfValidation } from '../utils/cpfValidation';
import { useNavigate } from 'react-router-dom';

import LoginVolunteerStep from '../components/LoginVolunteerStep';

const validationSchema = yup.object({
    cpf: yup.string().required("O CPF é obrigatório").test('is-valid', 'CPF não é válido', cpfValidation),
    birthDate: yup.date().max(new Date(), "A data de nascimento não pode ser maior que a data atual").required("A data de nascimento é obrigatória"),
});

const LoginVolunteer = () => {
    const { data, error, loading, post } = usePost('/volunteers/sign-in');
    const [cpf, setCPF] = React.useState('');
    const [birthDate, setBirthDate] = React.useState('');
    const [volunteerId, setVolunteerId] = React.useState('');

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (data) {
            setVolunteerId(data.volunteer.id);
            enqueueSnackbar(`Bem vindo ${data.volunteer.name}`, { variant: 'success' });
        }

        if (error) {
            enqueueSnackbar('Preencha os campos', { variant: 'success' });
            navigate(`/voluntario/criar-conta/${cpf}/${birthDate}`);
        }

    }, [data, error, enqueueSnackbar]);

    const formik = useFormik({
        initialValues: {
            cpf: '',
            birthDate: ''
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            post(values);
            setCPF(values.cpf);
            setBirthDate(values.birthDate);
            setSubmitting(false);
        }
    });

    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', minWidth: '100vw', backgroundColor: '#4169E1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LoginVolunteerStep formik={formik} />
        </Container>
    );
};

export default LoginVolunteer;

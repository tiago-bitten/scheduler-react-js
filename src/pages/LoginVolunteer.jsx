import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, TextField, Container } from "@mui/material";
import { usePost } from "../hooks/usePost";
import { useSnackbar } from 'notistack';
import { cpfValidation } from '../utils/cpfValidation';

import LoginVolunteerStep from '../components/LoginVolunteerStep';
import UnavailableDate from '../components/UnavailableDate';

const validationSchema = yup.object({
    cpf: yup.string().required("O CPF é obrigatório").test('is-valid', 'CPF não é válido', cpfValidation),
    birthDate: yup.date().max(new Date(), "A data de nascimento não pode ser maior que a data atual").required("A data de nascimento é obrigatória"),
});

const LoginVolunteer = () => {
    const { data, error, loading, post } = usePost('/volunteers/sign-in');
    const [nextStep, setNextStep] = React.useState({ pass: false, number: 0 });
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        if (data) {
            enqueueSnackbar(`Bem vindo ${data.volunteer.name}`, { variant: 'success' });
            setNextStep({ pass: true, number: 2 });
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
            setSubmitting(false);
        }
    });

    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', minWidth: '100vw', backgroundColor: '#4169E1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {nextStep.number === 0 ? (
                <LoginVolunteerStep formik={formik} />
            ) : nextStep.pass && nextStep.number === 2 ? (
                <UnavailableDate />
            ) : null}
        </Container>
    );
};

export default LoginVolunteer;

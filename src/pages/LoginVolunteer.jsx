import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Container } from "@mui/material";
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
    const { post } = usePost();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            cpf: '',
            birthDate: ''
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await post('/volunteers/sign-in', values);
                if (response.status === 201) {
                    enqueueSnackbar(`Bem vindo ${response.data.volunteer.name}`, { variant: 'success' });
                    navigate(`/voluntario/${response.data.volunteer.accessKey}/indisponibilidade`);
                } 
            } catch (error) {
                const errorStatus = error.response?.status;

                if (errorStatus === 400) {
                    enqueueSnackbar(error.response.data.message, { variant: 'error' });
                }

                if (errorStatus === 422) {
                    enqueueSnackbar("Preencha os campos", { variant: 'success' });
                    navigate(`/voluntario/criar-conta/${values.cpf}/${values.birthDate}`);
                }

            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', minWidth: '100vw', backgroundColor: '#4169E1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LoginVolunteerStep formik={formik} />
        </Container>
    );
};

export default LoginVolunteer;

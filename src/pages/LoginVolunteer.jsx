import React from "react";
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { Box, Button, TextField } from "@mui/material";
import MaskedInputCustom from "../components/MaskedInputCustom";

const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
};

const validationSchema = yup.object({
    cpf: yup
        .string()
        .required("O CPF é obrigatório")
        .test('is-valid', 'CPF não é válido', (value) => validarCPF(value)),
    birthDate: yup
        .date()
        .max(new Date(), "A data de nascimento não pode ser maior que a data atual")
        .required("A data de nascimento é obrigatória"),
});

const LoginVolunteer = () => {


    return (
        <Box>
            <h1>Login do Voluntário</h1>
            <Formik
                initialValues={{ cpf: '', birthDate: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('Login', values);
                }}
            >
                <Form>
                    <MaskedInputCustom
                        name="cpf"
                        label="CPF"
                        mask="999.999.999-99"
                        variant="standard"
                        required
                    />
                    <TextField
                        name="birthDate"
                        label="Data de Nascimento"
                        variant="standard"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        required
                        autocomplete="off"
                    />
                    <Button type="submit" variant="contained">PROSSEGUIR</Button>
                </Form>
            </Formik>
        </Box>
    );
};

export default LoginVolunteer;

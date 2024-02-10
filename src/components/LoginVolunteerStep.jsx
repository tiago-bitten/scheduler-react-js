import React from 'react';
import { TextField, Box, Typography } from '@mui/material';
import RoundButton from './RoundButton';

const LoginVolunteerStep = ({ formik }) => {
    return (
        <Box sx={{
            backgroundColor: 'white',
            py: 4,
            px: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '30%'
        }}>
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    color: 'grey.700',
                    mb: 2,
                    fontSize: '1.7rem'
                }}>
                Acessar
            </Typography>
            <form onSubmit={formik.handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ width: '70%', mb: 2 }}>
                    <TextField
                        fullWidth
                        id="cpf"
                        name="cpf"
                        label="CPF"
                        variant="standard"
                        value={formik.values.cpf}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                        helperText={formik.touched.cpf && formik.errors.cpf}
                        margin="normal"
                    />
                </Box>
                <Box sx={{ width: '70%', mb: 2 }}>
                    <TextField
                        fullWidth
                        id="birthDate"
                        name="birthDate"
                        label="Data de Nascimento"
                        type="date"
                        variant="standard"
                        value={formik.values.birthDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                        helperText={formik.touched.birthDate && formik.errors.birthDate}
                        InputLabelProps={{ shrink: true }}
                        margin="normal"
                    />
                </Box>
                <Box sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <RoundButton type="submit" value="PROSSEGUIR" />
                </Box>
            </form>
        </Box>
    );
};

export default LoginVolunteerStep;

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { TextField } from '@mui/material';
import RoundButton from '../components/RoundButton';
import ForgotPassword from './ForgotPassword';
import CreateAccountLink from './CreateAccountLink';
import OrBar from './OrBar';
import ForgotPasswordModal from './ForgotPasswordModal';

import instance from '../config/axiosConfig';

const loginSchema = yup.object({
    email: yup.string().email('Email inválido').required('O email é obrigatório'),
    password: yup.string().required('A senha é obrigatória'),
});

const LoginRightCard = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [openForgotPassword, setOpenForgotPassword] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {
                const response = await instance.post('/auth/signin', {
                    email: values.email,
                    password: values.password
                });

                const data = response.data;

                if (response.status === 200) {
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('user', JSON.stringify(data.user));
                    enqueueSnackbar('Login efetuado com sucesso.', { variant: 'success' });
                    navigate('/voluntarios');
                }
            } catch (error) {
                if (error.response.status === 401) {
                    enqueueSnackbar(error.response.data.message, { variant: 'error' });
                }
            }
        },
    });

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full">
                <h1 className="text-4xl text-center mb-10 text-quinary">Bem-vindo</h1>
                <div className="flex flex-col items-center justify-center w-full">
                    <form onSubmit={formik.handleSubmit} style={{ width: '60%' }}>
                        <TextField
                            label="Email"
                            id="email"
                            type="email"
                            variant="standard"
                            required
                            fullWidth
                            autoComplete="off"
                            sx={{ mb: 4 }}
                            {...formik.getFieldProps('email')}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            label="Senha"
                            id="password"
                            type="password"
                            variant="standard"
                            required
                            fullWidth
                            autoComplete="off"
                            {...formik.getFieldProps('password')}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <div className="mt-2 mb-10 text-right">
                            <ForgotPassword open={() => setOpenForgotPassword(true)} />
                        </div>
                        <div className="flex justify-center w-full mb-8">
                            <RoundButton value="ENTRAR" type="submit" />
                        </div>
                    </form>
                </div>
                <div className="w-1/2">
                    <OrBar />
                </div>
                <div className="mt-8">
                    <CreateAccountLink />
                </div>
            </div>
            <ForgotPasswordModal
                open={openForgotPassword}
                onClose={() => setOpenForgotPassword(false)}
            />
        </>
    );
};

export default LoginRightCard;

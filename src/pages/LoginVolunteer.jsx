import React from "react";

import { TextField, Box } from "@mui/material";
import RoundButton from "../components/RoundButton";

const LoginVolunteer = () => {

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login');
    }

    return (
        <Box>
            <h1>Login do Voluntário</h1>
            <form>
                <TextField
                    id="outlined-basic"
                    label="E-mail"
                    variant="standard"
                    type="text"
                    required
                />
                <TextField
                    id="outlined-basic"
                    label="Data de Nascimento"
                    variant="standard"
                    type="date"
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <RoundButton type="submit" onClick={handleLogin} value="PROSSEGUIR" />
            </form>
        </Box>
    );
}

export default LoginVolunteer;
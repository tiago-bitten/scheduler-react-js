import React, { useState } from "react";
import { Switch, Box, TextField, Typography } from "@mui/material";

const SwitchMinistry = ({ ministry }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleSwitchChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Switch
                    checked={isChecked}
                    onChange={handleSwitchChange}
                    sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                            color: ministry.color,
                            '& + .MuiSwitch-track': {
                                backgroundColor: ministry.color,
                            },
                        },
                    }}
                />
                <Typography variant="body1">{ministry.name}</Typography>
            </Box>
            <TextField
                type="number"
                size="small"
                autoComplete="off"
                variant="filled"
                disabled={!isChecked}
                sx={{
                    mt: 1,
                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                        '-webkit-appearance': 'none',
                        margin: 0,
                    },
                    '& input[type=number]': {
                        '-moz-appearance': 'textfield',
                    },
                }}
            />
        </Box>
    );
};

export default SwitchMinistry;

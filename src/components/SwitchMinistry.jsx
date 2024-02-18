import React, { useState } from "react";
import { Switch, Box, TextField, Typography } from "@mui/material";

const SwitchMinistry = ({ ministry, onSelect }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [maxVolunteers, setMaxVolunteers] = React.useState(0);

    const handleSwitchChange = (event) => {
        setIsChecked(event.target.checked);
        if (event.target.checked) {
            onSelect(ministry, event.target.checked, maxVolunteers);
        } else {
            onSelect(ministry, event.target.checked, 0);
            setMaxVolunteers(0);
        }
    };

    const handleSwitchChangeByLabel = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            onSelect(ministry, !isChecked, maxVolunteers);
        } else {
            onSelect(ministry, !isChecked, 0);
            setMaxVolunteers(0);
        }
    }

    const handleMaxVolunteersChange = (event) => {
        const newMaxVolunteers = event.target.value < 0 ? 0 : event.target.value;
        setMaxVolunteers(newMaxVolunteers);
        if (isChecked) {
            onSelect(ministry, isChecked, newMaxVolunteers);
        }
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
                <Typography
                    variant="body1"
                    sx={{
                        color: isChecked ? ministry.color : 'inherit',
                        fontWeight: isChecked ? 'bold' : 'inherit',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    }}
                    onClick={handleSwitchChangeByLabel}
                >
                    {ministry.name}
                </Typography>
            </Box>
            <TextField
                type="number"
                size="small"
                autoComplete="off"
                variant="filled"
                disabled={!isChecked}
                onChange={handleMaxVolunteersChange}
                value={maxVolunteers > 0 ? maxVolunteers : ''}
                sx={{
                    mt: 1,
                    '& input': {
                        color: isChecked ? ministry.color : 'inherit',
                    },
                    '& .MuiFilledInput-root': {
                        backgroundColor: isChecked ? `${ministry.color}20` : 'inherit',
                    },
                    '& .MuiFilledInput-underline:before': {
                        borderBottomColor: isChecked ? ministry.color : 'inherit',
                    },
                    '& .MuiFilledInput-underline:after': {
                        borderBottomColor: isChecked ? ministry.color : 'inherit',
                    },
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

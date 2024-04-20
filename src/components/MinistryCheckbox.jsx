import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const MinistryCheckbox = ({ ministry, checked, onChange }) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    name={ministry.name}
                    color="primary"
                />
            }
            label={ministry.name}
            key={ministry.id}
        />
    );
};

export default MinistryCheckbox;

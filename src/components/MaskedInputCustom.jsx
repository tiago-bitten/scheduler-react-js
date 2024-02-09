import React from 'react';
import { useField } from 'formik';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';

const MaskedInputCustom = ({ mask, ...props }) => {
    const [field, meta] = useField(props);
    
    return (
        <InputMask
            mask={mask}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            maskChar={null}
        >
            {(inputProps) => (
                <TextField
                    {...inputProps}
                    {...props}
                    autoComplete="off"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                />
            )}
        </InputMask>
    );
};

export default MaskedInputCustom;

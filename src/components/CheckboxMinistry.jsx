import React from 'react';
import { Checkbox } from '@mui/material';

const CheckboxMinistry = ({ ministry, checked, onToggle }) => {
    return (
        <div style={{ padding: '8px 16px' }}>
            <Checkbox
                checked={checked}
                onChange={onToggle}
                sx={{
                    color: '#454545',
                    '&.Mui-checked': {
                        color: '#4169E1',
                    },
                }}
            />
            <span className="text-quinary" style={{ marginLeft: '8px' }}>{ministry}</span>
        </div>
    );
};

export default CheckboxMinistry;

import React, { useState } from 'react';
import { Checkbox } from '@mui/material';

const CheckboxMinistry = ({ ministry, checked, onToggle }) => {
    const [hover, setHover] = useState(false);

    return (
        <div style={{ padding: '8px 16px', backgroundColor: hover ? 'rgba(0, 0, 0, 0.04)' : 'transparent' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <Checkbox
                checked={checked}
                onChange={onToggle}
                sx={{ color: '#454545', '&.Mui-checked': { color: '#4169E1' } }}
            />
            <span className="text-quinary" style={{ marginLeft: '8px', cursor: 'pointer' }} onClick={onToggle}>
                {ministry.name}
            </span>
        </div>
    );
};

export default CheckboxMinistry;

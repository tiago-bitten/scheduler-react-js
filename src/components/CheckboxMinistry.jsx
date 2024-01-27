import React from 'react';
import { Checkbox, Skeleton } from '@mui/material';

const CheckboxMinistry = ({ ministry, checked, onToggle, loading }) => {
    return (
        <div style={{ padding: '8px 16px' }}>
            {loading ? (
                <Skeleton variant="rectangular" width={210} height={36} />
            ) : (
                <>
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
                </>
            )}
        </div>
    );
};

export default CheckboxMinistry;

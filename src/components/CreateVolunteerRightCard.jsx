import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckboxMinistry from './CheckboxMinistry';
import RoundButton from './RoundButton';

const CreateVolunteerRightCard = ({
    userMinistriesFetch,
    selectedMinistries,
    handleToggle,
    handleClick
}) => {
    return (
        <Box sx={{ width: '100%', pl: 2 }}>
            <Typography variant="h3" gutterBottom textAlign="center" sx={{ fontSize: "1.5rem" }}>Ministérios</Typography>
            <Box sx={{ maxHeight: 350, overflowY: 'auto', mb: 6, backgroundColor: '#F3F3F3' }}>
                {userMinistriesFetch.data?.ministries?.map((ministry) => (
                    <CheckboxMinistry
                        key={ministry.id}
                        ministry={ministry.name}
                        checked={selectedMinistries.some(m => m.id === ministry.id)}
                        onToggle={() => handleToggle(ministry)}
                    />
                ))}
            </Box>
            <Typography variant="caption" textAlign="center" sx={{ display: 'block', mb: 2, fontStyle: 'italic' }}>
                Não é obrigatório selecionar os ministérios agora, você pode fazer isso depois.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <RoundButton value="CADASTRAR" onClick={handleClick} />
            </Box>
        </Box>
    );
};

export default CreateVolunteerRightCard;
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const GeneratedScaleLine = ({ volunteer, ministry, activity, onRemove }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: 1, borderColor: 'grey.300', backgroundColor: 'grey.200' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src="https://thispersondoesnotexist.com/"
                    alt="thispersondoesnotexists"
                    className={`rounded-full w-14 h-14 mr-4`} />
                <Box>
                    <Typography variant="h6" component="p" sx={{ color: 'grey.900', mb: 0.3 }}>
                        {volunteer.name} {volunteer.lastName}
                    </Typography>
                    <Typography variant="body2" component="p" sx={{ color: ministry.color, fontWeight: 'bold' }}>
                        {ministry.name} | {activity.name}
                    </Typography>
                </Box>
            </Box>
            <IconButton onClick={() => onRemove(volunteer, ministry)}>
                <CloseIcon />
            </IconButton>
        </Box>
    );
}

export default GeneratedScaleLine;
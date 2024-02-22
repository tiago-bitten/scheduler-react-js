import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Close from "@mui/icons-material/Close";

const boxStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 3,
    p: 2,
    mt: 1,
    bgcolor: '#f0f0f0',
    width: '100%'
}

const ActivityLine = ({ activity, onRemove }) => {
    return (
        <Box sx={boxStyle}>
            <Typography variant="body1">
                {activity.name} - {activity.defaultTotalVolunteers} voluntários
            </Typography>
            <IconButton onClick={onRemove}>
                <Close />
            </IconButton>
        </Box>
    );
};

export default ActivityLine;
import React, { useState } from 'react';
import { Card, CardContent, Typography, Chip, IconButton, Switch, FormControlLabel } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const ApproveUserCard = ({ user, onApprove, onDisapprove }) => {
    const [allowApprove, setAllowApprove] = useState(false);

    const handleToggleApprove = (event) => {
        setAllowApprove(event.target.checked);
    };

    return (
        <Card className="m-4 w-full max-w-xl">
            <CardContent className="flex flex-col items-center">
                <Typography variant="h5" component="div" className="font-bold mb-2">
                    {user.name}
                </Typography>
                <Typography className="mb-2" color="textSecondary">
                    {user.email}
                </Typography>
                <div className="flex flex-wrap justify-center my-4 overflow-auto">
                    {user.ministries.map((ministry) => (
                        <Chip
                            key={ministry.id}
                            label={ministry.name}
                            variant="outlined"
                            color="primary"
                            size="small"
                            className="m-1"
                        />
                    ))}
                </div>
                <div>
                <Switch
                    checked={allowApprove}
                    onChange={handleToggleApprove}
                    name="allowApprove"
                    color="primary"
                /> 
                <span className="text-quinary">Permite aprovar usuários</span>
                </div>
                <div className="flex justify-around w-full mt-4">
                    <IconButton color="primary" onClick={() => onApprove(user.id, allowApprove)}>
                        <CheckCircleOutlineIcon fontSize="large" />
                    </IconButton>
                    <IconButton color="error" onClick={() => onDisapprove(user.id)}>
                        <HighlightOffIcon fontSize="large" />
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    );
};

export default ApproveUserCard;

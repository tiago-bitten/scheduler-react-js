import React, { useState } from "react";
import { Box, ListItem, ListItemAvatar, Avatar, ListItemText, Checkbox, Select, MenuItem, InputLabel } from "@mui/material";

const AppointGroupVolunteerItem = ({ volunteer, activities, checkedVolunteers, setCheckedVolunteers }) => {
    const isAvailable = volunteer.available;
    const [selectedActivity, setSelectedActivity] = useState('');

    const handleActivityChange = (event) => {
        setSelectedActivity(event.target.value);
        // Aqui você pode também querer fazer algo mais com a atividade selecionada, como atualizar o estado no componente pai
    };

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar alt={volunteer.name} src={volunteer.avatar} />
            </ListItemAvatar>
            <ListItemText
                primary={`${volunteer.name} ${volunteer.lastName}`}
                secondary={!isAvailable ? volunteer.reason : ''}
            />
            {isAvailable ? (
                <>
                    <Box sx={{ mr: 12 }}>
                        <Select
                            labelId="activity-select-label"
                            id="activity-select"
                            label="Atividade"
                            value={selectedActivity}
                            onChange={handleActivityChange}
                            style={{ minWidth: 120 }}
                            variant="standard"
                        >
                            {activities?.map((activity) => (
                                <MenuItem key={activity.id} value={activity.id}>
                                    {activity.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Checkbox
                        checked={checkedVolunteers.includes(volunteer.id)}
                        onChange={() => setCheckedVolunteers(prev => {
                            if (prev.includes(volunteer.id)) {
                                return prev.filter(id => id !== volunteer.id);
                            } else {
                                return [...prev, volunteer.id];
                            }
                        })}
                    />
                </>
            ) : (
                <Checkbox disabled />
            )}
        </ListItem>
    );
};

export default AppointGroupVolunteerItem;

import React, { useState } from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Checkbox, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

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
                    <FormControl variant="standard" sx={{ minWidth: 120, marginRight: 3 }}>
                        <InputLabel id="activity-select-label">Atividade</InputLabel>
                        <Select
                            labelId="activity-select-label"
                            id="activity-select"
                            value={selectedActivity}
                            onChange={handleActivityChange}
                        >
                            {activities?.map((activity) => (
                                <MenuItem key={activity.id} value={activity.id}>
                                    {activity.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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

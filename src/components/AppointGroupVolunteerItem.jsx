import React, { useState } from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Checkbox, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const AppointGroupVolunteerItem = ({ volunteer, activities, checkedVolunteers, setCheckedVolunteers, onActivitySelect }) => {
    const isAvailable = volunteer.available;
    const [selectedActivity, setSelectedActivity] = useState('');

    const handleActivityChange = (event) => {
        const activityId = event.target.value;
        setSelectedActivity(activityId);
        onActivitySelect(volunteer.id, activityId);
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
            {isAvailable && (
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
            )}
        </ListItem>
    );
};

export default AppointGroupVolunteerItem;

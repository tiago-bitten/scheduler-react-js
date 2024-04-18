import React, { useEffect, useState } from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Checkbox, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const AppointGroupVolunteerItem = ({ volunteer, activities, appointGroup, setAppointGroup }) => {
    const isAvailable = volunteer.available;
    const [selectedActivity, setSelectedActivity] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const appointment = appointGroup.find(item => item.volunteerId === volunteer.id);
        if (appointment) {
            setIsChecked(appointment.checked);
            setSelectedActivity(appointment.checked && appointment.activityId ? appointment.activityId : '');
        } else {
            setIsChecked(false);
            setSelectedActivity('');
        }
    }, [appointGroup, volunteer.id]);

    const handleActivityChange = (event) => {
        const activityId = event.target.value;
        setSelectedActivity(activityId);
        updateAppointGroup(volunteer.id, 'activityId', activityId || '');
    };

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        if (!checked) {
            setSelectedActivity(''); 
            updateAppointGroup(volunteer.id, 'activityId', '');  
        }
        updateAppointGroup(volunteer.id, 'checked', checked);
    };

    const updateAppointGroup = (volunteerId, key, value) => {
        const updatedAppointGroup = appointGroup.map(item => {
            if (item.volunteerId === volunteerId) {
                return { ...item, [key]: value };
            }
            return item;
        });
        setAppointGroup(updatedAppointGroup);
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
                        <InputLabel id={`activity-select-label-${volunteer.id}`}>Atividade</InputLabel>
                        <Select
                            labelId={`activity-select-label-${volunteer.id}`}
                            id={`activity-select-${volunteer.id}`}
                            value={selectedActivity}
                            onChange={handleActivityChange}
                            disabled={!isChecked}
                        >
                            {activities?.map((activity) => (
                                <MenuItem key={activity.id} value={activity.id}>
                                    {activity.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Checkbox
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                </>
            )}
        </ListItem>
    );
};

export default AppointGroupVolunteerItem;

import React, { useEffect, useState } from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Checkbox, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const AppointGroupVolunteerItem = ({ volunteer, activities, appointGroup, setAppointGroup }) => {
    const isAvailable = volunteer.available;
    const [selectedActivity, setSelectedActivity] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    // Configura o estado inicial do checkbox baseado na propriedade `checked` no objeto appointGroup.
    useEffect(() => {
        const appointment = appointGroup.find(item => item.volunteerId === volunteer.id);
        setIsChecked(appointment ? appointment.checked : false);
    }, [appointGroup, volunteer.id]);

    const handleActivityChange = (event) => {
        const activityId = event.target.value;
        setSelectedActivity(activityId);
        updateAppointGroup(volunteer.id, 'activityId', activityId);
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        updateAppointGroup(volunteer.id, 'checked', event.target.checked);
    };

    // Função para atualizar appointGroup
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

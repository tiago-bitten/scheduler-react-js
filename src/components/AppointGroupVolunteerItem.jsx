import React from "react";
import { ListItemAvatar, Avatar, ListItemText, ListItem, Checkbox } from "@mui/material";

const AppointGroupVolunteerItem = ({ volunteer, checkedVolunteers, setCheckedVolunteers }) => {
    const isAvailable = volunteer.available;

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar alt={volunteer.name} />
            </ListItemAvatar>
            <ListItemText
                primary={volunteer.name + ' ' + volunteer.lastName}
                secondary={!isAvailable ? volunteer.reason : ''}
            />
            {isAvailable ? <Checkbox defaultChecked /> : <Checkbox disabled />}
        </ListItem>
    );
};

export default AppointGroupVolunteerItem;

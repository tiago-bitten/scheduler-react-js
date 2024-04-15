import React from "react";
import { ListItemAvatar, Avatar, ListItemText, ListItem, Checkbox } from "@mui/material";

const AppointGroupVolunteerItem = ({ volunteer }) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar alt={volunteer.name} />
            </ListItemAvatar>
            <ListItemText
                primary={volunteer.name + ' ' + volunteer.lastName}
                secondary={volunteer.accessKey}
            />
            <div>
                <Checkbox defaultChecked />
            </div>
        </ListItem>
    );
};

export default AppointGroupVolunteerItem;

import React from "react";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IconButton } from "@mui/material";

const VolunteerAppointred = ({ volunteer }) => {

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
                <img
                    src="https://thispersondoesnotexist.com/"
                    alt="thispersondoesnotexists"
                    className="rounded-full w-14 h-14 mr-4" />
                <div>
                    <p className="text-xl text-quinary">{volunteer.name} {volunteer.lastName}</p>
                </div>
            </div>
            <IconButton
                color="primary"
                onClick={() => handleAppointment(volunteer.id)}>
                <CheckCircleOutlineIcon />
            </IconButton>
        </div>
    );
};

export default VolunteerAppointred;
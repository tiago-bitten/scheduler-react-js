import React from "react";

import HighlightOff from "@mui/icons-material/HighlightOff";
import { IconButton } from "@mui/material";

const AppointmentLine = ({ appointment }) => {

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
                <img
                    src="https://thispersondoesnotexist.com/"
                    alt="thispersondoesnotexists"
                    className="rounded-full w-14 h-14 mr-4" />
                <div>
                    <p className="text-xl text-quinary">{appointment.volunteer.name} {appointment.volunteer.lastName}</p>
                    <p className="text-sm font-semibold text-primary">
                        {appointment.ministry.name}
                    </p>
                </div>
            </div>
            <div>
                <IconButton
                    color="error"
                    onClick={() => console.log('Desmarcar')}>
                    <HighlightOff />
                </IconButton>
            </div>
        </div>
    );
};

export default AppointmentLine;
import React from "react";

import { Box, Skeleton } from "@mui/material";
import { List, ListItem } from "@mui/material";

const VolunteerMinistryModalSkeleton = () => {
    return (
        <>
            <List>
                {Array.from(new Array(5)).map((_, index) => (
                    <ListItem key={index} divider>
                        <div className="flex items-center justify-between p-1 border-b border-gray-200 animate-pulse">
                            <div className="flex items-center ml-3">
                                <Skeleton variant="circular" width={42} height={42} />
                                <div className="flex flex-col ml-5">
                                    <Skeleton variant="text" width={170} height={20} />
                                </div>
                            </div>
                        </div>
                    </ListItem>
                ))
                }
            </List>
        </>
    );
};


export default VolunteerMinistryModalSkeleton;
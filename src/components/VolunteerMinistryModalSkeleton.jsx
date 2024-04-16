import React from "react";

import { Box, Skeleton } from "@mui/material";
import { List, ListItem } from "@mui/material";

const VolunteerMinistryModalSkeleton = () => {
    return (
        <>
            <List>
                {Array.from(new Array(4)).map((_, index) => (
                    <ListItem divider>
                        <div className="flex items-center justify-between p-2 border-b border-gray-200 animate-pulse">
                            <div className="flex items-center">
                                <Skeleton variant="circular" width={44} height={44} />
                                <div className="flex flex-col ml-4">
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
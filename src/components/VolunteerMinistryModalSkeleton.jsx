import React from "react";

import { Box, Skeleton } from "@mui/material";

const VolunteerMinistryModalSkeleton = () => {
    return (
        <Box sx={{ padding: 1 }}>
            <Skeleton variant="text" width={500} height={50} />
            <Skeleton variant="text" width={500} height={50} />
            <Skeleton variant="text" width={500} height={50} />
        </Box>
    );
};

export default VolunteerMinistryModalSkeleton;
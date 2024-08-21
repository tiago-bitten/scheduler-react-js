import React from "react";
import { Skeleton } from "@mui/material";

const GroupSkeleton = () => {
    return (
        <Skeleton variant="rectangular" width="100%" height={90} sx={{ borderRadius: 3 }} />
    );
}

const GroupListSkeleton = () => {
    return (
        <>
            {
                Array.from(new Array(5)).map((_, index) => (
                    <div className="mb-4">
                        <GroupSkeleton key={index} />
                    </div>
                ))
            }
        </>
    );
}

export default GroupListSkeleton;
import React from 'react';
import { Skeleton } from '@mui/material';
import RoundButton from './RoundButton';
import Header from './Header';
import DefaultInput from './DefaultInput';

const MinistriesSkeleton = () => {
    return (
        <>
            {Array.from(new Array(7)).map((_, index) => (
                <div key={index} className="flex items-center gap-6 p-4 border-b border-gray-200">
                    <Skeleton variant="rectangular" width="30%" height={50} />
                    <Skeleton variant="text" width="30%" height={20} />
                </div>
            ))}
        </>
    );
};

export default MinistriesSkeleton;
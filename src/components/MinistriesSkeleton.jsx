import React from 'react';
import { Skeleton } from '@mui/material';
import RoundButton from './RoundButton';
import Header from './Header';
import DefaultInput from './DefaultInput';

const MinistriesSkeleton = () => {
    return (
        <>
            <Header />
            <div className="flex justify-between items-center mt-16 mx-12">
                <div className="flex flex-1 gap-4">
                    <DefaultInput label="Ministérios" id="ministerios" />
                    <DefaultInput label="Voluntários" id="voluntarios" />
                </div>
                <div>
                    <RoundButton value="CRIAR MINISTÉRIO" onClick={null} />
                </div>
            </div>
            <div className="bg-septenary p-4 mx-12 mt-12 animate-pulse">
                {Array.from(new Array(5)).map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border-b border-gray-200">
                        <Skeleton variant="rectangular" width="30%" height={50} />
                        <Skeleton variant="text" width="30%" height={20} />
                        <Skeleton variant="text" width="5%" height={20} />
                        <div className="flex items-center">
                            <Skeleton variant="circular" width={24} height={24} />
                            <Skeleton variant="circular" width={24} height={24} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MinistriesSkeleton;
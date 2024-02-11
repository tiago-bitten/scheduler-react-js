import React from 'react';
import { Skeleton } from '@mui/material';
import DefaultInput from './DefaultInput';
import RoundButton from './RoundButton';
import Switch from '@mui/material/Switch';
import Header from './Header';

const VolunteerSkeleton = () => {
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 animate-pulse">
            <div className="flex items-center">
                <Skeleton variant="circular" width={64} height={64} />
                <div className="flex flex-col ml-4">
                    <Skeleton variant="text" width={210} height={27} />
                    <Skeleton variant="text" width={150} height={24} />
                </div>
            </div>
            <div className="flex items-center">
                <Skeleton variant="rectangular" width={24} height={24} className="mx-2" />
                <Skeleton variant="rectangular" width={24} height={24} className="mx-2" />
            </div>
        </div>
    );
};

const VolunteerListSkeleton = () => {
    return (
        <>
            <Header />
            <div className="flex justify-between items-center mt-16 mx-12">
                <div className="flex flex-1 gap-4">
                    <DefaultInput label="Voluntários" id="voluntarios" />
                    <DefaultInput label="Ministérios" id="ministerios" />
                </div>
                <div>
                    <RoundButton value="CADASTRAR VOLUNTÁRIO" onClick={null} />
                </div>
            </div>
            <div className="ml-10 mt-4">
                <Switch
                    checked={null}
                    onChange={null}
                    name="checked"
                    color="primary"
                />
                <span className="text-quinary">Apenas voluntários com ministérios</span>
            </div>
            <div className="bg-septenary p-4 mx-12 mt-12 animate-pulse">
                {Array.from(new Array(10)).map((_, index) => (
                    <VolunteerSkeleton key={index} />
                ))}
            </div>
        </>
    );
};

export default VolunteerListSkeleton;

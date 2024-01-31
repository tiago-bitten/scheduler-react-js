import React from 'react';

const MinistryBox = ({ name, color, onClick }) => {
    return (
        <div className="flex justify-center items-center rounded-lg" style={{ width: 270, height: 55, backgroundColor: color }}>
            <span className="text-white hover:underline cursor-pointer">{name}</span>
        </div>
    );
};

export default MinistryBox;
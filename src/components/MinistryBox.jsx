import React from 'react';

const MinistryBox = ({ name, color, onClick }) => {
    return (
        <div
            className="flex justify-center items-center rounded-lg hover:underline cursor-pointer text-white"
            style={{ width: 270, height: 55, backgroundColor: color }}
            onClick={onClick}
        >
            <span className="text-white">{name}</span>
        </div>
    );
};

export default MinistryBox;
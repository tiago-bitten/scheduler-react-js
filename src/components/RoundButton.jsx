import React from 'react';

const RoundButton = ({ value }) => {
    return (
        <button
            className="bg-secondary text-white font-regular py-2 px-12 rounded-full hover:bg-primary transition duration-500 ease-out transform hover:scale-105 active:scale-95"
            type="button">
            {value}
        </button>
    )
}

export default RoundButton;
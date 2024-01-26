import React from 'react';

const RoundButton = ({ value, onClick }) => {
    return (
        <button
            className="bg-secondary text-white font-regular py-2 px-9 rounded-full hover:bg-primary transition duration-500 ease-out transform hover:scale-105 active:scale-95"
            type="button"
            onClick={onClick}
        >
            {value}
        </button>
    )
}

export default RoundButton;
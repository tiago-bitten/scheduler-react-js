import React from 'react';
import '../styles/DefaultInput.css';

const DefaultInput = ({ label, id }) => {
    return (
        <div className="group">
            <input type="text" id={id} className="input" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label htmlFor={id}>{label}</label>
        </div>
    );
};


export default DefaultInput;

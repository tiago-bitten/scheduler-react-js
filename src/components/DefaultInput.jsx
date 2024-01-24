import React from 'react';
import '../styles/DefaultInput.css';

const DefaultInput = ({ label, id, type }) => {
    return (
        <div className="group">
            <input type={type} id={id} className="input" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label htmlFor={id}>{label}</label>
        </div>
    );
};


export default DefaultInput;

import React from 'react';
import '../styles/DefaultInput.css';
import { Input } from 'postcss';

const DefaultInput = ({ label, id, type, onChange }) => {
    return (
        <div className="group">
            <input
                type={type}
                id={id}
                className="input"
                onChange={onChange}
                required
            />
            <span className="highlight"></span>
            <span className="bar "></span>
            <label htmlFor={id}>{label}</label>
        </div>
    );
};


export default DefaultInput;

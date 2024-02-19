import React from 'react';

const ForgotPasswordText = ({ open }) => {
    return (
        <span
            className="text-quinary text-sm hover:cursor-pointer active:opacity-75"
            onClick={open}
        >
            Esqueci minha <span className="text-tertiary"> senha</span>
        </span>
    );
};

export default ForgotPasswordText;

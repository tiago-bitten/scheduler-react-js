import React from 'react';
import LoginRightCard from '../components/LoginRightCard';

const Login = () => {
    return (
        <div className="bg-primary w-full h-screen flex justify-center items-center">
            <div className="bg-white p-10 flex items-center justify-center" style={{ width: '450px', height: '550px' }}>
                <LoginRightCard />
            </div>
        </div>
    );
};

export default Login;

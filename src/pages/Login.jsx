import React from 'react';
import LoginRightCard from '../components/LoginRightCard';
import LoginLeftCard from '../components/LoginLeftCard';

const Login = () => {
    React.useEffect(() => {
        document.title = 'Entrar';
    }, []);

    return (
        <div className="bg-primary w-full h-screen flex justify-center items-center shadow">
            <div className="bg-tertiary flex items-center justify-center" style={{ width: '450px', height: '550px' }}>
                <LoginLeftCard />
            </div>
            <div className="bg-white flex items-center justify-center" style={{ width: '450px', height: '550px' }}>
                <LoginRightCard />
            </div>
        </div>
    );
};

export default Login;

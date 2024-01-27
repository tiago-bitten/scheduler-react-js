import React from 'react';

import CreateAccountHeaderCard from '../components/CreateAccountHeaderCard';
import CreateAccountLeftCard from '../components/CreateAccountLeftCard';
import CreateAccountRightCardWait from '../components/CreateAccountRightCardWait';

const CreateAccount = () => {
    return (
        <div className="bg-primary w-full h-screen flex flex-col justify-center items-center shadow">
            <div className="bg-white flex justify-center items-center" style={{ width: '900px', height: '70px' }}>
                <CreateAccountHeaderCard />
            </div>
            <div className="flex justify-center w-full">
                <div className="bg-white" style={{ width: '450px', height: '450px', borderRight: '3px solid #D9D9D9' }}>
                    <CreateAccountLeftCard />
                </div>
                <div className="bg-white" style={{ width: '450px', height: '450px' }}>
                    <CreateAccountRightCardWait />
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;

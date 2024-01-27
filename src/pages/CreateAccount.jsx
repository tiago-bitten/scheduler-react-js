import React from 'react';

import CreateAccountLeftCard from '../components/CreateAccountLeftCard';

const CreateAccount = () => {

    return (
        <div className="bg-primary w-full h-screen flex justify-center items-center shadow">
            <div className="bg-white flex items-center justify-center" style={{ width: '450px', height: '450px' }}>
                <CreateAccountLeftCard />
            </div>
        </div>
    );
};

export default CreateAccount;
import React, { useState } from 'react';

import CreateAccountHeaderCard from '../components/CreateAccountHeaderCard';
import CreateAccountLeftCard from '../components/CreateAccountLeftCard';
import CreateAccountRightCard from '../components/CreateAccountRighCard';
import CreateAccountRightCardWait from '../components/CreateAccountRightCardWait';
import CreateAccountLeftCardFinished from '../components/CreateAccountLeftCardFinished';

const CreateAccount = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [nextStep, setNextStep] = useState(1);

    let leftCardComponent;
    let rightCardComponent;

    switch (nextStep) {
        case 1:
            leftCardComponent = <CreateAccountLeftCard
                nextStep={nextStep}
                setNextStep={setNextStep}
                setName={setName}
                setEmail={setEmail}
                setPassword={setPassword}
            />;
            rightCardComponent = <CreateAccountRightCardWait />;
            break;
        case 2:
            leftCardComponent = <CreateAccountLeftCardFinished />;
            rightCardComponent = <CreateAccountRightCard
                nextStep={nextStep}
                setNextStep={setNextStep}
                name={name}
                email={email}
                password={password}
            />;
            break;
        default:
            leftCardComponent = <CreateAccountLeftCard />;
            rightCardComponent = <CreateAccountRightCardWait />;
            break;
    }

    return (
        <div className="bg-primary w-full h-screen flex flex-col justify-center items-center shadow">
            <div className="bg-white flex justify-center items-center" style={{ width: '900px', height: '70px' }}>
                <CreateAccountHeaderCard />
            </div>
            <div className="flex justify-center w-full">
                <div className="bg-white" style={{ width: '450px', height: '450px', borderRight: '3px solid #D9D9D9' }}>
                    {leftCardComponent}
                </div>
                <div className="bg-white" style={{ width: '450px', height: '450px' }}>
                    {rightCardComponent}
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;

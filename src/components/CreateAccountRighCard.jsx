import React from 'react';
import RoundButton from './RoundButton';
import CheckboxMinistry from './CheckboxMinistry';

const ministries = [
    'ESTACIONAMENTO',
    'RECEPÇÃO',
    'AÇÃO SOCIAL',
    'DISCIPULADO',
    'ESCOLA BÍBLICA',
    'LOUVOR',
    'COMUNICAÇÃO',
    'CRIANÇAS',
    'ADOLESCENTES',
    'JOVENS',
    'ADULTOS',
    'INTERCESSÃO',
];

const CreateAccountRightCard = () => {
    const [selectedMinistries, setSelectedMinistries] = React.useState([]);

    const handleToggle = (ministry) => {
        setSelectedMinistries((prevSelected) => {
            const isAlreadySelected = prevSelected.includes(ministry);
            if (isAlreadySelected) {
                return prevSelected.filter((m) => m !== ministry);
            } 
            return [...prevSelected, ministry];
        });
    };

    const handleClick = () => {
        console.log(selectedMinistries);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="border-t-4 border-tertiary" style={{ width: '100%' }}>
                <h1 className="text-3xl mt-4 mb-8 text-center text-quinary">Ministérios</h1>
            </div>
            <div className="ministry-list mb-4 overflow-auto bg-septenary w-5/6" style={{ maxHeight: '250px' }}>
                {ministries.map((ministry) => (
                    <CheckboxMinistry
                        key={ministry}
                        ministry={ministry}
                        checked={selectedMinistries.includes(ministry)}
                        onToggle={() => handleToggle(ministry)}
                    />
                ))}
            </div>
            <RoundButton value="ENVIAR PARA ANÁLISE" onClick={() => handleClick()} />
        </div>
    );
};

export default CreateAccountRightCard;
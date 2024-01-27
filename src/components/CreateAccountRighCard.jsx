import React from 'react';
import RoundButton from './RoundButton';
import CheckboxMinistry from './CheckboxMinistry';
import { useSnackbar } from '../components/SnackBarProvider';
import { useNavigate } from 'react-router-dom';
import instance from '../config/axiosConfig';

const CreateAccountRightCard = ({ name, email, password }) => {
    const [ministries, setMinistries] = React.useState([]);
    const [selectedMinistries, setSelectedMinistries] = React.useState([]);
    const navigate = useNavigate();
    const enqueueSnackbar = useSnackbar();

    React.useEffect(() => {
        const getMinistries = async () => {
            try {
                const response = await instance.get('/ministries/signup');
                if (response.status === 200) {
                    setMinistries(response.data.ministries);
                }
            } catch (err) {
                enqueueSnackbar(err.response.data.message);
            }
        };

        getMinistries();
    }, []);

    const handleToggle = (ministry) => {
        setSelectedMinistries((prevSelected) => {
            const isAlreadySelected = prevSelected.some((m) => m.id === ministry.id);
            if (isAlreadySelected) {
                return prevSelected.filter((m) => m.id !== ministry.id);
            }
            return [...prevSelected, ministry];
        });
    };

    const handleCreateAccount = async () => {
        try {
            const response = await instance.post('/auth/signup', {
                name,
                email,
                password,
                ministries: selectedMinistries.map((m) => m.id),
            });

            if (response.status === 201) {
                enqueueSnackbar('Sua conta foi enviada para análise!');
                navigate('/analysis');
            }
        } catch (err) {
            enqueueSnackbar(err.response.data.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="border-t-4 border-tertiary" style={{ width: '100%' }}>
                <h1 className="text-3xl mt-4 mb-4 text-center text-quinary">Ministérios</h1>
            </div>
            <div className="ministry-list mb-2 overflow-auto bg-septenary w-5/6" style={{ maxHeight: '230px' }}>
                {ministries.map((ministry) => (
                    <CheckboxMinistry
                        key={ministry.id}
                        ministry={ministry.name}
                        checked={selectedMinistries.some(m => m.id === ministry.id)}
                        onToggle={() => handleToggle(ministry)}
                    />
                ))}
            </div>
            <div className="mb-8">
                <p className="text-xs text-center text-quinary" style={{ fontStyle: 'italic' }}>Selecione os ministérios que você gostaria de participar.</p>
            </div>
            <RoundButton value="ENVIAR PARA ANÁLISE" onClick={() => handleCreateAccount()} />
        </div>
    );
};

export default CreateAccountRightCard;
import React from 'react';

import instance from '../config/axiosConfig';
import { useSnackbar } from '../components/SnackBarProvider';
import { useNavigate } from 'react-router-dom';

import DefaultInput from '../components/DefaultInput';
import RoundButton from '../components/RoundButton';
import MinistryBox from '../components/MinistryBox';
import MinistryLine from '../components/MinistryLine';
import CreateMinistryModal from '../components/CreateMinistryModal';

import Header from '../components/Header';
import SearchOff from '@mui/icons-material/SearchOff';

const Ministries = () => {
    const [token] = React.useState(sessionStorage.getItem('token'));
    const [loadingToken, setLoadingToken] = React.useState(true);
    const [ministries, setMinistries] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const enqueueSnackbar = useSnackbar();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!token) {
            navigate('/entrar');
            enqueueSnackbar('Você precisa estar logado para acessar essa página!');
        }
    }, [token, navigate]);

    React.useEffect(() => {
        if (token) {
            setLoadingToken(false);
            getMinistries();
        }
    }, [token, navigate, enqueueSnackbar]);

    const getMinistries = async () => {
        try {
            const response = await instance.get('/ministries', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setMinistries(response.data.ministries);
            }

        } catch (err) {
            enqueueSnackbar(err.response.data.message);
        }
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Header />
            <div className="flex justify-between items-center mt-16 mx-12">
                <div className="flex flex-1 gap-4">
                    <DefaultInput label="Ministérios" id="ministerios" />
                    <DefaultInput label="Voluntários" id="voluntarios" />
                </div>
                <div>
                    <RoundButton value="CRIAR MINISTÉRIO" onClick={handleClick} />
                </div>
            </div>
            <div className="bg-septenary p-4 mx-12 mt-12">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="w-1/4 font-normal text-center px-4 py-2 text-quinary">Nome</th>
                            <th className="w-2/4 font-normal text-left px-10 py-2 text-quinary">Descrição</th>
                            <th className="text-center font-normal px-4 py-2 text-quinary">Voluntários</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ministries.length > 0 ? (
                            ministries.map((ministry) => (
                                <MinistryLine key={ministry.id} ministry={ministry} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center p-10">
                                    <SearchOff style={{ fontSize: 76, color: '#A0B4F0' }} />
                                    <p className="text-tertiary text-lg mt-2">Não existem ministérios cadastrados</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <CreateMinistryModal open={open} handleClose={handleClose} getMinistries={getMinistries} />
        </>
    );
};

export default Ministries;
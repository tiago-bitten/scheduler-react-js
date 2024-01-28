import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Checkbox, FormControlLabel, Button, IconButton } from '@mui/material';
import { AddAPhoto, Close } from '@mui/icons-material';
import { useSnackbar } from './SnackBarProvider';

import DefaultInput from './DefaultInput';
import CheckboxMinistry from './CheckboxMinistry';
import RoundButton from './RoundButton';

import instance from '../config/axiosConfig';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'space-between',
};

const CreateVolunteerModal = ({ open, handleClose, getVolunteers }) => {
  const [token] = React.useState(sessionStorage.getItem('token'));
  const [ministries, setMinistries] = useState([]);
  const [selectedMinistries, setSelectedMinistries] = useState([]);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [birthDate, setBirthDate] = useState('');
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
    }

    getMinistries();
  }, [])

  const handleCreateVolunteer = async () => {
    try {
      const response = await instance.post('/volunteers/create', {
        name,
        lastName,
        whatsapp,
        birthDate
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.status === 201) {
        return response.data.volunteer.id;
      }
  
    } catch (err) {
      enqueueSnackbar(err.response.data.message);
    }
  };

  const handleCreateVolunteerMinistry = async (volunteerId, ministryId) => {
    try {
      const response = await instance.post(`/volunteer-ministries/associate?volunteerId=${volunteerId}&ministryId=${ministryId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    } catch (err) {
      enqueueSnackbar(err.response.data.message);
    }
  };

  const handleClick = async () => {
    const newVolunteerId = await handleCreateVolunteer(); 
    if (newVolunteerId) {
      for (const ministry of selectedMinistries) {
        await handleCreateVolunteerMinistry(newVolunteerId, ministry.id); 
      }
      getVolunteers();
      handleClose();
      setSelectedMinistries([]);
      enqueueSnackbar('Voluntário cadastrado com sucesso!');
    } else enqueueSnackbar('Algo inesperado aconteceu.');
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleWhatsappChange = (event) => {
    setWhatsapp(event.target.value);
  };

  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
  };

  const handleToggle = (ministry) => {
    setSelectedMinistries((prevSelected) => {
      const isAlreadySelected = prevSelected.some((m) => m.id === ministry.id);
      if (isAlreadySelected) {
        return prevSelected.filter((m) => m.id !== ministry.id);
      }
      return [...prevSelected, ministry];
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="w-full">
          <h1 className="text-3xl text-quinary text-center mb-10">Dados do voluntário</h1>
          <div className="flex flex-col items-center mb-10">
            <AddAPhoto className="text-tertiary mb-2" sx={{ fontSize: 60 }} />
            <small className="text-tertiary" style={{ fontStyle: 'italic' }}>Adicionar foto</small>
          </div>
          <div className="mb-8">
            <DefaultInput label="Nome" id="nome" onChange={handleNameChange} />
          </div>
          <div className="mb-8">
            <DefaultInput label="Sobrenome" id="sobrenome" onChange={handleLastNameChange} />
          </div>
          <div className="mb-8">
            <DefaultInput label="WhatsApp" id="whatsapp" onChange={handleWhatsappChange} />
          </div>
          <div className="mb-8">
            <DefaultInput label="Data de nascimento" id="datanascimento" onChange={handleBirthDateChange} />
          </div>
        </div>
        <div className="flex flex-col items-center w-full">
          <h1 className="text-3xl text-quinary text-center mb-10">Ministérios</h1>
          <div className="w-5/6" style={{ maxHeight: '350px', marginBottom: '16px' }}>
            <div className="overflow-auto bg-septenary mb-4" style={{ maxHeight: '340px' }}>
              {ministries.map((ministry) => (
                <CheckboxMinistry
                  key={ministry.id}
                  ministry={ministry.name}
                  checked={selectedMinistries.some(m => m.id === ministry.id)}
                  onToggle={() => handleToggle(ministry)}
                />
              ))}
            </div>
          </div>
          <RoundButton value="CADASTRAR" onClick={handleClick} />
        </div>
      </Box>
    </Modal>
  );
};

export default CreateVolunteerModal;

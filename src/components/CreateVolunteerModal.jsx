import React, { useState } from 'react';
import { Modal, Box, CircularProgress, IconButton, TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { AddAPhoto, AddLink, Close } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { usePost } from '../hooks/usePost';
import { useFetch } from '../hooks/useFetch';

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
  const { enqueueSnackbar } = useSnackbar();

  const userMinistriesFetch = useFetch('/users/ministries');
  const { post } = usePost();

  const [ministries, setMinistries] = useState([]);
  const [selectedMinistries, setSelectedMinistries] = useState([]);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    userMinistriesFetch.fetch();
  }, []);

  const handleCreateVolunteer = async () => {
    try {
      const payload = {
        name,
        lastName,
        cpf,
        phone,
        birthDate
      };

      const response = await post('/volunteers/create', payload);
      if (response.status === 201) {
        return response.data.volunteer.id;
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateVolunteerMinistry = async (volunteerId, ministryId) => {
    const response = await post(`/volunteer-ministries/associate?volunteerId=${volunteerId}&ministryId=${ministryId}`)

    if (response.status === 204) {
      console.log('Ministério associado com sucesso')
    }
  };

  const handleClick = async () => {
    setIsSubmitting(true);
    try {
      const newVolunteerId = await handleCreateVolunteer();

      if (newVolunteerId) {
        const ministryPromises = selectedMinistries.map((ministry) =>
          handleCreateVolunteerMinistry(newVolunteerId, ministry.id)
        );

        await Promise.all(ministryPromises);
        getVolunteers();
        enqueueSnackbar('Voluntário cadastrado com sucesso.', { variant: 'success' });

        handleClose();
      }
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.response?.data?.message, { variant: 'error' });
    } finally {
      setIsSubmitting(false);
      resetFields();
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleCpfChange = (event) => {
    setCpf(event.target.value);
  };

  const handleWhatsappChange = (event) => {
    setPhone(event.target.value);
  };

  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
  };

  const resetFields = () => {
    setName('');
    setLastName('');
    setPhone('');
    setBirthDate('');
    setSelectedMinistries([]);
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
        {isSubmitting && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80">
            <CircularProgress size={80} />
          </div>
        )}
        <>
          <IconButton
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'grey'
            }}
          >
            <Close />
          </IconButton>
          <div className="w-full border-r-2 border-senary">
            <h1 className="text-3xl text-quinary text-center mb-10">Dados do voluntário</h1>
            <div className="flex flex-col items-center mb-4">
              <AddAPhoto className="text-tertiary mb-2" sx={{ fontSize: 60 }} />
              <small className="text-tertiary" style={{ fontStyle: 'italic' }}>Adicionar foto</small>
            </div>
            <div className="mb-8">
              <TextField
                label="Nome"
                id="name"
                variant="standard"
                onChange={handleNameChange}
                fullWidth
                required
                value={name}
                autoComplete="off"
              />
            </div>
            <div className="mb-8">
              <TextField
                label="Sobrenome"
                id="lastName"
                variant="standard"
                onChange={handleLastNameChange}
                fullWidth
                required
                value={lastName}
                autoComplete="off"
              />
            </div>
            <div className="mb-8">
              <TextField
                label="CPF"
                id="cpf"
                variant="standard"
                fullWidth
                required
                value={cpf}
                autoComplete="off"
                onChange={handleCpfChange}
              />
            </div>
            <div className="mb-8">
              <TextField
                label="Telefone"
                id="phone"
                variant="standard"
                onChange={handleWhatsappChange}
                fullWidth
                required
                value={phone}
                autoComplete="off"
              />
            </div>
            <div>
              <TextField
                label="Data de nascimento"
                id="birthDate"
                variant="standard"
                type="date"
                onChange={handleBirthDateChange}
                fullWidth
                required
                value={birthDate}
                autoComplete="off"
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <h1 className="text-3xl text-quinary text-center mb-10">Ministérios</h1>
            <div className="w-5/6" style={{ maxHeight: '350px', marginBottom: '16px' }}>
              <div className="overflow-auto bg-septenary" style={{ maxHeight: '340px' }}>
                {userMinistriesFetch.data?.ministries?.map((ministry) => (
                  <CheckboxMinistry
                    key={ministry.id}
                    ministry={ministry.name}
                    checked={selectedMinistries.some(m => m.id === ministry.id)}
                    onToggle={() => handleToggle(ministry)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-6 w-5/6">
              <p className="text-xs text-center text-quinary" style={{ fontStyle: 'italic' }}>
                Não é obrigatório selecionar os ministérios agora, você pode fazer isso depois.
              </p>
            </div>
            <RoundButton value="CADASTRAR" onClick={handleClick} />
          </div>
        </>
      </Box>
    </Modal>
  );
};

export default CreateVolunteerModal;

import React, { useState } from 'react';
import { Modal, Box, CircularProgress, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { usePost } from '../hooks/usePost';
import { useFetch } from '../hooks/useFetch';

import CreateVolunteerLeftCard from './CreateVolunteerLeftCard';
import CreateVolunteerRightCard from './CreateVolunteerRightCard';

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

  const handleClick = async () => {
    setIsSubmitting(true);
    try {
      const newVolunteerId = await handleCreateVolunteer();

      if (newVolunteerId) {
        const ministryPromises = selectedMinistries.map(async (ministry) =>
          await post(`/volunteer-ministries/associate?volunteerId=${newVolunteerId}&ministryId=${ministry.id}`)
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
    setCpf('');
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
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {isSubmitting && (
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.paper', opacity: 0.8 }}>
            <CircularProgress size={80} />
          </Box>
        )}
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: '16px', right: '16px', color: 'grey' }}
        >
          <Close />
        </IconButton>
        <CreateVolunteerLeftCard
          name={name}
          lastName={lastName}
          cpf={cpf}
          phone={phone}
          birthDate={birthDate}
          handleNameChange={handleNameChange}
          handleLastNameChange={handleLastNameChange}
          handleCpfChange={handleCpfChange}
          handleWhatsappChange={handleWhatsappChange}
          handleBirthDateChange={handleBirthDateChange}
        />
        <CreateVolunteerRightCard
          userMinistriesFetch={userMinistriesFetch}
          selectedMinistries={selectedMinistries}
          handleToggle={handleToggle}
          handleClick={handleClick}
        />
      </Box>
    </Modal >
  );
};

export default CreateVolunteerModal;

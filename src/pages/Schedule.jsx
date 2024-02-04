import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import MyCalendar from '../components/MyCalender';

import instance from '../config/axiosConfig';
import Header from '../components/Header';
import OpenScheduleModal from '../components/OpenScheduleModal';
import AppointmentModal from '../components/AppointmentModal';
import RoundButton from '../components/RoundButton';

const Schedule = () => {
    const [token] = useState(sessionStorage.getItem('token'));
    const [schedules, setSchedules] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [showOpenScheduleModal, setOpenScheduleModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
            enqueueSnackbar('Você precisa estar logado para acessar essa página.', { variant: 'error' });
            return;
        }

        fetchSchedules();
    }, [token, month, year, navigate]);

    const handleSelectDate = ({ start }) => {
        setOpenScheduleModal(true);
        setSelectedDate(start);
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setShowEventModal(true);
    }

    const handleNavigate = (date) => {
        setMonth(date.getMonth() + 1);
        setYear(date.getFullYear());
        fetchSchedules(date.getMonth() + 1, date.getFullYear());
    };

    const fetchSchedules = async () => {
        try {
            const response = await instance.get(`/schedules?month=${month}&year=${year}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                console.log(response.data);
                const schedulesData = response.data.schedules.map(schedule => ({
                    title: schedule.name,
                    start: new Date(schedule.startDate),
                    end: new Date(schedule.endDate),
                    allDay: false,
                    id: schedule.id,
                    description: schedule.description
                }));
                setSchedules(schedulesData);
            }

        } catch (err) {
            if (err.response.status === 401) {
                navigate('/entrar');
                enqueueSnackbar('Sessão expirada, faça login novamente.', { variant: 'error' });
            }
        }
    }

    return (
        <>
            <Header />
            <div className="mx-12 mt-6 text-right">
                <RoundButton value="ABRIR AGENDA" onClick={() => setOpenScheduleModal(true)} />
            </div>
            <div className="mx-12 mt-6">
                <MyCalendar
                    events={schedules}
                    onSelectSlot={handleSelectDate}
                    onSelectEvent={handleSelectEvent}
                    onNavigate={handleNavigate}
                />
            </div>
            <OpenScheduleModal
                open={showOpenScheduleModal}
                onClose={() => setOpenScheduleModal(false)}
                selectedDate={selectedDate}
                fetchSchedules={fetchSchedules}
            />
            <AppointmentModal
                open={showEventModal}
                onClose={() => setShowEventModal(false)}
                schedule={selectedEvent}
            />
        </>
    );
};

export default Schedule;
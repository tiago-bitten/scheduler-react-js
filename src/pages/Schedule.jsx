import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import MyCalendar from '../components/MyCalender';
import moment from 'moment';
import useFetch from '../hooks/useFetch';

import Header from '../components/Header';
import OpenScheduleModal from '../components/OpenScheduleModal';
import AppointmentModal from '../components/AppointmentModal';
import RoundButton from '../components/RoundButton';

const Schedule = () => {
    const { data, fetch } = useFetch(`/schedules?month=${month}&year=${year}`);
    const [schedules, setSchedules] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [showOpenScheduleModal, setOpenScheduleModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const navigate = useNavigate();

    React.useEffect(() => {
        fetch();
    }, [fetch, month, year, navigate]);

    React.useEffect(() => {
        if (data) {
            const schedulesData = data.schedules.map(schedule => ({
                title: schedule.name,
                start: new Date(schedule.startDate),
                end: new Date(schedule.endDate),
                allDay: false,
                id: schedule.id,
                description: schedule.description
            }));
            setSchedules(schedulesData);
        }
    }, [data]);

    const handleClickOpenSchedule = () => {
        setOpenScheduleModal(true);
        setSelectedDate(null);
    }

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
    };

    return (
        <>
            <Header />
            <div className="mx-12 mt-6 text-right">
                <RoundButton value="ABRIR AGENDA" onClick={handleClickOpenSchedule} />
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
                fetchSchedules={fetch}
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

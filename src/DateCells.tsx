import { useState } from 'react';

import { getDateNumber } from 'utils';
import useEvents from 'hooks/useEvents';
import { months } from './App';
import Modal from './Modal';

interface IProps {
    currentCalendarDates: Date[];
    currentCalendarMonth: number;
}

type TInput = {
    [date: number]: string;
};

export default function DateCells({ currentCalendarDates, currentCalendarMonth }: IProps) {
    const [events, setEvents] = useEvents();
    const [showInputModal, setShowInputModal] = useState(false);

    const [inputDate, setInputDate] = useState<Date>(new Date());

    const handleClickOnDate = (date: Date) => {
        setShowInputModal(true);
        setInputDate(date);
    };

    const handleOnChangeTextarea = (e: any) => {
        setEvents({
            ...events,
            [getDateNumber(inputDate)]: e.target.value
        });
    };

    return (
        <>
            {currentCalendarDates.map((currentCalendarDate) => {
                return (
                    <div
                        className={`date 
                            ${currentCalendarDate.getMonth() === currentCalendarMonth ? '' : 'greyed'}
                            ${
                                currentCalendarDate.getDate() === new Date().getDate() &&
                                currentCalendarDate.getMonth() === new Date().getMonth() &&
                                currentCalendarDate.getFullYear() === new Date().getFullYear()
                                    ? 'current-date'
                                    : ''
                            }`}
                        key={currentCalendarDate.getTime()}
                        onClick={() => handleClickOnDate(currentCalendarDate)}
                    >
                        {currentCalendarDate.getDate()} {months[currentCalendarDate.getMonth()].substring(0, 3)}
                    </div>
                );
            })}

            <Modal show={showInputModal} onClose={() => setShowInputModal(false)} closeButton>
                <div className="month-year-heading">{`${inputDate.getDate()} ${
                    months[inputDate.getMonth()]
                } ${inputDate.getFullYear()}`}</div>
                <textarea
                    className="event"
                    value={events[getDateNumber(inputDate)]}
                    onChange={handleOnChangeTextarea}
                />
            </Modal>
        </>
    );
}

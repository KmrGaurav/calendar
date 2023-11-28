import { useState } from 'react';

import useLocalStorage from 'hooks/useLocalStorage';

import { months } from './App';
import Popup from './Popup';

interface IProps {
    currentCalendarDates: Date[];
    currentCalendarMonth: number;
}

type TInput = {
    [date: number]: string;
};

export default function DateCells({ currentCalendarDates, currentCalendarMonth }: IProps) {
    const [events, setEvents] = useLocalStorage<TInput>('LOCAL_STORAGE_KEY_FOR_EVENTS', {});
    const [showInputPopup, setShowInputPopup] = useState(false);

    const [inputDate, setInputDate] = useState<Date>(new Date());

    const handleClickOnDate = (date: Date) => {
        setShowInputPopup(true);
        setInputDate(date);
    };

    const handleOnChangeTextarea = (e: any) => {
        setEvents({
            ...events,
            [getDateNumber(inputDate)]: e.target.value
        });
    };

    const getDateNumber = (date: Date) => {
        return Number(
            date.getFullYear().toString() +
                date.getMonth().toString().padStart(2, '0') +
                date.getDate().toString().padStart(2, '0')
        );
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

            <Popup show={showInputPopup} onClose={() => setShowInputPopup(false)} closeButton>
                <div className="month-year-heading">{`${inputDate.getDate()} ${
                    months[inputDate.getMonth()]
                } ${inputDate.getFullYear()}`}</div>
                <textarea
                    className="event"
                    value={events[getDateNumber(inputDate)]}
                    onChange={handleOnChangeTextarea}
                />
            </Popup>
        </>
    );
}

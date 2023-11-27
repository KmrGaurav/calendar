import { useState } from 'react';

import useLocalStorage from './useLocalStorage';
import { months } from './App';
import Popup from './Popup';

interface IProps {
  currentCalendarDates: Date[];
  currentCalendarMonth: number;
}

export default function Event({ currentCalendarDates, currentCalendarMonth }: IProps) {
  const [events, setEvents] = useLocalStorage();
  const [showInputPopup, setShowInputPopup] = useState(false);

  const [inputDate, setInputDate] = useState<Date>(new Date());

  const handleClickOnDate = (date: Date) => {
    setShowInputPopup(true);
    setInputDate(date);
  };

  const handleOnChangeTextarea = (e: any) => {
    setEvents(e.target.value);
  };

  let displayedValue = '';
  try {
    displayedValue = JSON.parse(events).event || '';
  } catch (error) {
    // Handle the error, for example, log it or set a default value
    console.error('Error parsing JSON:', error);
  }

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
        <textarea className="event" value={displayedValue} onChange={handleOnChangeTextarea} />
      </Popup>
    </>
  );
}

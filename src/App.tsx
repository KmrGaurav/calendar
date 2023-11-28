import { useEffect, useState } from 'react';

import Popup from './Popup';
import DateCells from './DateCells';

enum PopupMode {
    Month,
    Year,
    Decade,
    Century
}

export const months = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export default function App() {
    const DAYS_IN_CALENDAR_MONTH = 42;

    const getFirstDateOfCalendar = (fullYear: number, month: number) => {
        const date = new Date(fullYear, month, 1);
        // date.setDate(1);
        date.setDate(1 - date.getDay());
        return date;
    };

    const [showPopup, setShowPopup] = useState(false);
    const [popupMode, setPopupMode] = useState(PopupMode.Month);

    const [currentCalendarDates, setCurrentCalendarDates] = useState<Date[]>([]);

    const [currentCalendarYear, setCurrentCalendarYear] = useState<number>(new Date().getFullYear());
    const [currentCalendarMonth, setCurrentCalendarMonth] = useState<number>(new Date().getMonth());

    useEffect(() => {
        const firstDateOfCalendar = getFirstDateOfCalendar(currentCalendarYear, currentCalendarMonth);

        const list = [firstDateOfCalendar];
        const currentDate = new Date(firstDateOfCalendar);
        for (let i = 1; i < DAYS_IN_CALENDAR_MONTH; i++) {
            currentDate.setDate(currentDate.getDate() + 1);
            list.push(new Date(currentDate));
        }
        setCurrentCalendarDates(list);
    }, [currentCalendarYear, currentCalendarMonth]);

    const onLeftClick = () => {
        if (currentCalendarMonth === 0) {
            setCurrentCalendarYear((prev) => prev - 1);
        }
        setCurrentCalendarMonth((prev) => (prev + 11) % 12);
    };

    const onRightClick = () => {
        if (currentCalendarMonth === 11) {
            setCurrentCalendarYear((prev) => prev + 1);
        }
        setCurrentCalendarMonth((prev) => (prev + 1) % 12);
    };

    const handleMonthSelectionOnPopup = (month: number) => {
        setCurrentCalendarMonth(month);
        setShowPopup(false);
        setPopupMode(PopupMode.Month);
    };

    const handleYearSelectionOnPopup = (year: number) => {
        setCurrentCalendarYear(year);
        setPopupMode(PopupMode.Month);
    };

    return (
        <div>
            <div className="controller">
                <button onClick={onLeftClick}>&lt;</button>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <div onClick={() => setShowPopup((prev) => !prev)} className="month-year-heading">
                        {months[currentCalendarMonth]} {currentCalendarYear}
                    </div>

                    <Popup
                        show={showPopup}
                        onClose={() => {
                            setShowPopup(false);
                            setPopupMode(PopupMode.Month);
                        }}
                    >
                        {popupMode === PopupMode.Month && (
                            <>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        gap: '10px'
                                    }}
                                >
                                    <button onClick={() => setCurrentCalendarYear((prev) => prev - 1)}>&lt;</button>
                                    <div className="month-year-heading" onClick={() => setPopupMode(PopupMode.Year)}>
                                        {currentCalendarYear}
                                    </div>
                                    <button onClick={() => setCurrentCalendarYear((prev) => prev + 1)}>&gt;</button>
                                </div>
                                <div className="months-popup">
                                    {months.map((month, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="month-popup"
                                                onClick={() => handleMonthSelectionOnPopup(index)}
                                            >
                                                {month}
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                        {popupMode === PopupMode.Year && (
                            <>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        gap: '10px'
                                    }}
                                >
                                    <button onClick={() => setCurrentCalendarYear((prev) => prev - 20)}>&lt;</button>
                                    <div className="month-year-heading">
                                        {Math.floor((currentCalendarYear - 1) / 20) * 20 + 1} -{' '}
                                        {Math.floor((currentCalendarYear - 1) / 20) * 20 + 20}
                                    </div>
                                    <button onClick={() => setCurrentCalendarYear((prev) => prev + 20)}>&gt;</button>
                                </div>
                                <div className="years-popup">
                                    {Array.from(
                                        { length: 20 },
                                        (_, index) => Math.floor((currentCalendarYear - 1) / 20) * 20 + 1 + index
                                    ).map((year) => {
                                        return (
                                            <div
                                                key={year}
                                                className="year-popup"
                                                onClick={() => handleYearSelectionOnPopup(year)}
                                            >
                                                {year}
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </Popup>
                </div>
                <button onClick={onRightClick}>&gt;</button>
            </div>

            <div className="calendar">
                <div className="days-row">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => {
                        return (
                            <div className="day-heading" key={day}>
                                {day}
                            </div>
                        );
                    })}
                </div>

                <div className="dates">
                    <DateCells
                        currentCalendarDates={currentCalendarDates}
                        currentCalendarMonth={currentCalendarMonth}
                    />
                </div>
            </div>
        </div>
    );
}

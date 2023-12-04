import { useEffect, useState } from 'react';

import { getDateString } from 'utils';
import useEvents from 'hooks/useEvents';
import useTheme from 'hooks/useTheme';
import Modal from './Modal';
import DateCells from './DateCells';

enum ModalMode {
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

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState(ModalMode.Month);

    const [showEventsList, setShowEventsList] = useState(false);
    const [events] = useEvents();

    const [showThemeModal, setShowThemeModal] = useState(false);
    const [theme, setTheme] = useTheme();

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

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

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

    const handleMonthSelectionOnModal = (month: number) => {
        setCurrentCalendarMonth(month);
        setShowModal(false);
        setModalMode(ModalMode.Month);
    };

    const handleYearSelectionOnModal = (year: number) => {
        setCurrentCalendarYear(year);
        setModalMode(ModalMode.Month);
    };
    console.log(theme);
    return (
        <>
            <div>
                <div className="controller">
                    <button onClick={onLeftClick}>&lt;</button>
                    <div className="month-year-heading" onClick={() => setShowEventsList(true)}>
                        Events
                    </div>
                    <div onClick={() => setShowModal((prev) => !prev)} className="month-year-heading">
                        {months[currentCalendarMonth]} {currentCalendarYear}
                    </div>
                    <div onClick={() => setShowThemeModal((prev) => !prev)} className="month-year-heading">
                        Theme
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

            <Modal
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setModalMode(ModalMode.Month);
                }}
            >
                {modalMode === ModalMode.Month && (
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
                            <div className="month-year-heading" onClick={() => setModalMode(ModalMode.Year)}>
                                {currentCalendarYear}
                            </div>
                            <button onClick={() => setCurrentCalendarYear((prev) => prev + 1)}>&gt;</button>
                        </div>
                        <div className="months-modal">
                            {months.map((month, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="month-modal"
                                        onClick={() => handleMonthSelectionOnModal(index)}
                                    >
                                        {month}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
                {modalMode === ModalMode.Year && (
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
                        <div className="years-modal">
                            {Array.from(
                                { length: 20 },
                                (_, index) => Math.floor((currentCalendarYear - 1) / 20) * 20 + 1 + index
                            ).map((year) => {
                                return (
                                    <div
                                        key={year}
                                        className="year-modal"
                                        onClick={() => handleYearSelectionOnModal(year)}
                                    >
                                        {year}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </Modal>

            <Modal show={showEventsList} onClose={() => setShowEventsList(false)} closeButton>
                <table className="table" style={{ minWidth: '300px' }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(events).map(([date, value]) => (
                            <tr key={date}>
                                <td>{getDateString(date)}</td>
                                <td>{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal>

            <Modal show={showThemeModal} onClose={() => setShowThemeModal(false)} closeButton>
                <div style={{ width: '100px', height: '50px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '5px' }}>
                        <input
                            type="radio"
                            name="theme"
                            onChange={() => setTheme('theme-light')}
                            id="theme-light"
                            checked={theme === 'theme-light'}
                        />
                        <label htmlFor="theme-light">Light</label>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '5px' }}>
                        <input
                            type="radio"
                            name="theme"
                            onChange={() => setTheme('theme-dark')}
                            id="theme-dark"
                            checked={theme === 'theme-dark'}
                        />
                        <label htmlFor="theme-dark">Dark</label>
                    </div>
                </div>
            </Modal>
        </>
    );
}

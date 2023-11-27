import React, { useEffect, useState } from 'react';

type TInput = {};

const LOCAL_STORAGE_KEY = 'LOCAL_STORAGE_KEY';

export default function useLocalStorage(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [events, setEvents] = useState('');

  useEffect(() => {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedValue) {
      setEvents(storedValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, events);
  }, [events]);

  return [events, setEvents];
}

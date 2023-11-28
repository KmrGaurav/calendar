import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(localStorageKey: string, initialValue: T): [T, (data: T) => void] {
    const [data, setData] = useState<T>(() => {
        const storedValue = localStorage.getItem(localStorageKey);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(data));
    }, [data, localStorageKey]);

    return [data, setData];
}

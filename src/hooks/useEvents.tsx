import useLocalStorage from './common/useLocalStorage';

type TEvents = { [date: number]: string };

export default function useEvents(): [TEvents, (data: TEvents) => void] {
    const [events, setEvents] = useLocalStorage<TEvents>('LOCAL_STORAGE_KEY_FOR_EVENTS', {});

    return [events, setEvents];
}

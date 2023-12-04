import useLocalStorage from './common/useLocalStorage';

type TTheme = 'theme-light' | 'theme-dark';

export default function useTheme(): [TTheme, (data: TTheme) => void] {
    const [theme, setTheme] = useLocalStorage<TTheme>('LOCAL_STORAGE_KEY_FOR_THEME', 'theme-light');

    return [theme, setTheme];
}

import { createTheme } from '@mui/material/styles';

export const getTheme = (direction: 'ltr' | 'rtl', color: string) =>
    createTheme({
        direction,
        palette: {
            mode: 'light',
            primary: { main: color ?? '#1976d2' },
        },
        typography: {
            fontFamily: direction === 'rtl' ? 'Cairo, sans-serif' : 'Roboto, sans-serif',
        },
    });

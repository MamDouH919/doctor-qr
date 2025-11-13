'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    direction: 'rtl',

    shape: {
        borderRadius: 15,
    },
    typography: {
        fontFamily: 'var(--font-cairo)',
    },
});

export default theme;

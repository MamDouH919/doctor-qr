"use client"
import React, { useContext } from 'react'
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ClientContext } from '@/Providers/contexts/ClientContext';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ThemeProviderRTL = ({ children }: { children: React.ReactNode }) => {
    const context = useContext(ClientContext);

    const theme = createTheme({
        direction: 'rtl',
        cssVariables: true,
        palette: {
            primary: {
                main: context?.state.clientData?.color || "#000",
            },
        },
        shape: {
            borderRadius: 10,
        },
        typography: {
            fontFamily: 'var(--font-cairo)',
        },
    });

    return (
        <AppRouterCacheProvider
            options={{
                key: context?.state.clientData?.lang === "ar" ? "muirtl" : "mui",
                stylisPlugins: context?.state.clientData?.lang === "ar" ? [prefixer, rtlPlugin] : [],
            }}
        >
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}

export default ThemeProviderRTL
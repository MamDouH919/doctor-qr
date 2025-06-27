// "use client"
// import { prefixer } from "stylis";
// import rtlPlugin from "stylis-plugin-rtl";
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Toaster } from "sonner";

// const ThemeProviderRTL = ({ children, data }: { children: React.ReactNode, data: any }) => {
//     const theme = createTheme({
//         direction: data?.lang === "ar" ? "rtl" : "ltr",
//         cssVariables: true,
//         palette: {
//             primary: {
//                 main: data?.color || "#000",
//             },
//         },
//         shape: {
//             borderRadius: 10,
//         },
//         typography: {
//             fontFamily: 'var(--font-cairo)',
//         },
//     });

//     return (
//         <AppRouterCacheProvider
//             options={{
//                 key: data?.lang === "ar" ? "muirtl" : "mui",
//                 stylisPlugins: data?.lang === "ar" ? [prefixer, rtlPlugin] : [],
//             }}
//         >
//             <ThemeProvider theme={theme}>
//                 <Toaster richColors toastOptions={{
//                     style: {
//                         fontFamily: [`cairo`, "sans-serif"].join(","),
//                         fontSize: 12.5,
//                     },
//                 }}
//                 />
//                 {children}
//             </ThemeProvider>
//         </AppRouterCacheProvider>
//     )
// }

// export default ThemeProviderRTL


// app/layout.tsx or pages/_app.tsx
'use client';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useEffect, useMemo } from 'react';
import createEmotionCache from '@/lib/createEmotionCache';
import { getTheme } from '@/lib/theme';

export default function RootLayoutMui({
    children,
    direction,
    color,
}: {
    children: React.ReactNode,
    direction: 'ltr' | 'rtl',
    color: string
}) {
    const cache = useMemo(() => createEmotionCache(direction === 'rtl'), [direction]);
    const theme = useMemo(() => getTheme(direction, color), [direction, color]);

    useEffect(() => {
        document.body.dir = direction;
    }, [direction]);

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
}

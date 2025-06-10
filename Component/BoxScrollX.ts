
"use client";
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BoxScrollX = styled(Box)(({ theme }) => ({
    display: "grid",
    gridAutoFlow: "column", /* Forces items to be laid out in a single row */
    gridGap: "10px", /* Optional: Adds spacing between items */
    overflowX: "scroll", /* Allows horizontal scrolling if items overflow */
    whiteSpace: "nowrap",
    width: "100%",
    paddingBottom: theme.spacing(1),
    MsOverflowStyle: "none", /* Internet Explorer 10+ */
    "&::-webkit-scrollbar": {
        display: "none"
    },
    justifyContent: "start",
    padding: theme.spacing(2),
}));
import { styled } from "@mui/material/styles";

export const Title = styled("h2")(({ theme }) => ({
    textAlign: "center",
    marginBottom: theme.spacing(0.5),
    fontSize: "2rem",
    fontWeight: "bold",
    color: theme.palette.text.primary,
    [theme.breakpoints.up("sm")]: {
        fontSize: "2.5rem",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "3rem",
    },
}));
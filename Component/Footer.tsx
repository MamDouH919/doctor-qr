import { Paper, Stack, Typography } from "@mui/material"
import CopyrightIcon from '@mui/icons-material/Copyright';
import { styled } from "@mui/material/styles";
import translate from "@/lib/Translate";
import { ClientContext } from "@/Providers/contexts/ClientContext";
import { useContext } from "react";

const ImageStyle = styled("img")(() => ({
    width: "100%",
    height: "30px !important"
}));

const LinkStyle = styled("a")(() => ({
    display: "flex",
    alignItems: "center",
}));

const Footer = () => {
    const context = useContext(ClientContext);
    return (
        <Stack component={Paper} position={"relative"} zIndex={11} spacing={2}>
            <Stack gap={1} direction={"row"} justifyContent={"center"} alignItems={"center"} flexWrap={"wrap"} py={3} px={2}>
                <CopyrightIcon />
                <Typography variant='body1' fontSize={"16px"}>
                    {translate[context?.state.clientData?.lang as "ar" | "en"]["copyright"]}
                </Typography>
                <LinkStyle href='https://mountain-egy.site/' rel="noopener noreferrer" target="_blank">
                    <ImageStyle src={"/logo.webp"} alt="mountain" width="100%" />
                </LinkStyle>
            </Stack>
        </Stack>
    )
}

export default Footer
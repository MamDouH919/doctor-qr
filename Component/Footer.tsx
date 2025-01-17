import { Paper, Stack, Typography } from "@mui/material"
import CopyrightIcon from '@mui/icons-material/Copyright';
import Mountain from '@/assets/logo.webp'
import { styled } from "@mui/material/styles";
import translate from "@/lib/Translate";
import { ClientContext } from "@/Providers/contexts/ClientContext";
import { useContext } from "react";

const ImageStyle = styled("img")(() => ({
    width: "100%",
    height: "40px !important"
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
                <a href='https://mountain-egy.site/' rel="noopener noreferrer" target="_blank">
                    {/* <ImageStyle src={Mountain} alt="mountain" width="100%" /> */}
                </a>
            </Stack>
        </Stack>
    )
}

export default Footer
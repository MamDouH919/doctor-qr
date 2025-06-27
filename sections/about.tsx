"use client"
import { useContext } from "react";
import {
    Typography,
    Container,
    Box,
    Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import translate from "@/lib/Translate";
import Circles from "@/Component/Circles";
import { Title } from "@/Component/Title";
import Line from "@/Component/Line";
import { ClientContext } from "@/Providers/contexts/ClientContext";


const AboutSection = styled(Box)(({ theme }) => ({
    overflow: "hidden",
    padding: theme.spacing(2, 0),
    position: "relative",
}));


const About = () => {
    const context = useContext(ClientContext);
    return (
        <AboutSection id="about">
            <Circles right="20%" bottom="25px" />
            <Container>
                <Stack spacing={2} alignItems={"center"} position={"relative"} zIndex={11}>
                    <Box textAlign="center">
                        <Title>
                            {translate[context?.state.clientData?.lang as "ar" | "en"]["About"]}
                        </Title>
                        <Line />
                    </Box>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        textAlign={"center"}
                    >
                        {context?.state.clientData?.about}
                    </Typography>
                </Stack>
            </Container>
        </AboutSection>
    )
}

export default About
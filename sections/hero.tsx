"use client"
import {
    Typography,
    Button,
    Container,
    Grid2 as Grid,
    Stack,
    Chip,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import translate from "@/lib/Translate";
import Circles from "@/Component/Circles";
import Social from "@/Component/Social";
import { ClientContext } from "@/Providers/contexts/ClientContext";
import { useContext } from "react";
// import Image from "next/image";


// Custom theme with primary color

// Styled components
const HeroSection = styled("section")(({ theme }) => ({
    position: "relative",
    padding: theme.spacing(2, 0),
    overflow: "hidden",
}));


const StackStyle = styled(Stack)(({ theme }) => ({
    alignItems: "center",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
        alignItems: "flex-start",
        textAlign: "left",
    },
}));

const PlayArrowAr = styled(PlayArrow)(() => ({
    rotate: "-180deg",
}));


// const ImageStyle = styled(Image)(() => ({
//     width: "100%",
//     height: "100%",
//     objectFit: "contain",
//     // WebkitTransform: theme.direction === "rtl" ? "scaleX(-1)" : "none",
//     // transform: theme.direction === "rtl" ? "scaleX(-1)" : "none",
//     // WebkitFilter: "drop-shadow(2px 1px 5px #222)",
//     // filter: "drop-shadow(2px 1px 5px #222)",
// }));

// const ImageWrapper = styled(Box)(({ theme }) => ({
//     height: 450,
//     width: 350,
//     border: `5px solid ${theme.palette.primary.main}`,
//     position: "relative",
//     borderRadius: "10px",
// }))

// const BoxStyle = styled(Box)(({ theme }) => ({
//     boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
//     borderRadius: "10px",
//     background: theme.palette.background.default,
//     position: "absolute",
//     top: -15,
//     right: 15,
//     height: "100%",
//     width: "100%",
// }))


const Hero = () => {
    const context = useContext(ClientContext);
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (!element) {
            return
        }
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: "center" });
        }
    };
    return (
        <HeroSection >
            <Circles bottom="25px" />
            <Container>
                <Grid container spacing={2} alignItems={"center"} zIndex={11} position={"relative"} mt={5}>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <StackStyle spacing={2}>
                            <Chip label={translate[context?.state.clientData?.lang as "ar" | "en"]["innovativeMedicine"]} variant="outlined" color="primary" />
                            <Typography variant="h1" fontSize={32} fontWeight={700} color="primary">
                                {'"' + context?.state.clientData?.siteName + '" '}
                            </Typography>
                            <Typography
                                variant="h3"
                                fontSize={40}
                                gutterBottom
                                fontWeight={700}
                            >
                                {context?.state.clientData?.title}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" gutterBottom>
                                {context?.state.clientData?.description}
                            </Typography>
                            <Social social={context?.state.clientData?.social} />
                            <Stack gap={2} direction={"row"} justifyContent={"center"} alignItems={"center"} flexWrap={"wrap"}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => scrollToSection("videos")}
                                    startIcon={context?.state.clientData?.lang === "ar" ? null : <PlayArrow />}
                                    endIcon={context?.state.clientData?.lang === "ar" ? <PlayArrowAr /> : null}
                                >
                                    {translate[context?.state.clientData?.lang as "ar" | "en"]["watchVideos"]}
                                </Button>
                            </Stack>
                        </StackStyle>
                    </Grid>
                    <Grid
                        mt={{ xs: 4, md: 0 }}
                        size={{ xs: 12, md: 6 }}
                        display={"flex"}
                        justifyContent={{ md: "flex-end", xs: "center" }}
                    >
                        {/* <ImageWrapper>
                  <BoxStyle height={450} width={350}>
                    <ImageStyle
                      property="og:image"
                      src={context?.state.clientData?.image ?? "/logo.webp"}
                      alt={context?.state.clientData?.siteName ?? "Doctor"}
                      height={10000}
                      width={10000}
                    />
                  </BoxStyle>
                </ImageWrapper> */}
                        {/* <Stack justifyContent={"center"} alignItems={"center"}>
                  <ImageStyle
                    property="og:image"
                    src={context?.state.clientData?.image ?? "/logo.webp"}
                    alt={context?.state.clientData?.name ?? "Doctor"}
                    width={500}
                    height={500}
                    objectFit="contain"
                  />
                </Stack> */}
                    </Grid>
                </Grid>
            </Container>
        </HeroSection>
    )
}

export default Hero
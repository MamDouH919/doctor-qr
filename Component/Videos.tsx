import { Box, Container, Grid2 as Grid, Stack, Typography } from "@mui/material";
import Circles from "./Circles";
import { Title } from "./Title";
import Line from "./Line";
import translate from "@/lib/Translate";
import { useContext } from "react";
import { ClientContext } from "@/Providers/contexts/ClientContext";

export function VideosSection() {
    const context = useContext(ClientContext);
    return (
        <Stack component={"section"} id="videos" position={"relative"} zIndex={11} py={0.5} overflow={"hidden"}>
            <Circles right="20%" bottom="25px" />
            <Container>
                <Stack position={"relative"} zIndex={11} spacing={2}>
                    <Box textAlign="center">
                        <Title>
                            {translate[context?.state.clientData?.lang as "ar" | "en"]["Videos"]}
                        </Title>
                        <Line />
                    </Box>
                    <Grid container spacing={2} minHeight={300}>
                        {context?.state.clientData?.videos && context?.state.clientData?.videos.length > 0 ? (
                            context?.state.clientData?.videos.map((video, index) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={"https://youtube.com/embed/dQw4w9WgXcQ"}
                                        title={video.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="h6" color="text.secondary">
                                {translate[context?.state.clientData?.lang as "ar" | "en"]["NoVideos"]}
                            </Typography>
                        )}
                    </Grid>
                </Stack>
            </Container>
        </Stack>
    )
}


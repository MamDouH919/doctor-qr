import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Container,
    Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext } from "react";
import { ClientContext } from "@/Providers/contexts/ClientContext";
import translate from "@/lib/Translate";
import Circles from "@/Component/Circles";
import { Title } from "@/Component/Title";
import Line from "@/Component/Line";

export function FAQSection() {
    const context = useContext(ClientContext);

    return (
        <Box
            component="section"
            id="faq"
            position={"relative"}
            py={2}
            overflow={"hidden"}
        >
            <Circles right="20%" bottom="25px" />
            <Container>
                <Stack spacing={2} zIndex={11} position={"relative"}>
                    <Box textAlign="center">
                        <Title>
                            {translate[context?.state.clientData?.lang as "ar" | "en"]["FAQTitle"]}
                        </Title>
                        <Line />
                    </Box>

                    {context?.state.clientData?.faqs && context?.state.clientData?.faqs.length > 0 ? (
                        context?.state.clientData?.faqs.map((faq, index) => (
                            <Accordion key={index} sx={{ mb: 2 }} defaultExpanded={index === 0}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`${index}-content`}
                                    id={`${index}-header`}
                                >
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {faq.question}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body2">{faq.answer}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    ) : (
                        <Typography
                            textAlign="center"
                            color="text.secondary"
                            variant="body1"
                        >
                            No FAQs available at the moment.
                        </Typography>
                    )}
                </Stack>
            </Container>
        </Box>
    );
}

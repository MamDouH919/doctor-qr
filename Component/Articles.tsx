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
import { Title } from "./Title";
import Line from "./Line";
import Circles from "./Circles";
import translate from "@/lib/Translate";
import { useContext } from "react";
import { ClientContext } from "@/Providers/contexts/ClientContext";

export function ArticlesSection() {
  const context = useContext(ClientContext);

  return (
    <Box
      component="section"
      id="articles"
      position={"relative"}
      py={2}
    >
      <Circles right="20%" bottom="1px" />
      <Container>
        <Stack spacing={2} zIndex={11} position={"relative"}>
          <Box textAlign="center">
            <Title>
              {translate[context?.state.clientData?.lang as "ar" | "en"]["Articles"]}
            </Title>
            <Line />
          </Box>

          {context?.state.clientData?.articles && context?.state.clientData?.articles.length > 0 ? (
            context?.state.clientData?.articles.map((article, index) => (
              <Accordion key={index} sx={{ mb: 2 }} defaultExpanded={index === 0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${index}-content`}
                  id={`${index}-header`}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {article.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">{article.description}</Typography>
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

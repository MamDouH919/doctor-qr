import { Box, Container, Typography, Card, CardContent, Avatar, Rating, Paper, Button, Stack } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Star } from "@mui/icons-material"
import { BoxScrollX } from "./BoxScrollX"
import { Title } from "./Title"
import translate from "@/lib/Translate"
import { ClientContext } from "@/Providers/contexts/ClientContext"
import { useContext, useState } from "react"
import Circles from "./Circles"
import Line from "./Line"
import CustomDialog from "./CustomDialog"
import ControlMUITextField from "./ControlMUItextField"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const StyledCard = styled(Card)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: theme.shadows[8],
    },
    width: "400px",
}))

const PaperStyle = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4, 0),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.spacing(1.5),
}))

const QuoteIcon = styled(Box)(({ theme }) => ({
    fontSize: "3rem",
    color: theme.palette.primary.main,
    opacity: 0.3,
    lineHeight: 1,
    fontFamily: "serif",
}))

const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function TestimonialsSection() {
    const context = useContext(ClientContext);
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<number | null>(2);
    const [hover, setHover] = useState(-1);

    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const { control, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        setLoading(true);
        // make a POST request to your API endpoint
        fetch('/api/testimonials/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                phone: data.phone,
                email: data.email,
                comment: data.about,
                rate: value,
                domain: context?.state.clientData?.domain,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'duplicate') {
                    console.log(data);
                    
                    // TODO: Add "DuplicateTestimonial" to translation files
                    toast.error(translate[context?.state.clientData?.lang as "ar" | "en"][data.message as keyof typeof translate["en"]]);
                } else {
                    toast.success(translate[context?.state.clientData?.lang as "ar" | "en"]["TestimonialAddedSuccessfully"]);
                    setOpen(false);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                // TODO: Add "TestimonialError" to translation files
                toast.error("Failed to submit testimonial. Please try again later.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Box
            component="section"
            id="testimonials"
            position={"relative"}
            py={2}
        >
            <CustomDialog
                open={open}
                handleClose={handleClose}
                title={translate[context?.state.clientData?.lang as "ar" | "en"]["WriteYourOpinion"]}
                maxWidth='sm'
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit(onSubmit),
                    noValidate: true
                }}
                content={
                    <Stack spacing={2} alignItems={"center"} width={"100%"}>
                        <Stack spacing={2} width={"100%"} component={"form"} onSubmit={handleSubmit(onSubmit)}>
                            <Stack direction={"row"} spacing={2} alignItems={"center"}>
                                <Rating
                                    name="hover-feedback"
                                    value={value}
                                    precision={0.5}
                                    getLabelText={getLabelText}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                    emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {value !== null && (
                                    <Box sx={{ ml: 2 }}>
                                        {translate[context?.state.clientData?.lang as "ar" | "en"][labels[hover !== -1 ? hover : value] as keyof typeof translate["en"]]}
                                    </Box>
                                )}
                            </Stack>
                            <ControlMUITextField
                                label={translate[context?.state.clientData?.lang as "ar" | "en"]["Name"]}
                                control={control}
                                name="name"
                                rules={{ required: translate[context?.state.clientData?.lang as "ar" | "en"]["ThisFieldIsRequired"] }}
                            />
                            <ControlMUITextField
                                label={translate[context?.state.clientData?.lang as "ar" | "en"]["ِEmail"]}
                                control={control}
                                name="email"
                                rules={{ required: translate[context?.state.clientData?.lang as "ar" | "en"]["ThisFieldIsRequired"] }}
                            />
                            <ControlMUITextField
                                label={translate[context?.state.clientData?.lang as "ar" | "en"]["Phone"]}
                                control={control}
                                name="phone"
                                rules={{ required: translate[context?.state.clientData?.lang as "ar" | "en"]["ThisFieldIsRequired"] }}
                            />
                            <ControlMUITextField
                                label={translate[context?.state.clientData?.lang as "ar" | "en"]["YourComment"]}
                                control={control}
                                name="about"
                                rows={4}
                                multiline
                                rules={{ required: translate[context?.state.clientData?.lang as "ar" | "en"]["ThisFieldIsRequired"] }}
                            />
                        </Stack>

                    </Stack>
                }
                buttonAction={
                    <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        loading={loading}
                    >
                        {translate[context?.state.clientData?.lang as "ar" | "en"]["Save"]}
                    </Button>
                }
            />
            <Circles right="20%" bottom="1px" />
            <Container maxWidth="lg">
                <Stack spacing={2} zIndex={11} position={"relative"}>

                    <Box textAlign="center">
                        <Title>
                            {translate[context?.state.clientData?.lang as "ar" | "en"]["Testimonials"]}
                        </Title>
                        <Line />
                    </Box>

                    {context?.state.clientData?.testimonials && context?.state.clientData?.testimonials.length > 0 &&
                        <BoxScrollX>
                            {context?.state.clientData?.testimonials.map((testimonial) => (
                                <StyledCard elevation={2} key={testimonial._id}>
                                    <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                                        {/* Quote Icon */}
                                        <QuoteIcon>&quot;</QuoteIcon>

                                        {/* Testimonial Description */}
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                mb: 3,
                                                flexGrow: 1,
                                                fontStyle: "italic",
                                                lineHeight: 1.6,
                                                textWrap: "wrap",
                                            }}
                                        >
                                            {testimonial.comment}
                                        </Typography>

                                        {/* Rating */}
                                        <Box>
                                            <Rating value={testimonial.rate} readOnly size="small" />
                                        </Box>

                                        {/* Customer Info */}
                                        <Stack direction={"row"} spacing={2} alignItems={"center"}>
                                            <Avatar >
                                                {testimonial.name.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {testimonial.name}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </StyledCard>
                            ))}
                        </BoxScrollX>}
                    {/* Call to Action */}
                    <Box textAlign="center" mt={6}>
                        <PaperStyle
                            elevation={1}
                        >
                            <Stack spacing={2} alignItems={"center"} width={"100%"}>
                                <Typography variant="h5" gutterBottom fontWeight="bold">
                                    {translate[context?.state.clientData?.lang as "ar" | "en"]["WeCareAboutYourOpinion"]}
                                </Typography>
                                <Typography variant="body1">
                                    {translate[context?.state.clientData?.lang as "ar" | "en"]["ShareYourThoughtsAndHelpOthers"]}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleOpen}
                                >
                                    {translate[context?.state.clientData?.lang as "ar" | "en"]["WriteYourReviewAndRateTheDoctor"]}
                                </Button>
                            </Stack>
                        </PaperStyle>
                    </Box>
                </Stack>

            </Container>
        </Box>
    )
}

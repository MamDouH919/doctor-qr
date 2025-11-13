import {
    Box,
    Typography,
    Grid2 as Grid,
    Paper,
    Button,
    Chip,
    Tabs,
    Tab,
    Container,
    Avatar,
    Stack,
} from "@mui/material";
import {
    Call as PhoneCallIcon,
    Phone as PhoneIcon,
    Navigation as NavigationIcon,
    CalendarToday as CalendarIcon,
    AccessTime as ClockIcon,
    LocationOn as MapPinIcon,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import { ClientContext } from "@/Providers/contexts/ClientContext";

import { styled } from "@mui/material/styles";
import Circles from "@/Component/Circles";
import { Title } from "@/Component/Title";
import Line from "@/Component/Line";
import translate from "@/lib/Translate";
import Link from "next/link";

const TabsStyle = styled(Tabs)(({ theme }) => ({
    "& .MuiTabs-flexContainer": {
        justifyContent: "center",
        gap: theme.spacing(2),
    },
    // when indicator is active make background color green

}));

const TabStyle = styled(Tab)(() => ({
    // Common styles for all tabs
    fontWeight: "bold",
    fontSize: "1rem",
}));

const LinkStyle = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.main,
    "&:hover": {
        textDecoration: "underline",
        color: theme.palette.primary.main,
        cursor: "pointer",
    }
}))

const formatDay = (day: string) => {
    const days: { [key: string]: string } = {
        sunday: "الأحد",
        monday: "الإثنين",
        tuesday: "الثلاثاء",
        wednesday: "الأربعاء",
        thursday: "الخميس",
        friday: "الجمعة",
        saturday: "السبت",
    }
    return days[day.toLowerCase()] || day
}

const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "مساءً" : "صباحاً"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
}

const calculateDuration = (timeFrom: string, timeTo: string) => {
    const [fromHours, fromMinutes] = timeFrom.split(":").map(Number)
    const [toHours, toMinutes] = timeTo.split(":").map(Number)
    const fromTotalMinutes = fromHours * 60 + fromMinutes
    const toTotalMinutes = toHours * 60 + toMinutes
    const durationMinutes = toTotalMinutes - fromTotalMinutes
    const hours = Math.floor(durationMinutes / 60)
    return `${hours} ساعات`
}

export default function ClinicTabs() {
    const context = useContext(ClientContext);
    const [selectedTab, setSelectedTab] = useState(0);



    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const handleCall = (phone: string) => {
        window.open(`tel:${phone}`, "_self");
    };

    const handleGetDirections = ({
        governorate,
        address,
        city,
    }: {
        governorate: string;
        address: string;
        city: string;
    }) => {
        const location = governorate + " " + city + " " + address;
        window.open(`https://www.google.com/maps/search/${encodeURIComponent(location)}`, "_blank");
    };

    return (
        <Box
            component="section"
            id="articles"
            position={"relative"}
            py={2}
        >
            <Circles right="20%" bottom="1px" />
            <Container component={Stack} spacing={4}>
                <Box textAlign="center">
                    <Title>
                        {translate[context?.state.clientData?.lang as "ar" | "en"]["Clinics"]}
                    </Title>
                    <Line />
                </Box>
                {context?.state.clientData?.clinics && context?.state.clientData?.clinics.length > 0 ? <Stack spacing={4} zIndex={11} position={"relative"}>
                    <TabsStyle
                        value={selectedTab}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="Clinic Tabs"
                    >
                        {context?.state.clientData?.clinics.map((clinic: any) => (
                            <TabStyle key={clinic._id} label={clinic.name} />
                        ))}
                    </TabsStyle>

                    {context?.state.clientData?.clinics.map((clinic, index: number) => (
                        <Box
                            key={clinic._id}
                            role="tabpanel"
                            hidden={selectedTab !== index}
                            sx={{ mt: 4 }}
                        >
                            {selectedTab === index && (
                                <Grid container spacing={4}>
                                    {/* Clinic Location */}
                                    <Grid size={{ xs: 12, lg: 6 }}>
                                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                                            <Avatar
                                                sx={{
                                                    backgroundColor: "primary.main",
                                                }}
                                            >
                                                <MapPinIcon fontSize="medium" />
                                            </Avatar>
                                            <Typography variant="h6" fontWeight="bold" color="text.primary">
                                                موقع العيادة
                                            </Typography>
                                        </Box>

                                        <Paper
                                            component={Stack}
                                            spacing={2}
                                            p={3}
                                            elevation={3}
                                        >
                                            {/* <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                {clinic.name}
                                            </Typography> */}
                                            <Typography color="text.secondary" gutterBottom>
                                                {clinic.governorate.name[context?.state.clientData?.lang as "ar" | "en"] + " "}
                                                - {clinic.city.name[context?.state.clientData?.lang as "ar" | "en"]}
                                            </Typography>

                                            <Typography color="text.secondary" gutterBottom>
                                                {clinic.address}
                                            </Typography>

                                            <Box display="flex" alignItems="center" gap={1} mb={2}>
                                                <PhoneIcon fontSize="small" color="action" />
                                                <LinkStyle href={`tel:${clinic.phone}`}>
                                                    <Typography variant="body1">{clinic.phone.replace("+2", "")}</Typography>
                                                </LinkStyle>
                                            </Box>
                                            <Box display="flex" alignItems="center" gap={1} mb={2}>
                                                <PhoneIcon fontSize="small" color="action" />
                                                <LinkStyle href={`tel:${clinic.phone}`}>
                                                    <Typography variant="body1">{clinic.phone.replace("+2", "")}</Typography>
                                                </LinkStyle>
                                            </Box>

                                            <Grid container spacing={2}>
                                                <Grid size={{ xs: 6 }}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        fullWidth
                                                        startIcon={<PhoneCallIcon />}
                                                        onClick={() => handleCall(clinic.mobile)}
                                                    >
                                                        اتصل بالعيادة
                                                    </Button>
                                                </Grid>
                                                <Grid size={{ xs: 6 }}>
                                                    <Button
                                                        variant="outlined"
                                                        fullWidth
                                                        onClick={() =>
                                                            handleGetDirections({
                                                                governorate: clinic.governorate.name[context?.state.clientData?.lang as "ar" | "en"],
                                                                address: clinic.address,
                                                                city: clinic.city.name[context?.state.clientData?.lang as "ar" | "en"],
                                                            })
                                                        }
                                                        startIcon={<NavigationIcon />}
                                                        sx={{
                                                            color: "green.600",
                                                            borderColor: "green.600",
                                                            "&:hover": {
                                                                backgroundColor: "green.50",
                                                            },
                                                        }}
                                                    >
                                                        الاتجاهات
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>

                                    {/* Clinic Appointments */}
                                    <Grid size={{ xs: 12, lg: 6 }}>
                                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                                            <Avatar
                                                sx={{
                                                    backgroundColor: "primary.main",
                                                }}
                                            >
                                                <CalendarIcon fontSize="small" />
                                            </Avatar>
                                            <Typography variant="h6" fontWeight="bold" color="text.primary">
                                                مواعيد الكشف
                                            </Typography>
                                        </Box>

                                        <Box display="flex" flexDirection="column" gap={2}>
                                            {clinic.appointments.map((appointment: any) => (
                                                <Paper
                                                    key={appointment._id}
                                                    elevation={3}
                                                    component={Stack}
                                                    spacing={2}
                                                    p={3}
                                                >
                                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                                        <Chip
                                                            label={formatDay(appointment.day)}
                                                            color="primary"
                                                        />
                                                        <Box display="flex" alignItems="center" gap={1} color="blue.700">
                                                            <ClockIcon fontSize="small" />
                                                            <Typography fontWeight="medium">متاح للكشف</Typography>
                                                        </Box>
                                                    </Box>

                                                    <Box textAlign="center">
                                                        <Typography variant="h5" fontWeight="bold" color="text.primary" mb={1}>
                                                            {formatTime(appointment.timeFrom)} - {formatTime(appointment.timeTo)}
                                                        </Typography>
                                                        <Typography color="text.secondary">
                                                            مدة الكشف: {calculateDuration(appointment.timeFrom, appointment.timeTo)}
                                                        </Typography>
                                                    </Box>
                                                </Paper>
                                            ))}
                                        </Box>
                                    </Grid>
                                </Grid>
                            )}
                        </Box>
                    ))}
                </Stack> : <Typography>
                        No Clinics Available
                    </Typography>}
            </Container>
        </Box>
    );
}

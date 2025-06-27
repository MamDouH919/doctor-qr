"use client";
import { useContext, useState } from "react";
import {
    Toolbar,
    Typography,
    Button,
    IconButton,
    Container,
    Grid2 as Grid,
    Box,
    Stack,
    Menu,
    MenuItem,
    AppBar,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import CustomDialog from "@/Component/CustomDialog";
import SocialCard from "@/Component/SocialCard";
import translate from "@/lib/Translate";
import { ClientContext } from "@/Providers/contexts/ClientContext";

// import Image from "next/image";

const AppBarStyle = styled(AppBar)(() => ({
    position: 'sticky',
    top: '0',
    zIndex: 50,
    width: '100%',
    backgroundColor: 'rgba(var(--background), 0.95)', // Tailwind `bg-background/95`
    backdropFilter: 'blur(10px)', // Tailwind `backdrop-blur`
    '@supports (backdrop-filter: blur(10px))': {
        backgroundColor: 'rgba(var(--background), 0.6)', // Tailwind `supports-[backdrop-filter]:bg-background/60`
    },
}));

const AppBarComponent = () => {
    const context = useContext(ClientContext);
    console.log("context", context);
    

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (!element) {
            return
        }
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: "center" });
        }

        setTimeout(() => {
            handleCloseNavMenu()
        }, 800);
    };

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <>
            {open && <CustomDialog
                open={open}
                handleClose={handleClose}
                title={translate[context?.state.clientData?.lang as "ar" | "en"]["onlineConsultation"]}
                maxWidth='xs'
                content={
                    <Stack p={2} spacing={2} alignItems={"center"}>
                        <Grid container spacing={2} m={0} width={"100%"}>
                            <Grid size={{ xs: 12 }}>
                                <SocialCard
                                    to={`tel:${context?.state.clientData?.phone ?? ""}`}
                                    type={"phone"}
                                    title={context?.state.clientData?.phone.replace("+2", "") ?? ""}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <SocialCard
                                    to={`https://wa.me:${context?.state.clientData?.whatsApp ?? ""}`}
                                    type={"whatsApp"}
                                    title={context?.state.clientData?.whatsApp.replace("+2", "") ?? ""}
                                />
                            </Grid>
                        </Grid>
                    </Stack>
                }
            />}
            {/* Navigation */}
            <AppBarStyle position="sticky" color="inherit" elevation={1}>
                <Toolbar>
                    <Container>
                        <Stack direction="row" alignItems="center" spacing={2} >
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                {context?.state.clientData?.siteName}
                            </Typography>
                            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                                <Button color="inherit" onClick={() => scrollToSection("about")}>
                                    {translate[context?.state.clientData?.lang as "ar" | "en"]["About"]}
                                </Button>
                                <Button color="inherit" onClick={() => scrollToSection("articles")}>
                                    {translate[context?.state.clientData?.lang as "ar" | "en"]["Articles"]}
                                </Button>
                                <Button color="inherit" onClick={() => scrollToSection("faq")}>
                                    {translate[context?.state.clientData?.lang as "ar" | "en"]["FAQ"]}
                                </Button>
                                <Button color="inherit" onClick={() => scrollToSection("testimonials")}>
                                    {translate[context?.state.clientData?.lang as "ar" | "en"]["Testimonials"]}
                                </Button>
                                <Button variant="contained" onClick={handleOpen}>
                                    {translate[context?.state.clientData?.lang as "ar" | "en"]["onlineConsultation"]}
                                </Button>
                            </Box>
                            {/* <Box sx={{ ml: "auto", display: { xs: "flex", md: "none" } }}>
                      <IconButton color="inherit">
                          <MenuIcon />
                      </IconButton>
                  </Box> */}
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: context?.state.clientData?.lang === "ar" ? 'right' : 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: context?.state.clientData?.lang === "ar" ? 'right' : 'left',
                                    }}
                                    keepMounted
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{ display: { xs: 'block', md: 'none' } }}
                                >

                                    <MenuItem
                                        onClick={() => {
                                            scrollToSection("about")
                                        }}
                                    >
                                        <Typography sx={{ textAlign: 'center' }}>
                                            {translate[context?.state.clientData?.lang as "ar" | "en"]["About"]}
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => { scrollToSection("articles") }}>
                                        <Typography sx={{ textAlign: 'center' }}>
                                            {translate[context?.state.clientData?.lang as "ar" | "en"]["Articles"]}
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => { scrollToSection("faq") }}>
                                        <Typography sx={{ textAlign: 'center' }}>
                                            {translate[context?.state.clientData?.lang as "ar" | "en"]["FAQ"]}
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => { scrollToSection("testimonials") }}>
                                        <Typography sx={{ textAlign: 'center' }}>
                                            {translate[context?.state.clientData?.lang as "ar" | "en"]["Testimonials"]}
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        handleOpen()
                                        handleCloseNavMenu()
                                    }}>
                                        <Typography sx={{ textAlign: 'center' }}>
                                            {translate[context?.state.clientData?.lang as "ar" | "en"]["onlineConsultation"]}
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Stack>
                    </Container>
                </Toolbar>
            </AppBarStyle>
        </>
    )
}

export default AppBarComponent
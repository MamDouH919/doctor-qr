"use client"
import { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Grid2 as Grid,
  Box,
  Stack,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon, PlayArrow } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { ClientContext } from "@/Providers/contexts/ClientContext";

import CustomDialog from "@/Component/CustomDialog";
import SocialCard from "@/Component/SocialCard";
import translate from "@/lib/Translate";
import Circles from "@/Component/Circles";
import { Title } from "@/Component/Title";
import Line from "@/Component/Line";
import { ArticlesSection } from "@/Component/Articles";
import { FAQSection } from "@/Component/Faq";
import { VideosSection } from "@/Component/Videos";
import Footer from "@/Component/Footer";
import Social from "@/Component/Social";
import Image from "next/image";


// Custom theme with primary color

// Styled components
const HeroSection = styled("section")(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2, 0),
  overflow: "hidden",
}));

const AboutSection = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  padding: theme.spacing(2, 0),
  position: "relative",
}));

const StackStyle = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {
    alignItems: "flex-start",
    textAlign: "left",
  },
}));

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

const PlayArrowAr = styled(PlayArrow)(() => ({
  rotate: "-180deg",
}));


const ImageStyle = styled(Image)(() => ({
  // WebkitTransform: theme.direction === "rtl" ? "scaleX(-1)" : "none",
  // transform: theme.direction === "rtl" ? "scaleX(-1)" : "none",
  // WebkitFilter: "drop-shadow(2px 1px 5px #222)",
  // filter: "drop-shadow(2px 1px 5px #222)",
}));


export default function Home() {
  const context = useContext(ClientContext);
  const dir = context?.state.clientData?.lang === "ar" ? "rtl" : "ltr";

  document.getElementsByTagName("html")[0].setAttribute("dir", dir);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: "center" });
    }
  };

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }



  return (
    <Box minHeight="100vh" position={"relative"} zIndex={10}>
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
                {context?.state.clientData?.name}
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

                  <MenuItem onClick={() => { handleCloseNavMenu(); scrollToSection("about") }}>
                    <Typography sx={{ textAlign: 'center' }}>
                      {translate[context?.state.clientData?.lang as "ar" | "en"]["About"]}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { handleCloseNavMenu(); scrollToSection("articles") }}>
                    <Typography sx={{ textAlign: 'center' }}>
                      {translate[context?.state.clientData?.lang as "ar" | "en"]["Articles"]}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { handleCloseNavMenu(); scrollToSection("faq") }}>
                    <Typography sx={{ textAlign: 'center' }}>
                      {translate[context?.state.clientData?.lang as "ar" | "en"]["FAQ"]}
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

      <Stack spacing={15}>
        {/* Hero Section */}
        <HeroSection >
          <Circles bottom="25px" />
          <Container>
            <Grid container spacing={2} alignItems={"center"} zIndex={11} position={"relative"}>
              <Grid size={{ xs: 12, lg: 6 }}>

                <StackStyle spacing={2}>
                  <Chip label={translate[context?.state.clientData?.lang as "ar" | "en"]["innovativeMedicine"]} variant="outlined" color="primary" />
                  <Typography variant="h1" fontSize={32} fontWeight={700} color="primary">
                    {'"' + context?.state.clientData?.name + '" '}
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
                    <Button variant="contained" size="large">
                      {translate[context?.state.clientData?.lang as "ar" | "en"]["scheduleACall"]}
                    </Button>
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
              <Grid size={{ xs: 12, lg: 2 }}>
              </Grid>
              <Grid size={{ xs: 12, lg: 4 }}>
                <Stack justifyContent={"center"} alignItems={"center"}>
                  <ImageStyle
                    property="og:image"
                    onLoad={(e) => console.log(e.target)}
                    src={context?.state.clientData?.image ?? "/logo.webp"}
                    alt={context?.state.clientData?.name ?? "Doctor"}
                    width={500}
                    height={500}
                    objectFit="contain"
                  />
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </HeroSection>

        {/* About Section */}
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

        {/* Other Sections */}
        <ArticlesSection />
        <FAQSection />
        <VideosSection />
        <Footer />
      </Stack>
    </Box>
  );
}

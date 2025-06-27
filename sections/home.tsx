"use client"
import { useContext } from "react";
import {
    Box,
    Stack,
} from "@mui/material";
import { ClientContext } from "@/Providers/contexts/ClientContext";

import { ArticlesSection } from "@/Component/Articles";
import Footer from "@/Component/Footer";




export default function Home() {
    const context = useContext(ClientContext);

    // const dir = context?.state.clientData?.lang === "ar" ? "rtl" : "ltr";
    // console.log("dir", dir);

    // useEffect(() => {
    //   document.getElementsByTagName("html")[0].setAttribute("dir", dir);
    //   return () => { }
    // }, [dir])



    console.log(context?.state.clientData);
    if (!context?.state.clientData) return null;


    return (
        <Box minHeight="100vh" position={"relative"} zIndex={10}>


            <Stack spacing={15}>
                {/* Hero Section */}
               

                {/* About Section */}
                

                {/* Other Sections */}
                <ArticlesSection />
                {/* <FAQSection /> */}

                {/* <TestimonialsSection /> */}

                {/* <VideosSection /> */}
                <Footer />
            </Stack>
        </Box>
    );
}

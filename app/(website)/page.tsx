"use client"
import CircularText from '@/Component/Animations/CircleText'
import Footer from '@/Component/Footer'
import { ClientContext } from '@/Providers/contexts/ClientContext'
import About from '@/sections/about'
import AppBarComponent from '@/sections/app-bar'
import { ArticlesSection } from '@/sections/Articles'
import Clinics from '@/sections/clinics'
import { FAQSection } from '@/sections/Faq'
import Hero from '@/sections/hero'
import { VideosSection } from '@/sections/Videos'
// import { VideosSection } from '@/sections/Videos'
import { Stack } from '@mui/material'
import React from 'react'


const Page = () => {
  const context = React.useContext(ClientContext);
  if (context?.state.loading) {
    return <Stack height={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <CircularText
        text="Dacatrah*Dacatrah*"
        onHover="speedUp"
        spinDuration={10}
        className="custom-class"
      />
    </Stack>
  }
  return (
    <>
      <AppBarComponent />
      <Stack spacing={10}>
        <Hero />
        <About />
        <ArticlesSection />
        <FAQSection />
        <Clinics />
        <VideosSection />
      </Stack>
      <Footer />
    </>

  )
}

export default Page
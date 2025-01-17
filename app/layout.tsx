import type { Metadata } from "next";
import "./globals.css";
import { Cairo } from "next/font/google";
import { Stack } from "@mui/material";

const cairo = Cairo({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin", "arabic"],
  display: "swap",
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Doctor portfolio",
  description: "Doctor portfolio",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html>
      <head>
        <meta name="apple-mobile-web-app-title" content="doctor" />
      </head>
      <body className={cairo.variable}>
        <Stack height={"100%"}>
          <Stack flexGrow={1} component={"main"}>
            {children}
          </Stack>
        </Stack>
      </body>
    </html>
  );
}

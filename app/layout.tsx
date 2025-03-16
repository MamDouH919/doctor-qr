import "./globals.css";
import { Cairo } from "next/font/google";
import { Stack } from "@mui/material";
import { headers } from "next/headers"; // Import headers

const cairo = Cairo({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin", "arabic"],
  display: "swap",
  variable: "--font-cairo",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const headerList = headers();
  const currentDomain = (await headerList).get("host");

  async function fetchServicesFromAPI() {
    const response = await fetch(`https://doctor.mountain-egy.site/api/client?domain=${currentDomain?.split(":")[0]}`, {
      cache: 'no-store', // Disable caching
    });
    return response.json();
  }

  const data = await fetchServicesFromAPI(); // Fetch services in the server component

  return (
    <html>
      <head>
        {/* Basic SEO */}
        <title>{data?.name || "Doctor Website"}</title>
        <meta name="description" content={data?.about || "Find the best medical services and doctors here."} />
        <meta name="keywords" content={"doctor, medical, healthcare, clinic"} />
        <meta name="author" content={data?.name || "Doctor Services"} />
        <meta name="robots" content="index, follow" />

        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-title" content="doctor" />

        {/* Open Graph (Facebook) */}
        <meta property="og:title" content={data?.name || "Doctor Website"} />
        <meta property="og:description" content={data?.about || "Find the best medical services and doctors here."} />
        <meta property="og:image" content={data?.image || "/default-thumbnail.jpg"} />
        <meta property="og:url" content={`https://${currentDomain}`} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data?.name || "Doctor Website"} />
        <meta name="twitter:description" content={data?.about || "Find the best medical services and doctors here."} />
        <meta name="twitter:image" content={data?.image || "/default-thumbnail.jpg"} />

        {/* Preconnect for Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://${currentDomain}`} />
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

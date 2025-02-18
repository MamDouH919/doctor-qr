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

    console.log(response);

    return response.json();
  }

  const data = await fetchServicesFromAPI(); // Fetch services in the server component

  return (
    <html>
      <head>
        <title>{data?.name}</title>
        <meta
          name="description"
          content={data?.description}
        />
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

import ThemeProviderRTL from "@/Component/ThemeProviderRTL";
import { ClientDataProvider } from "@/Providers/clientData";
import GetClient from "@/Component/GetClient";


export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <ClientDataProvider>
      <GetClient>
        <ThemeProviderRTL>
          {children}
        </ThemeProviderRTL>
      </GetClient>
    </ClientDataProvider>
  );
}

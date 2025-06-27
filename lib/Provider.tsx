"use client";
import { ClientDataProvider } from '@/Providers/clientData'

const Provider = ({ children, data }: { children: React.ReactNode, data: any }) => {
    return (
        <ClientDataProvider data={data}>
                {children}
        </ClientDataProvider>
    )
}

export default Provider
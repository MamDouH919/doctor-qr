import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {
    // wait 1 second
    await new Promise(resolve => setTimeout(resolve, 500));
    return (
        <>
            {children}
        </>
    )
}

export default Layout
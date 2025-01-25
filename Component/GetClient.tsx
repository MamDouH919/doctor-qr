"use client"
import { ClientContext } from '@/Providers/contexts/ClientContext';
import { Stack } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { DNA } from 'react-loader-spinner'

const GetClient = ({ children }: { children: React.ReactNode }) => {
    const context = useContext(ClientContext);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get the domain from window.location.hostname
        const currentDomain = window.location.hostname;
        // Fetch data when the domain is available
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/client?domain=${currentDomain}`);
                console.log(response.data);

                context?.dispatch({ type: "SET_CLIENT_DATA", payload: response.data });
                setLoading(false);

                if (response.data.lang === "ar") {
                    document.documentElement.lang = "ar";
                    document.documentElement.dir = "rtl";
                } else {
                    document.documentElement.lang = "en";
                    document.documentElement.dir = "ltr";
                }
            } catch {
                setLoading(false);
            }
        };

        if (currentDomain) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading ?
        <Stack position={"absolute"} top={0} left={0} right={0} bottom={0} zIndex={10} alignItems={"center"} justifyContent={"center"}>
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </Stack> : context?.state.clientData ? (
            <>
                {children}
            </>
        ) : <div>
            <h1>No Doctor Found</h1>
        </div>
};

export default GetClient;

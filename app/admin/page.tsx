"use client"
import LabelValue from '@/Component/LabelValue';
import { Button, Paper, Stack, Typography } from '@mui/material'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const Page = () => {
    const [loading, setLoading] = React.useState(true);

    const [data, setData] = React.useState<any>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/clients`)
            setLoading(false);
            console.log(response.data);
            setData(response.data);
        } catch {
            setLoading(false);
            
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const router = useRouter();
    const handleAdd = () => {
        router.push('/admin/create')
    }

    return loading ? <>loading ...</> : (
        <Stack p={2} spacing={2}>
            <Paper>
                <Stack p={2} spacing={2} alignItems={"center"}>
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                        <Typography>Clients</Typography>
                        <Button variant="contained" onClick={handleAdd}>
                            Add
                        </Button>
                    </Stack>
                    {data && data.map((client: any, index: number) => {
                        return (
                            <Stack component={Paper} key={index} direction="row" spacing={2} p={2} width={"100%"}>
                                <LabelValue label={"Name"} value={client.name} />
                                <LabelValue label={"Title"} value={client.title} />
                                <LabelValue label={"domain"} value={client.domain} />
                                <Link href={`/admin/${client._id}`}>
                                    <Typography>Edit</Typography>
                                </Link>
                            </Stack>
                        );
                    })}
                </Stack>
            </Paper>
        </Stack>
    )
}

export default Page
import ClientForm from '@/Component/ClientForm';
import React from 'react';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const id = (await params).id

    return <ClientForm id={id} />;
}
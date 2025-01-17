// src/providers/DashboardProvider.tsx
"use client";
import React, { useReducer, ReactNode } from "react";
import { ClientContext } from "./contexts/ClientContext";

interface Faq {
    question: string;
    answer: string;
}

interface Article {
    title: string;
    description: string;
}

interface Video {
    path: string;
    title: string;
}

interface Social {
    type: string;
    link: string;
}

export interface ClientData {
    id: string;
    name: string;
    color: string;
    lang: string;
    logo: string;
    title: string;
    description: string;
    about: string;
    articles: Article[];
    faq: Faq[];
    videos: Video[];
    image: string;
    domain: string;
    active: boolean;
    whatsApp: string;
    phone: string;
    social: Social[];
    [key: string]: unknown; // Adjust this based on your actual JSON structure
}

type AppState = { clientData: ClientData | null };

type AppAction = { type: "SET_CLIENT_DATA"; payload: ClientData | null };

const reducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case "SET_CLIENT_DATA":
            return { ...state, clientData: action.payload };
        default:
            throw new Error("Unhandled action type");
    }
};

export const ClientDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { clientData: null });

    return (
        <ClientContext.Provider value={{ state, dispatch }}>
            {children}
        </ClientContext.Provider>
    );
};

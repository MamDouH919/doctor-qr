// src/providers/DashboardProvider.tsx
"use client";
import React, { useReducer, ReactNode, useEffect } from "react";
import { ClientContext } from "./contexts/ClientContext";

interface Faq {
    question: string;
    answer: string;
}

interface Article {
    title: string;
    content: string;
}

interface Video {
    link: string;
    type: string;
}

interface Social {
    type: string;
    link: string;
}

export interface Testimonial {
    _id: string;
    name: string;
    email: string;
    phone: string;
    comment: string;
    rate: number;
    status: string;
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
    testimonials: Testimonial[];
    [key: string]: unknown; // Adjust this based on your actual JSON structure
}


interface Clinic {
    _id: string,
    name: string,
    phone: string,
    address: string,
    mobile: string,
    governorate: {
        _id: string,
        name: {
            ar: string,
            en: string
        }
    },
    city: {
        _id: string,
        name: {
            ar: string,
            en: string
        }
    },

    appointments: {
        day: string,
        timeFrom: string,
        timeTo: string
    }[],
}

export type Entity = {
    clinics: Clinic[]; // Replace `any` with specific type if available
    _id: string;
    domain: string;
    active: boolean;
    showInHomePage: boolean;
    isPremium: boolean;
    specialization_needed: string;
    faqs: Faq[]; // Replace `any` with specific FAQ type
    articles: Article[]; // Replace `any` with specific Article type
    // testimonials: any[]; // Replace `any` with specific Testimonial type
    // user: string; // Presumably a user ID
    videos: Video[]; // Replace `any` with specific Video type
    social: Social[]; // Replace `any` with specific Social type
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    about: string;
    color: string; // Hex color string
    description: string;
    lang: string;
    phone: string;
    title: string;
    whatsApp: string;
    siteName: string;
    specialization: string; // Presumably a specialization ID
    image: string; // Presumably an image ID or URL
    visitors: number;
};


type AppState = { clientData: Entity | null, loading: boolean };

type AppAction = {
    type: "SET_CLIENT_DATA";
    payload: Entity | null
};

const reducer = (state: AppState, action: AppAction | { type: "SET_LOADING"; payload: boolean }): AppState => {
    switch (action.type) {
        case "SET_CLIENT_DATA":
            return { ...state, clientData: action.payload };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        default:
            throw new Error("Unhandled action type");
    }
};

export const ClientDataProvider: React.FC<{ children: ReactNode, data: Entity }> = ({ children, data }) => {
    const [state, dispatch] = useReducer(reducer, { clientData: null, loading: true });

    useEffect(() => {
        // Initialize the state with the provided data
        dispatch({ type: "SET_CLIENT_DATA", payload: data });
        setTimeout(() => {
            dispatch({ type: "SET_LOADING", payload: false });
        }, 1000);
    }, [data]);

    return (
        <ClientContext.Provider value={{ state, dispatch }}>
            {children}
        </ClientContext.Provider>
    );
};

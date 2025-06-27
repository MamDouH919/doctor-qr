// src/contexts/ClientContext.tsx
import { createContext } from "react";
import { Entity } from "../clientData";

type AppState = { clientData: Entity | null, loading: boolean };

type AppAction = { type: "SET_CLIENT_DATA"; payload: Entity | null };

export const ClientContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<AppAction | { type: "SET_LOADING"; payload: boolean; }>;
} | undefined>(undefined);

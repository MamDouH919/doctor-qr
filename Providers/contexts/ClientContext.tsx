// src/contexts/ClientContext.tsx
import { createContext } from "react";
import { ClientData } from "../clientData";

type AppState = { clientData: ClientData | null };

type AppAction = { type: "SET_CLIENT_DATA"; payload: ClientData | null };

export const ClientContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

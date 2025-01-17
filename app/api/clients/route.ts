import { NextResponse } from "next/server";
import Clients from "@/models/Clients";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
    try {
        // Connect to the database
        await dbConnect();

        // Fetch all clients
        const clients = await Clients.find();

        if (!clients.length) {
            return NextResponse.json(
                { error: "No clients found" },
                { status: 404 }
            );
        }

        return NextResponse.json(clients);
    } catch (error) {
        console.error("Error fetching clients:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

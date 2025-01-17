import { NextResponse } from "next/server";
import Clients from "@/models/Clients";
import dbConnect from "@/lib/dbConnect";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const domain = searchParams.get("domain");        

        if (!domain) {
            return NextResponse.json(
                { error: "Domain is required" },
                { status: 400 }
            );
        }

        // Connect to the database
        await dbConnect();

        // Fetch client by domain
        const client = await Clients.findOne({ domain });

        if (!client) {
            return NextResponse.json(
                { error: "Client not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(client);
    } catch  {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

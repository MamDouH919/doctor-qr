import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect"; // Adjust path as needed
import Clients from "@/models/Clients";

// Connect to the database before handling requests
dbConnect();

// Handle POST request (Create client)
export async function POST(req: Request): Promise<NextResponse> {
    try {
        const {
            name,
            title,
            description,
            image,
            color,
            lang,
            about,
            articles,
            faq,
            videos,
            domain,
            active,
            whatsApp,
            phone,
            social,
        } = await req.json();

        console.log(whatsApp,
            phone,
            social,);
        

        // Ensure the domain is unique
        const existingClient = await Clients.findOne({ domain });
        if (existingClient) {
            return NextResponse.json(
                { message: "Domain already exists. Please use a unique domain." },
                { status: 400 }
            );
        }

        // Create a new client object
        const newClient = new Clients({
            name,
            title,
            description,
            image,
            color,
            lang,
            about,
            articles,
            faq,
            videos,
            domain,
            active,
            whatsApp,
            phone,
            social,
        });

        // Save the new client to the database
        await newClient.save();

        return NextResponse.json(
            { message: "Client saved successfully", client: newClient },
            { status: 201 }
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to save client", error: error.message },
            { status: 500 }
        );
    }
}

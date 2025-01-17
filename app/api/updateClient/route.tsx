import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect"; // Adjust path as needed
import Clients from "@/models/Clients";

// Connect to the database before handling requests
dbConnect();

// Handle PUT request (Update client by id)
export async function POST(req: Request): Promise<NextResponse> {
    try {
        const {
            id, // Include `id` in the request body
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
            active,
            whatsApp,
            phone,
            social,
            domain
        } = await req.json();

        console.log(whatsApp,
            phone,
            social,);

        // Check if the client exists by id
        const existingClient = await Clients.findById(id);
        if (!existingClient) {
            return NextResponse.json(
                { message: "Client not found. Please provide a valid id." },
                { status: 404 }
            );
        }

        // Update the existing client's data
        existingClient.name = name || existingClient.name;
        existingClient.title = title || existingClient.title;
        existingClient.description = description || existingClient.description;
        existingClient.image = image || existingClient.image;
        existingClient.color = color || existingClient.color;
        existingClient.lang = lang || existingClient.lang;
        existingClient.about = about || existingClient.about;
        existingClient.articles = articles || existingClient.articles;
        existingClient.faq = faq || existingClient.faq;
        existingClient.videos = videos || existingClient.videos;
        existingClient.active = active ?? existingClient.active;
        existingClient.whatsApp = whatsApp ?? existingClient.whatsApp;
        existingClient.phone = phone ?? existingClient.phone;
        existingClient.social = social ?? existingClient.social;
        existingClient.domain = domain ?? existingClient.domain;

        // Save the updated client to the database
        await existingClient.save();

        return NextResponse.json(
            { message: "Client updated successfully", client: existingClient },
            { status: 200 }
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to update client", error: error.message },
            { status: 500 }
        );
    }
}

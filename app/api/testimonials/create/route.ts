import { NextResponse } from "next/server";
import Clients from "@/models/Clients";
import dbConnect from "@/lib/dbConnect";
import { receiveContactEmail } from "@/lib/mail";

// Connect to the database before handling requests
dbConnect();

// Handle POST request (Add testimonial to client by domain)
export async function POST(req: Request): Promise<NextResponse> {
    try {
        const {
            name,
            phone,
            email,
            comment,
            rate,
            domain,
        } = await req.json();

        // Find the client by domain
        const client = await Clients.findOne({ domain });

        if (!client) {
            return NextResponse.json(
                { message: "Domain not found" },
                { status: 404 }
            );
        }

        // Check for existing testimonials with the same email or phone
        const existingTestimonial = client.testimonials.find(
            (testimonial: any) =>
                testimonial.email === email || testimonial.phone === phone
        );

        if (existingTestimonial) {
            return NextResponse.json(
                {
                    message: "DuplicateTestimonial",
                    status: "duplicate"
                },
                { status: 400 }
            );
        }

        receiveContactEmail(
            {
                name,
                phone,
                email,
                comment,
                rate,
            },
            domain,
            client.email
        );

        // Add testimonial to the client's testimonials array
        client.testimonials.push({
            name,
            phone,
            email,
            comment,
            rate,
            date: new Date(),
            status: "pending" // Set initial status as pending
        });

        await client.save();

        return NextResponse.json(
            { message: "Testimonial added successfully", client },
            { status: 201 }
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to add testimonial", error: error.message },
            { status: 500 }
        );
    }
}
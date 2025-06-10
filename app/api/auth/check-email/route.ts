import { NextResponse } from "next/server";
import Clients from "@/models/Clients";
import dbConnect from "@/lib/dbConnect";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const { email, password } = await req.json();

        // Find client by email
        const client = await Clients.findOne({ email });

        if (!client) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // Replace this with your password check logic (e.g., bcrypt)
        const isPasswordValid = client.password === password; // For demo only, use hashing in production!

        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }
        // update token


        // Generate JWT token
        const token = jwt.sign(
            { id: client._id, email: client.email, domain: client.domain },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );

        client.token = token;
        await client.save();

        return NextResponse.json({ token }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Login failed", error: error.message }, { status: 500 });
    }
}
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import Clients from "@/models/Clients";
import dbConnect from "@/lib/dbConnect";

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

interface TokenPayload extends JwtPayload {
    domain: string;
}

export async function POST(request: Request) {
    try {
        // Get the authorization header
        const authHeader = request.headers.get('authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { valid: false, message: "No token provided" },
                { status: 401 }
            );
        }

        // Extract the token
        const token = authHeader.split(' ')[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as TokenPayload;

        if (!decoded.domain) {
            return NextResponse.json(
                { valid: false, message: "Invalid token payload" },
                { status: 401 }
            );
        }

        // Connect to the database
        await dbConnect();

        // Check if the client exists
        const client = await Clients.findOne({ domain: decoded.domain });

        if (!client) {
            return NextResponse.json(
                { valid: false, message: "Invalid token" },
                { status: 401 }
            );
        }

        return NextResponse.json({ valid: true });
    } catch (error) {
        console.error("Token verification error:", error);
        return NextResponse.json(
            { valid: false, message: "Invalid token" },
            { status: 401 }
        );
    }
} 
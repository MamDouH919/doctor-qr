// get testimonials 
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Clients from '@/models/Clients'
import jwt, { JwtPayload } from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

interface TokenPayload extends JwtPayload {
    domain: string;
}

// Connect to the database before handling requests
dbConnect()

// Handle GET request (Get testimonials by client)
export async function GET(req: Request): Promise<NextResponse> {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.get('Authorization')
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json(
                { message: 'Invalid authorization header format' },
                { status: 401 }
            )
        }

        const token = authHeader.split(' ')[1]
        if (!token) {
            return NextResponse.json(
                { message: 'No token provided' },
                { status: 401 }
            )
        }

        // Verify token and extract domain
        let decoded: TokenPayload
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload
        } catch {
            return NextResponse.json(
                { message: 'Invalid or expired token' },
                { status: 401 }
            )
        }

        if (!decoded.domain) {
            return NextResponse.json(
                { message: 'Token missing domain information' },
                { status: 401 }
            )
        }

        // Find the client by domain from token
        const client = await Clients.findOne({ domain: decoded.domain })

        if (!client) {
            return NextResponse.json(
                { message: 'Client not found for the provided domain' },
                { status: 404 }
            )
        }

        // Return the client's testimonials
        return NextResponse.json(client.testimonials)
    } catch (error: any) {
        console.error('Error in testimonials list route:', error)
        return NextResponse.json(
            { message: 'Internal server error', error: error.message },
            { status: 500 }
        )
    }
}
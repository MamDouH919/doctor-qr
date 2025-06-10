import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import Clients from '@/models/Clients';
import jwt, { JwtPayload } from 'jsonwebtoken';

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
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify the token
        const token = authHeader.split(' ')[1];
        const isValid = await verifyToken(token);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as TokenPayload;
        if (!decoded.domain) {
            return NextResponse.json(
                { valid: false, message: "Invalid token payload" },
                { status: 401 }
            );
        }

        const client = await Clients.findOne({ domain: decoded.domain });

        // Get the request body
        const body = await request.json();
        const { testimonialId, status } = body;

        if (!testimonialId || !status) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate status
        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return NextResponse.json(
                { error: 'Invalid status value' },
                { status: 400 }
            );
        }

        // Update the testimonial status
        const updatedClient = await Clients.findOneAndUpdate(
            {
                _id: client._id,
                'testimonials._id': testimonialId
            },
            {
                $set: { 'testimonials.$.status': status }
            },
            { new: true }
        );

        if (!updatedClient) {
            return NextResponse.json(
                { error: 'Client or testimonial not found' },
                { status: 404 }
            );
        }

        // Find the updated testimonial
        const updatedTestimonial = updatedClient.testimonials.find(
            (t: any) => t._id.toString() === testimonialId
        );

        return NextResponse.json({
            success: true,
            testimonial: updatedTestimonial
        });

    } catch (error) {
        console.error('Error updating testimonial status:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

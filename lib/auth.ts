import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function verifyToken(token: string): Promise<boolean> {
    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch {
        return false;
    }
} 
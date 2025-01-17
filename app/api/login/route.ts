import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY); // Use a secure secret key

// Hardcoded user credentials
const user = {
  username: "docAdmin",
  password: "Mamdouh123!!!",
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    console.log("Received POST request");
    const { username, password } = await req.json();
    console.log("Parsed request body:", { username, password });
    const oneMonthInSeconds = 30 * 24 * 60 * 60; // 30 days in seconds

    if (username === user.username && password === user.password) {
      const token = await new SignJWT({ username })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime(Math.floor(Date.now() / 1000) + oneMonthInSeconds)
        .sign(SECRET_KEY);

      console.log("Generated token:", token);

      const response = NextResponse.json({ message: "Login successful" });
      response.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 3600, // 1 hour
      });
      return response;
    }

    console.log("Invalid credentials");
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Error processing login:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

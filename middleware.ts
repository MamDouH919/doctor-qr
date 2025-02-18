import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY); // Use a secure secret key

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // If the request is for /admin and no valid token, redirect to /
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      // Verify the token
      const { payload } = await jwtVerify(token, SECRET_KEY);
      console.log("Verified token payload:", payload);

      // You can add additional checks here if needed
    } catch (error) {
      console.error("Invalid token:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next(); // Allow the request to continue for other routes
}

// Configuring the matcher to include only specific paths

// Configuring the matcher to include only specific paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};


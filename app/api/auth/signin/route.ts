import { signInSchema } from "@/lib/validation";
import { signInUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate input
    const validatedData = signInSchema.parse(body);

    // Authenticate user
    const user = await signInUser(validatedData.email, validatedData.password);

    // Return user (without password)
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Signin error:", error);

    // Handle validation errors
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    // Handle authentication errors
    if (
      error.message === "User not found" ||
      error.message === "Invalid password"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to sign in",
      },
      { status: 500 }
    );
  }
}

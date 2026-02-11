import { signUpSchema } from "@/lib/validation";
import { createUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = signUpSchema.parse(body);

    // Create user
    const user = await createUser(
      validatedData.email,
      validatedData.password,
      validatedData.name
    );

    // Return user (without password)
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);

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

    // Handle duplicate email error
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create user",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { businessProfileSchema, updateBusinessProfileSchema } from "@/lib/validation";

// GET business profile
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const profile = await prisma.businessProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return NextResponse.json({ error: "Business profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching business profile:", error);
    return NextResponse.json({ error: "Failed to fetch business profile" }, { status: 500 });
  }
}

// POST/CREATE business profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.userId;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const validatedData = businessProfileSchema.parse(body);

    // Check if profile already exists
    const existingProfile = await prisma.businessProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      // Update instead
      const profile = await prisma.businessProfile.update({
        where: { userId },
        data: validatedData,
      });
      return NextResponse.json(profile);
    }

    const profile = await prisma.businessProfile.create({
      data: {
        ...validatedData,
        userId,
      },
    });

    return NextResponse.json(profile, { status: 201 });
  } catch (error: any) {
    console.error("Error creating/updating business profile:", error);
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create business profile" }, { status: 500 });
  }
}

// PUT update business profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.userId;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const validatedData = updateBusinessProfileSchema.parse(body);

    const profile = await prisma.businessProfile.update({
      where: { userId },
      data: validatedData,
    });

    return NextResponse.json(profile);
  } catch (error: any) {
    console.error("Error updating business profile:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Business profile not found" }, { status: 404 });
    }
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update business profile" }, { status: 500 });
  }
}

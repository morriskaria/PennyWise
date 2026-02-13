
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { integrationSchema, updateIntegrationSchema } from "@/lib/validation";

// GET all integrations
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const integrations = await prisma.integration.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    // Don't expose sensitive data
    const sanitized = integrations.map(({ apiKey, apiSecret, ...rest }: any) => rest);

    return NextResponse.json(sanitized);
  } catch (error) {
    console.error("Error fetching integrations:", error);
    return NextResponse.json({ error: "Failed to fetch integrations" }, { status: 500 });
  }
}

// POST create integration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.userId;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const validatedData = integrationSchema.parse(body);

    const integration = await prisma.integration.create({
      data: {
        ...validatedData,
        userId,
        config: validatedData.config ? JSON.stringify(validatedData.config) : null,
      },
    });

    // Don't expose sensitive data
    const { apiKey, apiSecret, ...sanitized } = integration;

    return NextResponse.json(sanitized, { status: 201 });
  } catch (error: any) {
    console.error("Error creating integration:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Integration already exists for this user" }, { status: 400 });
    }
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create integration" }, { status: 500 });
  }
}

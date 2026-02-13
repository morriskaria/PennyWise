import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { updateIntegrationSchema } from "@/lib/validation";

// GET single integration
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const integration = await prisma.integration.findUnique({
      where: { id },
    });

    if (!integration) {
      return NextResponse.json({ error: "Integration not found" }, { status: 404 });
    }

    // Don't expose sensitive data
    const { apiKey, apiSecret, ...sanitized } = integration;
    return NextResponse.json(sanitized);
  } catch (error) {
    console.error("Error fetching integration:", error);
    return NextResponse.json({ error: "Failed to fetch integration" }, { status: 500 });
  }
}

// PUT update integration
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const validatedData = updateIntegrationSchema.partial().parse(body);

    const integration = await prisma.integration.update({
      where: { id },
      data: validatedData,
    });

    const { apiKey, apiSecret, ...sanitized } = integration;
    return NextResponse.json(sanitized);
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update integration" }, { status: 500 });
  }
}

// DELETE integration
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.integration.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Integration deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting integration:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Integration not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to delete integration" }, { status: 500 });
  }
}

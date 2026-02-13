import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { updateTeamMemberSchema } from "@/lib/validation";

// GET single team member
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const member = await prisma.teamMember.findUnique({
      where: { id },
    });

    if (!member) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json(member);
  } catch (error) {
    console.error("Error fetching team member:", error);
    return NextResponse.json({ error: "Failed to fetch team member" }, { status: 500 });
  }
}

// PUT update team member
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const validatedData = updateTeamMemberSchema.partial().parse(body);

    const member = await prisma.teamMember.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(member);
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

// DELETE team member
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.teamMember.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Team member removed successfully" });
  } catch (error: any) {
    console.error("Error deleting team member:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to remove team member" }, { status: 500 });
  }
}

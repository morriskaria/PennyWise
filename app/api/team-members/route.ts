import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { teamMemberSchema, updateTeamMemberSchema } from "@/lib/validation";

// GET all team members
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const members = await prisma.teamMember.findMany({
      where: { userId },
      orderBy: { invitedDate: "desc" },
    });

    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
  }
}

// POST invite team member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.userId;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const validatedData = teamMemberSchema.parse(body);

    const member = await prisma.teamMember.create({
      data: {
        ...validatedData,
        userId,
        permissions: validatedData.permissions ? JSON.stringify(validatedData.permissions) : null,
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error: any) {
    console.error("Error creating team member:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Team member with this email already exists" }, { status: 400 });
    }
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to invite team member" }, { status: 500 });
  }
}

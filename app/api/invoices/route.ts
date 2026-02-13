import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { invoiceSchema, updateInvoiceSchema } from "@/lib/validation";

// GET all invoices for a user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const where: any = { userId };
    if (status && status !== "all") {
      where.status = status;
    }

    const invoices = await prisma.invoice.findMany({
      where,
      include: {
        items: true,
        payments: true,
      },
      orderBy: { issueDate: "desc" },
    });

    // Calculate statistics
    const stats = {
      totalOutstanding: invoices
        .filter((inv: any) => inv.status !== "paid")
        .reduce((sum: any, inv: any) => sum + Number(inv.amount), 0),
      overdue: invoices
        .filter((inv: any) => inv.status === "overdue")
        .reduce((sum: any, inv: any) => sum + Number(inv.amount), 0),
      totalPaidThisMonth: invoices
        .filter((inv: any) => {
          if (!inv.paidDate) return false;
          const now = new Date();
          return (
            inv.paidDate.getMonth() === now.getMonth() &&
            inv.paidDate.getFullYear() === now.getFullYear()
          );
        })
        .reduce((sum: any, inv: any) => sum + Number(inv.amount), 0),
    };

    return NextResponse.json({ invoices, stats });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}

// POST create new invoice
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.userId;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const validatedData = invoiceSchema.parse(body);

    const invoice = await prisma.invoice.create({
      data: {
        ...validatedData,
        userId,
      },
      include: {
        items: true,
        payments: true,
      },
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error: any) {
    console.error("Error creating invoice:", error);
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }
}

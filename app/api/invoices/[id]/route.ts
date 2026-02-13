import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { updateInvoiceSchema } from "@/lib/validation";

// GET single invoice
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        items: true,
        payments: true,
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    return NextResponse.json({ error: "Failed to fetch invoice" }, { status: 500 });
  }
}

// PUT update invoice
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const validatedData = updateInvoiceSchema.partial().parse(body);

    const invoice = await prisma.invoice.update({
      where: { id },
      data: validatedData,
      include: { items: true, payments: true },
    });

    return NextResponse.json(invoice);
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 });
  }
}

// DELETE invoice
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.invoice.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Invoice deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting invoice:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to delete invoice" }, { status: 500 });
  }
}

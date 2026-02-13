import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Get all invoices for calculations
    const invoices = await prisma.invoice.findMany({
      where: { userId },
      include: {
        payments: true,
      },
    });

    // Get all transactions
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        account: true,
        category: true,
      },
      orderBy: { date: "desc" },
      take: 10,
    });

    // Get all accounts
    const accounts = await prisma.account.findMany({
      where: { userId },
    });

    // Calculate statistics
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Invoice stats
    const totalOutstanding = invoices
      .filter((inv: any) => inv.status !== "paid")
      .reduce((sum: any, inv: any) => sum + Number(inv.amount), 0);

    const overdue = invoices
      .filter((inv: any) => inv.status === "overdue")
      .reduce((sum: any, inv: any) => sum + Number(inv.amount), 0);

    const paidThisMonth = invoices
      .filter((inv: any) => {
        if (!inv.paidDate) return false;
        return (
          inv.paidDate.getMonth() === currentMonth &&
          inv.paidDate.getFullYear() === currentYear
        );
      })
      .reduce((sum: any, inv: any) => sum + Number(inv.amount), 0);

    // Transaction stats
    const income = transactions
      .filter((t: any) => t.type === "income")
      .reduce((sum: any, t: any) => sum + Number(t.amount), 0);

    const expenses = transactions
      .filter((t: any) => t.type === "expense")
      .reduce((sum: any, t: any) => sum + Number(t.amount), 0);

    const monthlyIncome = transactions
      .filter(
        (t: any) =>
          t.type === "income" &&
          t.date.getMonth() === currentMonth &&
          t.date.getFullYear() === currentYear
      )
      .reduce((sum: any, t: any) => sum + Number(t.amount), 0);

    const monthlyExpenses = transactions
      .filter(
        (t: any) =>
          t.type === "expense" &&
          t.date.getMonth() === currentMonth &&
          t.date.getFullYear() === currentYear
      )
      .reduce((sum: any, t: any) => sum + Number(t.amount), 0);

    // Account stats
    const totalBalance = accounts.reduce((sum: any, acc: any) => sum + Number(acc.balance), 0);

    // Budget info
    const budgets = await prisma.budget.findMany({
      where: { userId },
      include: { category: true },
    });

    return NextResponse.json({
      invoices: {
        total: invoices.length,
        outstanding: totalOutstanding,
        overdue,
        paidThisMonth,
      },
      transactions: {
        total: transactions.length,
        income,
        expenses,
        monthlyIncome,
        monthlyExpenses,
        netProfit: income - expenses,
      },
      accounts: {
        total: accounts.length,
        totalBalance,
      },
      budgets: budgets.length,
      recentTransactions: transactions.slice(0, 5).map((t: any) => ({
        id: t.id,
        description: t.description || t.category.name,
        amount: Number(t.amount),
        type: t.type,
        date: t.date,
        category: t.category.name,
      })),
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * GET /api/dashboard/stats
 * Returns KPI metrics for the dashboard
 * Requires authentication
 */
export async function GET() {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const userId = session.user.id;

        // Calculate total revenue (sum of income transactions)
        const revenueResult = await prisma.transaction.aggregate({
            where: {
                userId,
                type: 'income',
            },
            _sum: {
                amount: true,
            },
        });

        // Calculate total expenses (sum of expense transactions)
        const expensesResult = await prisma.transaction.aggregate({
            where: {
                userId,
                type: 'expense',
            },
            _sum: {
                amount: true,
            },
        });

        // Get active accounts count
        const activeAccountsCount = await prisma.account.count({
            where: {
                userId,
                isActive: true,
            },
        });

        const totalRevenue = revenueResult._sum.amount?.toNumber() || 0;
        const totalExpenses = expensesResult._sum.amount?.toNumber() || 0;
        const netProfit = totalRevenue - totalExpenses;

        return NextResponse.json(
            {
                success: true,
                data: {
                    totalRevenue: totalRevenue.toFixed(2),
                    totalExpenses: totalExpenses.toFixed(2),
                    netProfit: netProfit.toFixed(2),
                    activeAccounts: activeAccountsCount,
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Dashboard stats error:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || 'Failed to fetch dashboard stats',
            },
            { status: 500 }
        );
    }
}

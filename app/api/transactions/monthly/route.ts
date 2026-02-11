import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * GET /api/transactions/monthly
 * Returns aggregated monthly transaction data (last 12 months)
 * Used for line chart visualization
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

        // Get date 12 months ago
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

        // Fetch all transactions from the last 12 months
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: twelveMonthsAgo,
                },
            },
            select: {
                date: true,
                amount: true,
                type: true,
            },
            orderBy: {
                date: 'asc',
            },
        });

        // Group by month and calculate totals
        const monthlyData: { [key: string]: { income: number; expenses: number } } = {};

        transactions.forEach((tx) => {
            const monthKey = tx.date.toISOString().slice(0, 7); // YYYY-MM format

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { income: 0, expenses: 0 };
            }

            const amount = tx.amount.toNumber();

            if (tx.type === 'income') {
                monthlyData[monthKey].income += amount;
            } else if (tx.type === 'expense') {
                monthlyData[monthKey].expenses += amount;
            }
        });

        // Convert to array format for chart
        const chartData = Object.keys(monthlyData)
            .sort()
            .slice(-7) // Last 7 months
            .map((monthKey) => {
                const date = new Date(monthKey + '-01');
                const monthName = date.toLocaleDateString('en-US', { month: 'short' });

                return {
                    name: monthName,
                    income: Math.round(monthlyData[monthKey].income),
                    expenses: Math.round(monthlyData[monthKey].expenses),
                };
            });

        return NextResponse.json(
            {
                success: true,
                data: chartData,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Monthly transactions error:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || 'Failed to fetch monthly data',
            },
            { status: 500 }
        );
    }
}

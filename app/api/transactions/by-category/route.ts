import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * GET /api/transactions/by-category
 * Returns spending breakdown by category
 * Used for donut chart visualization
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

        // Get expenses grouped by category
        const categorySpending = await prisma.transaction.groupBy({
            by: ['categoryId'],
            where: {
                userId,
                type: 'expense', // Only count expenses for spending breakdown
            },
            _sum: {
                amount: true,
            },
        });

        // Fetch category details
        const categoryIds = categorySpending.map((item) => item.categoryId);
        const categories = await prisma.category.findMany({
            where: {
                id: {
                    in: categoryIds,
                },
            },
            select: {
                id: true,
                name: true,
                color: true,
            },
        });

        // Combine data for chart
        const chartData = categorySpending.map((item) => {
            const category = categories.find((cat) => cat.id === item.categoryId);
            const value = item._sum.amount?.toNumber() || 0;

            return {
                name: category?.name || 'Unknown',
                value: Math.round(value),
                color: category?.color || '#3B82F6',
            };
        });

        // Sort by value descending and take top 5
        const topCategories = chartData
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);

        return NextResponse.json(
            {
                success: true,
                data: topCategories,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Category spending error:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || 'Failed to fetch category data',
            },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * GET /api/transactions
 * Fetch user transactions with optional filtering and pagination
 * Requires authentication
 */
export async function GET(request: NextRequest) {
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
        const { searchParams } = new URL(request.url);

        // Pagination parameters
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        // Filter parameters
        const type = searchParams.get('type'); // 'income', 'expense', 'transfer'
        const categoryId = searchParams.get('categoryId');

        // Build where clause
        const where: any = { userId };
        if (type) where.type = type;
        if (categoryId) where.categoryId = categoryId;

        // Fetch transactions
        const [transactions, total] = await Promise.all([
            prisma.transaction.findMany({
                where,
                include: {
                    category: true,
                    account: true,
                },
                orderBy: {
                    date: 'desc',
                },
                skip,
                take: limit,
            }),
            prisma.transaction.count({ where }),
        ]);

        return NextResponse.json(
            {
                success: true,
                data: {
                    transactions,
                    pagination: {
                        total,
                        page,
                        limit,
                        pages: Math.ceil(total / limit),
                    },
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Fetch transactions error:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || 'Failed to fetch transactions',
            },
            { status: 500 }
        );
    }
}

/**
 * POST /api/transactions
 * Create a new transaction
 * Requires authentication
 */
export async function POST(request: NextRequest) {
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
        const body = await request.json();

        // Validate required fields
        const { accountId, categoryId, amount, type, description, date } = body;

        if (!accountId || !categoryId || !amount || !type || !date) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Missing required fields: accountId, categoryId, amount, type, date',
                },
                { status: 400 }
            );
        }

        // Create transaction
        const transaction = await prisma.transaction.create({
            data: {
                userId,
                accountId,
                categoryId,
                amount,
                type,
                description,
                date: new Date(date),
            },
            include: {
                category: true,
                account: true,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Transaction created successfully',
                data: transaction,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create transaction error:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || 'Failed to create transaction',
            },
            { status: 500 }
        );
    }
}

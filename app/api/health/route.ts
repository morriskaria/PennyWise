import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Health check endpoint for monitoring API and database status
 * Returns 200 if healthy, 503 if database connection fails
 */
export async function GET() {
  try {
    // Test database connection by running a simple query
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: 'connected',
        api: 'operational',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        api: 'operational',
        error: error.message || 'Database connection failed',
      },
      { status: 503 }
    );
  }
}

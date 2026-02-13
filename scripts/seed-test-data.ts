/**
 * Database seeder script for testing PennyWise application
 * This script creates sample data for a test user to verify functionality
 * 
 * Run with: npx tsx scripts/seed-test-data.ts
 * 
 * Or add to package.json:
 * "seed": "tsx scripts/seed-test-data.ts"
 */

import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...\n');

    // Create test user
    const email = 'test@pennywise.com';
    const password = 'password123';
    const name = 'Test User';

    // Check if user already exists
    let user = await prisma.user.findUnique({
        where: { email },
    });

    if (user) {
        console.log(`✓ User already exists: ${email}`);
    } else {
        const hashedPassword = await hashPassword(password);
        user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        console.log(`✓ Created user: ${email}`);
        console.log(`  Password: ${password}\n`);
    }

    // Create accounts
    console.log('Creating accounts...');
    let checkingAccount = await prisma.account.findFirst({
        where: { userId: user.id, name: 'Checking Account' },
    });
    if (!checkingAccount) {
        checkingAccount = await prisma.account.create({
            data: {
                userId: user.id,
                name: 'Checking Account',
                type: 'checking',
                balance: 5000,
                currency: 'USD',
            },
        });
        console.log(`✓ Checking Account created`);
    } else {
        console.log(`✓ Checking Account exists`);
    }

    let savingsAccount = await prisma.account.findFirst({
        where: { userId: user.id, name: 'Savings Account' },
    });
    if (!savingsAccount) {
        savingsAccount = await prisma.account.create({
            data: {
                userId: user.id,
                name: 'Savings Account',
                type: 'savings',
                balance: 10000,
                currency: 'USD',
            },
        });
        console.log(`✓ Savings Account created`);
    } else {
        console.log(`✓ Savings Account exists`);
    }
    console.log('');

    // Create categories
    console.log('Creating categories...');
    const categories = [
        { name: 'Sales', color: '#22c55e', icon: 'dollar-sign' },
        { name: 'Consulting', color: '#3b82f6', icon: 'briefcase' },
        { name: 'Rent', color: '#ef4444', icon: 'home' },
        { name: 'Utilities', color: '#f59e0b', icon: 'zap' },
        { name: 'Dining', color: '#8b5cf6', icon: 'utensils' },
        { name: 'Travel', color: '#06b6d4', icon: 'plane' },
    ];

    const createdCategories: any[] = [];
    for (const cat of categories) {
        const category = await prisma.category.upsert({
            where: {
                userId_name: {
                    userId: user.id,
                    name: cat.name,
                },
            },
            update: {},
            create: {
                userId: user.id,
                name: cat.name,
                color: cat.color,
                icon: cat.icon,
            },
        });
        createdCategories.push(category);
        console.log(`✓ ${cat.name} category created/updated`);
    }
    console.log('');

    // Create transactions (last 6 months)
    console.log('Creating transactions...');
    const now = new Date();
    const transactionsData = [];

    // Generate monthly income and expenses
    for (let monthsAgo = 5; monthsAgo >= 0; monthsAgo--) {
        const date = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 15);

        // Income transactions
        transactionsData.push({
            userId: user.id,
            accountId: checkingAccount.id,
            categoryId: createdCategories[0].id, // Sales
            amount: 4000 + Math.random() * 2000,
            type: 'income',
            description: 'Monthly Sales Revenue',
            date: new Date(date.getFullYear(), date.getMonth(), 5),
        });

        transactionsData.push({
            userId: user.id,
            accountId: checkingAccount.id,
            categoryId: createdCategories[1].id, // Consulting
            amount: 1500 + Math.random() * 1000,
            type: 'income',
            description: 'Consulting Services',
            date: new Date(date.getFullYear(), date.getMonth(), 12),
        });

        // Expense transactions
        transactionsData.push({
            userId: user.id,
            accountId: checkingAccount.id,
            categoryId: createdCategories[2].id, // Rent
            amount: 2500,
            type: 'expense',
            description: 'Office Rent',
            date: new Date(date.getFullYear(), date.getMonth(), 1),
        });

        transactionsData.push({
            userId: user.id,
            accountId: checkingAccount.id,
            categoryId: createdCategories[3].id, // Utilities
            amount: 150 + Math.random() * 100,
            type: 'expense',
            description: 'Electricity & Water',
            date: new Date(date.getFullYear(), date.getMonth(), 3),
        });

        transactionsData.push({
            userId: user.id,
            accountId: checkingAccount.id,
            categoryId: createdCategories[4].id, // Dining
            amount: 200 + Math.random() * 300,
            type: 'expense',
            description: 'Business Meals',
            date: new Date(date.getFullYear(), date.getMonth(), 10),
        });

        transactionsData.push({
            userId: user.id,
            accountId: checkingAccount.id,
            categoryId: createdCategories[5].id, // Travel
            amount: 300 + Math.random() * 500,
            type: 'expense',
            description: 'Business Travel',
            date: new Date(date.getFullYear(), date.getMonth(), 20),
        });
    }

    // Create all transactions
    for (const txData of transactionsData) {
        await prisma.transaction.create({
            data: txData,
        });
    }
    console.log(`✓ Created ${transactionsData.length} transactions\n`);

    console.log('✅ Database seeding complete!\n');
    console.log('📝 Test Credentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}\n`);
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

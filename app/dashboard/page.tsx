'use client';

import { useEffect, useState } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, Filter, Download } from 'lucide-react';
import { KPICard } from '../components/dashboard/KPICard';
import { DashboardLineChart } from '../components/dashboard/LineChart';
import { DashboardDonutChart } from '../components/dashboard/DonutChart';
import { TransactionsTable } from '../components/dashboard/TransactionsTable';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

interface DashboardStats {
  totalRevenue: string;
  totalExpenses: string;
  netProfit: string;
  activeAccounts: number;
}

interface MonthlyData {
  name: string;
  income: number;
  expenses: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  description?: string;
  category: {
    name: string;
  };
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);

        // Fetch all dashboard data in parallel
        const [statsRes, monthlyRes, categoryRes, transactionsRes] = await Promise.all([
          fetch('/api/dashboard/stats'),
          fetch('/api/transactions/monthly'),
          fetch('/api/transactions/by-category'),
          fetch('/api/transactions?limit=5'),
        ]);

        if (!statsRes.ok || !monthlyRes.ok || !categoryRes.ok || !transactionsRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const [statsData, monthlyDataRes, categoryDataRes, transactionsData] = await Promise.all([
          statsRes.json(),
          monthlyRes.json(),
          categoryRes.json(),
          transactionsRes.json(),
        ]);

        setStats(statsData.data);
        setMonthlyData(monthlyDataRes.data || []);
        setCategoryData(categoryDataRes.data || []);
        setTransactions(transactionsData.data?.transactions || []);
      } catch (err: any) {
        console.error('Dashboard data error:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 lg:p-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 lg:p-10">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h3 className="text-red-800 dark:text-red-400 font-bold mb-2">Error Loading Dashboard</h3>
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
            variant="outline"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Calculate revenue change (simplified - you can enhance this with historical data)
  const revenueChange = stats ? '+20.1% from last month' : '';
  const expenseChange = stats ? '+4.5% from last month' : '';
  const profitChange = stats ? '+12.2% from last month' : '';

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl italic font-black text-foreground tracking-tight">Financial Overview</h1>
          <p className="text-muted mt-1">Track your business performance and cash flow</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-11 px-4 gap-2">
            <Filter className="size-4" />
            <span>Filter</span>
          </Button>
          <Button className="rounded-xl h-11 px-6 gap-2">
            <Download className="size-4" />
            <span>Generate Report</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value={`$${stats?.totalRevenue || '0.00'}`}
          change={revenueChange}
          changeType="positive"
          icon={<DollarSign className="size-5" />}
        />
        <KPICard
          title="Total Expenses"
          value={`$${stats?.totalExpenses || '0.00'}`}
          change={expenseChange}
          changeType="negative"
          icon={<CreditCard className="size-5" />}
        />
        <KPICard
          title="Net Profit"
          value={`$${stats?.netProfit || '0.00'}`}
          change={profitChange}
          changeType={parseFloat(stats?.netProfit || '0') >= 0 ? 'positive' : 'negative'}
          icon={<ArrowUpRight className="size-5" />}
        />
        <KPICard
          title="Active Accounts"
          value={stats?.activeAccounts.toString() || '0'}
          change="Manage your accounts"
          changeType="neutral"
          icon={<ArrowDownRight className="size-5" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-8 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <div>
              <CardTitle className="text-xl">Cash Flow Analysis</CardTitle>
              <CardDescription>Monthly revenue vs expenses</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-primary" />
                <span className="text-xs font-bold text-muted">Revenue</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-2">
            <DashboardLineChart data={monthlyData} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl">Spending Breakdown</CardTitle>
            <CardDescription>Major expense categories</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardDonutChart data={categoryData} />
          </CardContent>
        </Card>
      </div>

      {/* Transactions Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Recent Transactions</CardTitle>
            <CardDescription>Latest financial activities</CardDescription>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary/80 font-bold">
            View All
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <TransactionsTable transactions={transactions} />
        </CardContent>
      </Card>

      {/* Bottom Spacer */}
      <div className="h-10" />
    </div>
  );
}



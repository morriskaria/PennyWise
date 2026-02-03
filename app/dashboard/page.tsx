'use client';

import { DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, Filter, Download } from 'lucide-react';
import { KPICard } from '../components/dashboard/KPICard';
import { DashboardLineChart } from '../components/dashboard/LineChart';
import { DashboardDonutChart } from '../components/dashboard/DonutChart';
import { TransactionsTable } from '../components/dashboard/TransactionsTable';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

export default function DashboardPage() {
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
          value="$45,231.89"
          change="+20.1% from last month"
          changeType="positive"
          icon={<DollarSign className="size-5" />}
        />
        <KPICard
          title="Total Expenses"
          value="$12,350.00"
          change="+4.5% from last month"
          changeType="negative"
          icon={<CreditCard className="size-5" />}
        />
        <KPICard
          title="Net Profit"
          value="$32,881.89"
          change="+12.2% from last month"
          changeType="positive"
          icon={<ArrowUpRight className="size-5" />}
        />
        <KPICard
          title="Active Accounts"
          value="24"
          change="+2 new this week"
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
            <DashboardLineChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl">Spending Breakdown</CardTitle>
            <CardDescription>Major expense categories</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardDonutChart />
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
          <TransactionsTable />
        </CardContent>
      </Card>

      {/* Bottom Spacer */}
      <div className="h-10" />
    </div>
  );
}



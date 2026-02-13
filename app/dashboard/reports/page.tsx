'use client';

import { Download, Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { DashboardBarChart } from '@/app/components/dashboard/BarChart';
import { DashboardDonutChart } from '@/app/components/dashboard/DonutChart';


export default function ReportsPage() {
  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl italic font-black text-foreground tracking-tight">Financial Reports</h1>
          <p className="text-muted mt-1">Detailed analysis of your business performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-11 px-4 gap-2 border-border bg-card">
            <Calendar className="size-4 text-primary" />
            <span className="text-xs italic font-bold">Jan 1, 2024 - Jun 30, 2024</span>
            <ChevronDown className="size-3 text-muted" />
          </Button>
          <Button className="rounded-xl h-11 px-6 gap-2 brand-gradient">
            <Download className="size-4" />
            <span className="italic font-bold">Export PDF</span>
          </Button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue vs Expenses Chart */}
        <Card className="lg:col-span-8 shadow-card border-border bg-card overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <div>
              <CardTitle className="text-xl italic font-black text-foreground">Revenue vs Expenses</CardTitle>
              <CardDescription>Monthly comparison of cash flow</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-primary" />
                <span className="text-xs italic font-bold text-muted">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-slate-200" />
                <span className="text-xs italic font-bold text-muted">Expenses</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <DashboardBarChart />
            </div>
          </CardContent>
        </Card>

        {/* Expenses by Category */}
        <Card className="lg:col-span-4 shadow-card border-border bg-card">
          <CardHeader>
            <CardTitle className="text-xl italic font-black text-foreground">Spending Breakdown</CardTitle>
            <CardDescription>By category this month</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="h-[250px] w-full relative mb-6">
              <DashboardDonutChart />
            </div>
            <div className="space-y-4 mt-auto">
              <div className="flex items-center justify-between p-3 rounded-xl bg-accent/50">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-primary" />
                  <span className="text-sm italic font-bold text-foreground">Marketing</span>
                </div>
                <span className="text-sm italic font-black text-foreground">45%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-accent/50">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-accent" />
                  <span className="text-sm italic font-bold text-foreground">Payroll</span>
                </div>
                <span className="text-sm italic font-black text-foreground">35%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-accent/50">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-slate-400" />
                  <span className="text-sm italic font-bold text-foreground">Operations</span>
                </div>
                <span className="text-sm italic font-black text-foreground">20%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profit and Loss Table */}
      <Card className="shadow-card border-border bg-card overflow-hidden">
        <CardHeader className="border-b border-border bg-accent/20">
          <CardTitle className="text-xl italic font-black text-foreground">Profit and Loss Summary</CardTitle>
          <CardDescription>Quarterly performance breakdown</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-[10px] italic font-black text-muted-foreground uppercase tracking-wider">Account</th>
                <th className="px-6 py-4 text-[10px] italic font-black text-muted-foreground uppercase tracking-wider text-right">Q1 2024</th>
                <th className="px-6 py-4 text-[10px] italic font-black text-muted-foreground uppercase tracking-wider text-right">Q2 2024</th>
                <th className="px-6 py-4 text-[10px] italic font-black text-muted-foreground uppercase tracking-wider text-right">Total</th>
                <th className="px-6 py-4 text-[10px] italic font-black text-muted-foreground uppercase tracking-wider text-right">Var %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="bg-primary/5">
                <td className="px-6 py-4 italic font-black text-foreground">Total Revenue</td>
                <td className="px-6 py-4 text-sm italic font-bold text-right text-foreground">$120,500</td>
                <td className="px-6 py-4 text-sm italic font-bold text-right text-foreground">$145,200</td>
                <td className="px-6 py-4 text-sm italic font-bold text-right text-foreground">$265,700</td>
                <td className="px-6 py-4 text-sm italic font-black text-right text-success">+20.5%</td>
              </tr>
              <tr className="group hover:bg-accent/30 transition-colors">
                <td className="px-8 py-4 text-sm text-muted">Cost of Goods Sold</td>
                <td className="px-6 py-4 text-sm text-right text-muted">$34,200</td>
                <td className="px-6 py-4 text-sm text-right text-muted">$41,500</td>
                <td className="px-6 py-4 text-sm text-right text-muted">$75,700</td>
                <td className="px-6 py-4 text-sm text-right text-muted">+21.3%</td>
              </tr>
              <tr className="bg-accent/10">
                <td className="px-6 py-4 italic font-black text-foreground">Gross Profit</td>
                <td className="px-6 py-4 text-sm italic font-bold text-right text-foreground">$86,300</td>
                <td className="px-6 py-4 text-sm italic font-bold text-right text-foreground">$103,700</td>
                <td className="px-6 py-4 text-sm italic font-bold text-right text-foreground">$190,000</td>
                <td className="px-6 py-4 text-sm italic font-black text-right text-success">+20.1%</td>
              </tr>
              <tr className="bg-primary/5">
                <td className="px-6 py-4 italic font-black text-foreground">Operating Expenses</td>
                <td className="px-6 py-4 text-sm italic font-bold text-right text-foreground">$45,100</td>
                <td className="px-6 py-4 text-sm italic font-bold text-right text-foreground">$48,200</td>
                <td className="px-6 py-4 text-sm italic font-bold text-right text-foreground">$93,300</td>
                <td className="px-6 py-4 text-sm italic font-black text-right text-muted">+6.8%</td>
              </tr>
              <tr className="group hover:bg-accent/30 transition-colors">
                <td className="px-8 py-4 text-sm text-muted">Marketing & Sales</td>
                <td className="px-6 py-4 text-sm text-right text-muted">$12,000</td>
                <td className="px-6 py-4 text-sm text-right text-muted">$14,500</td>
                <td className="px-6 py-4 text-sm text-right text-muted">$26,500</td>
                <td className="px-6 py-4 text-sm text-right text-muted">+20.8%</td>
              </tr>
              <tr className="group hover:bg-accent/30 transition-colors">
                <td className="px-8 py-4 text-sm text-muted">G&A Expenses</td>
                <td className="px-6 py-4 text-sm text-right text-muted">$33,100</td>
                <td className="px-6 py-4 text-sm text-right text-muted">$33,700</td>
                <td className="px-6 py-4 text-sm text-right text-muted">$66,800</td>
                <td className="px-6 py-4 text-sm text-right text-muted">+1.8%</td>
              </tr>
              <tr className="bg-primary brand-gradient">
                <td className="px-6 py-6 italic font-black text-white text-lg">Net Profit</td>
                <td className="px-6 py-6 text-lg italic font-black text-right text-white">$41,200</td>
                <td className="px-6 py-6 text-lg italic font-black text-right text-white">$55,500</td>
                <td className="px-6 py-6 text-lg italic font-black text-right text-white">$96,700</td>
                <td className="px-6 py-6 text-lg italic font-black text-right text-white">+34.7%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Spacer for FAB */}
      <div className="h-8"></div>
    </div>
  );
}



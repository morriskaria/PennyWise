'use client';

import Link from 'next/link';

const stats = [
  {
    label: 'Total Income',
    amount: '$45,230.00',
    change: '+12.5%',
    changeType: 'positive',
    progress: 75,
  },
  {
    label: 'Total Expenses',
    amount: '$28,150.00',
    change: '+4.2%',
    changeType: 'neutral',
    progress: 50,
  },
  {
    label: 'Net Profit',
    amount: '$17,080.00',
    change: '+18.2%',
    changeType: 'positive',
    progress: 60,
  },
];

const transactions = [
  {
    type: 'Income',
    category: 'Direct Sales',
    amount: '+$1,200.00',
    date: 'Oct 24, 2023',
    icon: 'trending_up',
    iconColor: 'text-success',
    badgeColor: 'bg-primary/10 text-primary',
  },
  {
    type: 'Expense',
    category: 'Rent',
    amount: '-$2,500.00',
    date: 'Oct 22, 2023',
    icon: 'trending_down',
    iconColor: 'text-slate-400',
    badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300',
  },
  {
    type: 'Income',
    category: 'Consulting',
    amount: '+$850.00',
    date: 'Oct 20, 2023',
    icon: 'trending_up',
    iconColor: 'text-success',
    badgeColor: 'bg-primary/10 text-primary',
  },
  {
    type: 'Expense',
    category: 'Utilities',
    amount: '-$120.00',
    date: 'Oct 18, 2023',
    icon: 'trending_down',
    iconColor: 'text-slate-400',
    badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300',
  },
];

export default function DashboardPage() {
  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8">
      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-neutral-slate p-4 lg:p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-2"
          >
            <div className="flex justify-between items-start">
              <p className="text-slate-500 dark:text-slate-400 text-xs lg:text-sm font-medium">{stat.label}</p>
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${
                  stat.changeType === 'positive'
                    ? 'bg-success/10 text-success'
                    : stat.changeType === 'negative'
                    ? 'bg-red-500/10 text-red-500'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-2xl lg:text-3xl font-bold dark:text-white tracking-tight">{stat.amount}</p>
            <div className="mt-2 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  stat.changeType === 'positive' ? 'bg-primary' : stat.changeType === 'negative' ? 'bg-red-500' : 'bg-slate-400'
                }`}
                style={{ width: `${stat.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Cash Flow Chart Section */}
      <div className="bg-white dark:bg-neutral-slate rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <h3 className="text-lg font-bold dark:text-white">Monthly Cash Flow</h3>
            <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400">Net movement of cash across your business</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 lg:px-4 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
              Last 6 Months
            </button>
            <button className="px-3 lg:px-4 py-1.5 text-xs font-medium bg-primary text-white rounded-lg">
              Export Report
            </button>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-48 lg:h-72 w-full relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 280" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#10b77f" stopOpacity="0.3"></stop>
                <stop offset="95%" stopColor="#10b77f" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
            {/* Grid Lines */}
            <line className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" x1="0" x2="1000" y1="0" y2="0"></line>
            <line className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" x1="0" x2="1000" y1="70" y2="70"></line>
            <line className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" x1="0" x2="1000" y1="140" y2="140"></line>
            <line className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" x1="0" x2="1000" y1="210" y2="210"></line>
            <line className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" x1="0" x2="1000" y1="280" y2="280"></line>
            
            {/* Area/Line Chart */}
            <path
              className="stroke-primary"
              d="M0,210 Q100,200 200,80 T400,120 T600,60 T800,160 T1000,40"
              fill="none"
              strokeLinecap="round"
              strokeWidth="4"
            ></path>
            <path
              d="M0,210 Q100,200 200,80 T400,120 T600,60 T800,160 T1000,40 L1000,280 L0,280 Z"
              fill="url(#chartGradient)"
            ></path>
            
            {/* Data Points */}
            <circle className="fill-white dark:fill-neutral-slate stroke-primary" cx="200" cy="80" r="6" strokeWidth="3"></circle>
            <circle className="fill-white dark:fill-neutral-slate stroke-primary" cx="600" cy="60" r="6" strokeWidth="3"></circle>
            <circle className="fill-white dark:fill-neutral-slate stroke-primary" cx="1000" cy="40" r="6" strokeWidth="3"></circle>
          </svg>
          
          <div className="flex justify-between mt-2 lg:mt-4 px-1 lg:px-2">
            {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'].map((month) => (
              <span key={month} className="text-xs text-slate-400 font-medium">{month}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="bg-white dark:bg-neutral-slate rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h3 className="text-base lg:text-lg font-bold dark:text-white">Recent Transactions</h3>
          <Link
            href="/dashboard/transactions"
            className="text-xs lg:text-sm text-primary font-medium hover:underline"
          >
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-background-dark/30">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-4 lg:px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-4 lg:px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 lg:px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-4 lg:px-6 py-3 lg:py-4">
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined text-lg ${transaction.iconColor}`}>
                        {transaction.icon}
                      </span>
                      <span className="text-xs lg:text-sm font-medium dark:text-white">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4">
                    <span className={`px-2 py-1 text-xs rounded-lg font-medium ${transaction.badgeColor}`}>
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-semibold text-success">
                    {transaction.amount}
                  </td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                    {transaction.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Spacer for FAB */}
      <div className="h-12 lg:h-16"></div>

      {/* Floating Action Button */}
      <Link
        href="/dashboard/invoices/new"
        className="fixed bottom-6 lg:bottom-8 right-6 lg:right-8 size-12 lg:size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/20 hover:bg-success transition-all flex items-center justify-center group z-40"
        title="Add New"
      >
        <span className="material-symbols-outlined text-2xl lg:text-3xl group-hover:rotate-90 transition-transform">add</span>
      </Link>
    </div>
  );
}


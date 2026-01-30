'use client';

export default function ReportsPage() {
  return (
    <div className="p-8 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Financial Reports</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2 gap-2 text-sm border border-transparent hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer transition-all">
            <span className="material-symbols-outlined text-slate-400 text-lg">calendar_today</span>
            <span className="text-slate-600 dark:text-slate-300">Jan 1, 2024 - Jun 30, 2024</span>
            <span className="material-symbols-outlined text-slate-400 text-lg">expand_more</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:brightness-110 transition-all shadow-sm">
            <span className="material-symbols-outlined text-lg">download</span>
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue vs Expenses Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-slate rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 dark:text-white">Revenue vs Expenses</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 bg-primary rounded-full"></span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Expenses</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-end justify-between gap-4 h-64 px-2">
            {/* January */}
            <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
              <div className="w-full flex justify-center gap-1">
                <div className="w-3 bg-primary h-40 rounded-t-sm chart-bar"></div>
                <div className="w-3 bg-slate-300 dark:bg-slate-600 h-28 rounded-t-sm chart-bar"></div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">JAN</span>
            </div>
            {/* February */}
            <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
              <div className="w-full flex justify-center gap-1">
                <div className="w-3 bg-primary h-48 rounded-t-sm chart-bar"></div>
                <div className="w-3 bg-slate-300 dark:bg-slate-600 h-24 rounded-t-sm chart-bar"></div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">FEB</span>
            </div>
            {/* March */}
            <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
              <div className="w-full flex justify-center gap-1">
                <div className="w-3 bg-primary h-32 rounded-t-sm chart-bar"></div>
                <div className="w-3 bg-slate-300 dark:bg-slate-600 h-36 rounded-t-sm chart-bar"></div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">MAR</span>
            </div>
            {/* April */}
            <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
              <div className="w-full flex justify-center gap-1">
                <div className="w-3 bg-primary h-56 rounded-t-sm chart-bar"></div>
                <div className="w-3 bg-slate-300 dark:bg-slate-600 h-20 rounded-t-sm chart-bar"></div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">APR</span>
            </div>
            {/* May */}
            <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
              <div className="w-full flex justify-center gap-1">
                <div className="w-3 bg-primary h-44 rounded-t-sm chart-bar"></div>
                <div className="w-3 bg-slate-300 dark:bg-slate-600 h-30 rounded-t-sm chart-bar"></div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">MAY</span>
            </div>
            {/* June */}
            <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
              <div className="w-full flex justify-center gap-1">
                <div className="w-3 bg-primary h-60 rounded-t-sm chart-bar"></div>
                <div className="w-3 bg-slate-300 dark:bg-slate-600 h-22 rounded-t-sm chart-bar"></div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">JUN</span>
            </div>
          </div>
        </div>

        {/* Expenses by Category */}
        <div className="bg-white dark:bg-neutral-slate rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col">
          <h3 className="font-bold text-slate-800 dark:text-white mb-6">Expenses by Category</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <svg className="size-48 -rotate-90" viewBox="0 0 100 100">
              <circle className="text-slate-100 dark:text-slate-800" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="12"></circle>
              <circle className="opacity-90" cx="50" cy="50" fill="transparent" r="40" stroke="#10B981" strokeDasharray="251.2" strokeDashoffset="100.48" strokeWidth="12"></circle>
              <circle className="opacity-70" cx="50" cy="50" fill="transparent" r="40" stroke="#22C55E" strokeDasharray="251.2" strokeDashoffset="210.48" strokeWidth="12"></circle>
              <circle className="opacity-50" cx="50" cy="50" fill="transparent" r="40" stroke="#334155" strokeDasharray="251.2" strokeDashoffset="240.2" strokeWidth="12"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold dark:text-white">$12.4k</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Total spent</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary"></span>
                <span className="text-xs text-slate-600 dark:text-slate-400">Marketing</span>
              </div>
              <span className="text-xs font-semibold dark:text-white">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-success"></span>
                <span className="text-xs text-slate-600 dark:text-slate-400">Payroll</span>
              </div>
              <span className="text-xs font-semibold dark:text-white">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-slate-500"></span>
                <span className="text-xs text-slate-600 dark:text-slate-400">Operations</span>
              </div>
              <span className="text-xs font-semibold dark:text-white">20%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profit and Loss Table */}
      <div className="bg-white dark:bg-neutral-slate rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold dark:text-white">Profit and Loss Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-background-dark/30">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Account</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Q1 2024</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Q2 2024</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Total</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Var %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                <td className="px-6 py-4 font-bold text-sm dark:text-white">Total Revenue</td>
                <td className="px-6 py-4 text-sm font-semibold text-right dark:text-white">$120,500</td>
                <td className="px-6 py-4 text-sm font-semibold text-right dark:text-white">$145,200</td>
                <td className="px-6 py-4 text-sm font-semibold text-right dark:text-white">$265,700</td>
                <td className="px-6 py-4 text-sm font-semibold text-right text-success">+20.5%</td>
              </tr>
              <tr>
                <td className="px-8 py-3 text-sm text-slate-600 dark:text-slate-400 italic">Cost of Goods Sold</td>
                <td className="px-6 py-3 text-sm text-right text-slate-600 dark:text-slate-400">$34,200</td>
                <td className="px-6 py-3 text-sm text-right text-slate-600 dark:text-slate-400">$41,500</td>
                <td className="px-6 py-3 text-sm text-right text-slate-600 dark:text-slate-400">$75,700</td>
                <td className="px-6 py-3 text-sm text-right text-slate-600 dark:text-slate-400">+21.3%</td>
              </tr>
              <tr className="bg-slate-50/20 dark:bg-slate-800/10">
                <td className="px-6 py-4 font-bold text-sm dark:text-white">Gross Profit</td>
                <td className="px-6 py-4 text-sm font-semibold text-right dark:text-white">$86,300</td>
                <td className="px-6 py-4 text-sm font-semibold text-right dark:text-white">$103,700</td>
                <td className="px-6 py-4 text-sm font-semibold text-right dark:text-white">$190,000</td>
                <td className="px-6 py-4 text-sm font-semibold text-right text-success">+20.1%</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                <td className="px-6 py-4 font-bold text-sm dark:text-white">Operating Expenses</td>
                <td className="px-6 py-4 text-sm font-semibold text-right dark:text-white">$45,100</td>
                <td className="px-6 py-4 text-sm font-semibold text-right dark:text-white">$48,200</td>
                <td className="px-6 py-4 text-sm font-semibold text-right dark:text-white">$93,300</td>
                <td className="px-6 py-4 text-sm font-semibold text-right text-slate-400">+6.8%</td>
              </tr>
              <tr>
                <td className="px-8 py-3 text-sm text-slate-600 dark:text-slate-400 italic">Marketing & Sales</td>
                <td className="px-6 py-3 text-sm text-right text-slate-600 dark:text-slate-400">$12,000</td>
                <td className="px-6 py-3 text-sm text-right text-slate-600 dark:text-slate-400">$14,500</td>
                <td className="px-6 py-3 text-sm text-right text-slate-600 dark:text-slate-400">$26,500</td>
                <td className="px-6 py-3 text-sm text-right text-slate-600 dark:text-slate-400">+20.8%</td>
              </tr>
              <tr>
                <td className="px-8 py-3 text-sm text-slate-600 dark:text-slate-400 italic">G&A Expenses</td>
                <td className="px-6 py-3 text-sm text-right text-slate-600 dark:text-slate-400">$33,100</td>
                <td className="px-6 py-3 text-sm text-right text-slate-600 dark:text-slate-400">$33,700</td>
                <td className="px-6 py-3 text-sm text-right text-slate-600 dark:text-slate-400">$66,800</td>
                <td className="px-6 py-3 text-sm text-right text-slate-600 dark:text-slate-400">+1.8%</td>
              </tr>
              <tr className="bg-primary/5 dark:bg-primary/10">
                <td className="px-6 py-5 font-bold text-base text-primary">Net Profit</td>
                <td className="px-6 py-5 text-base font-bold text-right text-primary">$41,200</td>
                <td className="px-6 py-5 text-base font-bold text-right text-primary">$55,500</td>
                <td className="px-6 py-5 text-base font-bold text-right text-primary">$96,700</td>
                <td className="px-6 py-5 text-base font-bold text-right text-primary">+34.7%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Spacer for FAB */}
      <div className="h-8"></div>
    </div>
  );
}


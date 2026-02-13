'use client';

import React, { useState } from 'react';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userInitials: string;
  userInitialsColor: string;
  action: string;
  actionType: 'update' | 'settings' | 'export' | 'access';
  ipAddress: string;
  details: string;
}

const auditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-05-24 14:32:01',
    user: 'John Doe',
    userInitials: 'JD',
    userInitialsColor: 'bg-primary/20 text-primary',
    action: 'Update',
    actionType: 'update',
    ipAddress: '197.248.31.102',
    details: 'Invoice #INV-2024-089 updated (Total changed from 12k to 14k)',
  },
  {
    id: '2',
    timestamp: '2024-05-24 11:15:45',
    user: 'Jane Smith',
    userInitials: 'JS',
    userInitialsColor: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
    action: 'Settings',
    actionType: 'settings',
    ipAddress: '41.215.174.5',
    details: 'VAT Registration status changed to "VAT Registered"',
  },
  {
    id: '3',
    timestamp: '2024-05-23 16:50:22',
    user: 'John Doe',
    userInitials: 'JD',
    userInitialsColor: 'bg-primary/20 text-primary',
    action: 'Export',
    actionType: 'export',
    ipAddress: '197.248.31.102',
    details: 'Generated Excel export: "Full Sales Report Q1"',
  },
  {
    id: '4',
    timestamp: '2024-05-23 09:05:10',
    user: 'System Admin',
    userInitials: 'SM',
    userInitialsColor: 'bg-red-100 dark:bg-red-900/30 text-red-600',
    action: 'Access',
    actionType: 'access',
    ipAddress: '105.161.44.29',
    details: 'Failed login attempt from unauthorized device',
  },
];

const getActionColor = (actionType: string) => {
  switch (actionType) {
    case 'update':
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
    case 'settings':
      return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
    case 'export':
      return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
    case 'access':
      return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
    default:
      return '';
  }
};

export default function AuditPage() {
  const [exportType, setExportType] = useState('sales');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-03-31');

  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    alert(`Exporting ${exportType} as ${format.toUpperCase()} from ${startDate} to ${endDate}`);
  };

  return (
    <div className="space-y-12">
      {/* Data Export Section */}
      <section id="data-export">
        <div className="mb-6">
          <h3 className="text-lg font-bold dark:text-white">Data Export</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Download your financial records in KRA-compliant formats for tax filing or external accounting.</p>
        </div>
        <div className="bg-white dark:bg-neutral-slate rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            <div className="space-y-2">
              <label htmlFor="export-type" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Data Type
              </label>
              <select
                id="export-type"
                value={exportType}
                onChange={(e) => setExportType(e.target.value)}
                className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
              >
                <option value="sales">Sales & Invoices (KRA Ready)</option>
                <option value="expenses">Business Expenses</option>
                <option value="vat">VAT Return Summary</option>
                <option value="pnl">Profit & Loss Statement</option>
                <option value="inventory">Inventory Records</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Date Range</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleExport('pdf')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-semibold transition-all"
              >
                <span className="material-symbols-outlined text-xl">description</span>
                PDF
              </button>
              <button
                onClick={() => handleExport('csv')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-semibold transition-all"
              >
                <span className="material-symbols-outlined text-xl">table_view</span>
                CSV
              </button>
              <button
                onClick={() => handleExport('excel')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
              >
                <span className="material-symbols-outlined text-xl text-white">download</span>
                Excel
              </button>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-lg">
            <span className="material-symbols-outlined text-primary">verified</span>
            <p className="text-xs text-slate-600 dark:text-slate-300">Exports include KRA PIN, ETR/eTIMS references, and standard VAT breakdowns for easier iTax uploads.</p>
          </div>
        </div>
      </section>

      {/* Audit Trail Section */}
      <section id="audit-trail">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h3 className="text-lg font-bold dark:text-white">Audit Trail</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Track all system activities and record changes for security and compliance.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-primary font-semibold cursor-pointer hover:underline">
            <span className="material-symbols-outlined text-lg">filter_alt</span>
            Filter Logs
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-slate rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-background-dark/30 border-b border-slate-200 dark:border-slate-700">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">IP Address</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{log.timestamp}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`size-6 rounded-full flex items-center justify-center text-[10px] font-bold ${log.userInitialsColor}`}>
                          {log.userInitials}
                        </div>
                        <span className="text-sm font-medium dark:text-white">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${getActionColor(log.actionType)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-slate-500 dark:text-slate-400">{log.ipAddress}</td>
                    <td className="px-6 py-4 text-sm dark:text-slate-300">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-slate-50 dark:bg-background-dark/30 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">Showing last 50 activities</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-4 pb-12">
        <button className="px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          Discard Changes
        </button>
        <button className="px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
          Save Preferences
        </button>
      </div>
    </div>
  );
}

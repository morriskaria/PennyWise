'use client';

import React, { useState, useEffect } from 'react';
import { useInvoices } from '@/lib/hooks';

interface Invoice {
  id: string;
  invoiceNo: string;
  client: string;
  clientInitials: string;
  clientColor: string;
  issueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  amount: number;
}

export default function InvoicesPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedInvoices, setSelectedInvoices] = useState<Set<string>>(new Set());
  const [dateRange, setDateRange] = useState('last-30');
  const [userId, setUserId] = useState<string>('');

  // Fetch invoices from backend
  const { data: apiData, loading, error, refetch } = useInvoices(userId, selectedStatus);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    totalOutstanding: 0,
    overdue: 0,
    paidThisMonth: 0,
  });

  // Get userId (you should get this from auth context in a real app)
  useEffect(() => {
    // For now, use a placeholder. In production, get from session/auth
    const uid = localStorage.getItem('userId') || 'demo-user-1';
    setUserId(uid);
  }, []);

  // Update state when API data changes
  useEffect(() => {
    if (apiData && typeof apiData === 'object' && 'invoices' in apiData) {
      setInvoices((apiData as any).invoices || []);
      if ('stats' in apiData) {
        setStats((apiData as any).stats);
      }
    }
  }, [apiData]);

  const toggleInvoiceSelection = (invoiceId: string) => {
    const newSelected = new Set(selectedInvoices);
    if (newSelected.has(invoiceId)) {
      newSelected.delete(invoiceId);
    } else {
      newSelected.add(invoiceId);
    }
    setSelectedInvoices(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedInvoices.size === invoices.length) {
      setSelectedInvoices(new Set());
    } else {
      setSelectedInvoices(new Set(invoices.map((inv) => inv.id)));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20' },
      pending: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' },
      overdue: { bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/20' },
      draft: { bg: 'bg-slate-700', text: 'text-slate-400', border: 'border-slate-700' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;

    return (
      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.text} border ${config.border}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const statCards = [
    {
      label: 'Total Outstanding',
      amount: `KES ${stats.totalOutstanding?.toLocaleString('en-KE') || '0'}`,
      subtext: `${invoices.length} invoices`,
      icon: 'account_balance_wallet',
      color: 'text-primary',
    },
    {
      label: 'Overdue',
      amount: `KES ${stats.overdue?.toLocaleString('en-KE') || '0'}`,
      subtext: '+15% from last month',
      icon: 'warning',
      color: 'text-red-500',
    },
    {
      label: 'Paid this Month',
      amount: `KES ${stats.paidThisMonth?.toLocaleString('en-KE') || '0'}`,
      subtext: '85% target reached',
      icon: 'check_circle',
      color: 'text-primary',
    },
  ];

  if (loading && invoices.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-8 bg-neutral-slate flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-400">Loading invoices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-y-auto p-8 bg-neutral-slate">
        <div className="bg-red-900/20 border border-red-500/20 text-red-200 p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-neutral-slate">
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Invoices</h2>
        <button className="flex items-center gap-2 bg-primary hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-xl">add</span>
          Create New Invoice
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-[#111827] p-6 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-400">{stat.label}</span>
              <span className={`material-symbols-outlined ${stat.color}`}>{stat.icon}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-white">{stat.amount}</h3>
              <span className={`text-xs ${stat.color.includes('primary') ? 'text-primary' : 'text-red-500'} font-medium`}>
                {stat.subtext}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Actions */}
      <div className="bg-[#111827] border border-slate-800 rounded-t-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg">
          {['all', 'draft', 'pending', 'paid', 'overdue'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedStatus === status
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
              calendar_today
            </span>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-8 py-1.5 text-sm text-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
            >
              <option value="last-30">Last 30 Days</option>
              <option value="quarter">This Quarter</option>
              <option value="year">Year to Date</option>
              <option value="custom">Custom Range</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xl">
              expand_more
            </span>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-lg">download</span>
            Export
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-[#111827] border-x border-b border-slate-800 rounded-b-xl overflow-hidden">
        {/* Batch Actions */}
        <div className="px-6 py-3 bg-slate-900/50 border-b border-slate-800 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedInvoices.size === invoices.length && invoices.length > 0}
              onChange={toggleSelectAll}
              className="rounded border-slate-700 bg-slate-800 text-primary focus:ring-offset-slate-900 focus:ring-2 focus:ring-primary cursor-pointer"
            />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Select All</span>
          </div>
          {selectedInvoices.size > 0 && (
            <div className="flex items-center gap-4">
              <button className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                <span className="material-symbols-outlined text-lg">mail</span> Send Reminders
              </button>
              <button className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                <span className="material-symbols-outlined text-lg">cloud_download</span> Bulk Download
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="pl-6 pr-4 py-4 w-12"></th>
              <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoice ID</th>
              <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
              <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Issue Date</th>
              <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount (KES)</th>
              <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {invoices.length > 0 ? (
              invoices.map((invoice: any) => (
                <tr key={invoice.id} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="pl-6 pr-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.has(invoice.id)}
                      onChange={() => toggleInvoiceSelection(invoice.id)}
                      className="rounded border-slate-700 bg-slate-800 text-primary focus:ring-offset-slate-900 focus:ring-2 focus:ring-primary cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-slate-300">{invoice.invoiceNumber}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                        {invoice.clientName.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-white">{invoice.clientName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-400">
                    {new Date(invoice.issueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">{getStatusBadge(invoice.status)}</td>
                  <td className="px-4 py-4 text-sm font-bold text-white text-right">
                    {Number(invoice.amount).toLocaleString('en-KE')}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>
                      <button className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-lg">more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-slate-400">
                  No invoices found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="text-slate-300 font-medium">1-10</span> of{' '}
            <span className="text-slate-300 font-medium">{invoices.length}</span> invoices
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-slate-700 rounded-lg text-slate-400 hover:bg-slate-800 disabled:opacity-50 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 text-sm border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

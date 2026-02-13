'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const settingsTabs = [
    { name: 'Business Profile', href: '/settings' },
    { name: 'Users & Roles', href: '/settings/users' },
    { name: 'Data & Audit', href: '/settings/audit' },
    { name: 'Integrations & API', href: '/settings/integrations' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 dark:bg-background-dark/50">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-lg font-bold dark:text-white">Settings</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">PW</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 max-w-6xl mx-auto w-full">
          {/* Tabs Navigation */}
          <div className="border-b border-slate-200 dark:border-slate-800 mb-8">
            <nav className="flex gap-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {settingsTabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`pb-4 text-sm font-medium transition-colors ${
                    pathname === tab.href
                      ? 'text-primary border-b-2 border-primary font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Page Content */}
          {children}
        </div>

        {/* Floating Action Button */}
        <button className="fixed bottom-8 right-8 size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/20 hover:bg-success transition-all flex items-center justify-center group">
          <span className="material-symbols-outlined text-3xl">save</span>
        </button>
      </main>
    </div>
  );
}

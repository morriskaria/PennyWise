'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto bg-background/50 backdrop-blur-3xl">
          {children}
        </div>

        {/* Floating Action Button */}
        <Button
          className="fixed bottom-8 right-8 size-14 rounded-full shadow-2xl shadow-primary/40 hover:scale-110 transition-all duration-300 p-0"
        >
          <Plus className="size-7" />
        </Button>
      </main>
    </div>
  );
}



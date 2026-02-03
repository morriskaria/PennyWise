'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Receipt,
  Settings,
  TrendingUp,
  Wallet,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/reports', label: 'Reports', icon: BarChart3 },
  { href: '/dashboard/invoices', label: 'Invoices', icon: Receipt },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Side Navigation Bar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-card border-r border-border z-50 transform lg:translate-x-0 transition-transform duration-200 ease-out lg:static lg:flex lg:flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 brand-gradient rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Wallet className="size-5 text-white" />
            </div>
            <h1 className="text-xl italic font-extrabold tracking-tight text-foreground">Pennywise</h1>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 text-muted hover:text-foreground">
            <X className="size-5" />
          </button>
        </div>

        <div className="px-4 mt-6">
          <p className="text-[10px] italic font-black uppercase tracking-wider text-muted-foreground ml-3 mb-3">Main Menu</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ease-out hover:translate-x-1",
                    isActive
                      ? "brand-gradient text-white shadow-md shadow-primary/20"
                      : "text-muted hover:bg-accent hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("size-5", isActive ? "text-white" : "text-muted group-hover:text-foreground")} />
                    <span className="italic font-bold tracking-tight">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="size-4 text-white/70 animate-in fade-in slide-in-from-left-1" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-accent/50 hover:bg-accent transition-all duration-200 cursor-pointer group">
            <Avatar className="size-10 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>PW</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 overflow-hidden">
              <p className="text-sm italic font-extrabold text-foreground truncate">Morris Karia</p>
              <p className="text-xs text-muted truncate">SME Owner</p>
            </div>
            <LogOut className="size-4 text-muted group-hover:text-danger transition-colors shrink-0" />
          </div>
        </div>
      </aside>

    </>
  );
}



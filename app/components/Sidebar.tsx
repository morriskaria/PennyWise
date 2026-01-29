'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/dashboard/reports', label: 'Reports', icon: 'bar_chart' },
  { href: '/dashboard/invoices', label: 'Invoices', icon: 'receipt_long' },
  { href: '/dashboard/settings', label: 'Settings', icon: 'settings' },
];

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800
          bg-white dark:bg-background-dark
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden'}
          flex flex-col
        `}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg flex-shrink-0">
            <span className="material-symbols-outlined text-white">account_balance_wallet</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight dark:text-white flex-shrink-0">Pennywise</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                  ${isActive
                    ? 'bg-primary text-white font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
              >
                <span className="material-symbols-outlined flex-shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3 p-2 rounded-lg">
            <div
              className="size-10 rounded-full bg-cover bg-center border-2 border-primary flex-shrink-0"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDI9ZQT894RN32wGMC5yh-kJ6yFYZCSsKCyG1Q4jK38LqXK2yBIWBssNerNVnbcvG_dgkqyHM8sORPO_ru302z3fTOQrZ2TRNw_NJGuOLpPr_4c9b09f_aL67hIWV_lChtxMlOx-_-G9VnY-CUWfg1hP7_6ebo-HY9kWNOwntsDfGOW4R4PiCKRjJ6Zr-6DoAhL0OuxRdqSslAx5ZEWqPvXSCssSLgjMdAAcTYhanGUPa1qApzupe3-xWjRcWvN9R_DgIVI1BRr1KI")' }}
            />
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-semibold dark:text-white truncate">Pennywise</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">SME Owner</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}


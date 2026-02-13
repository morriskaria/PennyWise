'use client';

import { useState } from 'react';
import { Bell, Search, Menu, MessageSquare, ChevronDown, Calendar } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ThemeToggle } from './ui/theme-toggle';
import { cn } from '@/lib/utils';

import PennyWiseLogoImg from './PennyWiseLogoImg';
import { LogoutButton } from './LogoutButton';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-20 border-b border-border bg-card flex items-center justify-between px-6 lg:px-10 z-30 sticky top-0">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="size-5" />
        </Button>

        {/* PennyWise Logo (image) */}
        <div className="flex items-center mr-4 select-none">
          <span className="block w-[160px] h-[48px]">
            <PennyWiseLogoImg className="w-full h-full object-contain" />
          </span>
        </div>
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted size-4" />
          <Input
            className="pl-10 bg-accent/50 border-none focus-visible:ring-primary/20 h-11 rounded-xl"
            placeholder="Search transactions, reports..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <LogoutButton />

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative group rounded-xl transition-all duration-200 ease-out">

            <Bell className="size-5 text-muted group-hover:text-foreground transition-colors" />
            <span className="absolute top-2.5 right-2.5 size-2 bg-danger rounded-full border-2 border-white"></span>
          </Button>

          <Button variant="ghost" size="icon" className="group rounded-xl hidden sm:flex transition-all duration-200 ease-out">
            <MessageSquare className="size-5 text-muted group-hover:text-foreground transition-colors" />
          </Button>
        </div>

        <div className="h-6 w-px bg-border mx-2 hidden sm:block"></div>

        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="hidden text-right lg:block">
            <p className="text-sm italic font-extrabold text-foreground leading-tight">Morris Karia</p>
            <p className="text-[10px] italic font-black text-muted uppercase tracking-wider">Premium Plan</p>
          </div>
          <Avatar className="size-10 border-2 border-transparent group-hover:border-primary/20 transition-all duration-200 ease-out">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

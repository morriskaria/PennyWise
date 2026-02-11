'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';

export function LogoutButton() {
    const handleLogout = async () => {
        await signOut({ callbackUrl: '/auth' });
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
        >
            <LogOut className="size-4" />
            <span>Logout</span>
        </Button>
    );
}

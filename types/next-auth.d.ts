import 'next-auth';

/**
 * Extend NextAuth types to include custom user fields
 */
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
        };
    }

    interface User {
        id: string;
        email: string;
        name: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        email: string;
        name: string;
    }
}

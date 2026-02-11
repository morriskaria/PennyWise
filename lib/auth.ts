import { hash, compare } from "bcrypt";
import prisma from "./prisma";

// Hash password before storing
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}

// Compare password during login
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return compare(password, hash);
}

// Create new user
export async function createUser(email: string, password: string, name: string) {
  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return user;
}

// Get user by email
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

// Get user by ID
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

// Sign in user
export async function signInUser(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword) {
    throw new Error("Invalid password");
  }

  return user;
}

/**
 * Get the current session (server-side)
 * @returns Current session or null if not authenticated
 */
export async function getServerSession() {
  // This will be implemented with NextAuth's getServerSession
  // For now, this is a placeholder
  // Import { getServerSession as nextAuthGetServerSession } from 'next-auth';
  // Import { authOptions } from '@/app/api/auth/[...nextauth]/route';
  // Return nextAuthGetServerSession(authOptions);
  return null;
}

/**
 * Require authentication for API routes
 * Throws error if not authenticated
 * @returns User session
 */
export async function requireAuth() {
  const session = await getServerSession();

  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  return session;
}


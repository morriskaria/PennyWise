import { z } from "zod";

// User validation
export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;

// Account validation
export const accountSchema = z.object({
  name: z.string().min(1, "Account name is required"),
  type: z.enum(["checking", "savings", "credit", "investment"]),
  balance: z.number().min(0, "Balance cannot be negative").default(0),
  currency: z.string().length(3).default("USD"),
});

export const updateAccountSchema = accountSchema.partial();

export type AccountInput = z.infer<typeof accountSchema>;
export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;

// Category validation
export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid hex color").default("#3B82F6"),
  icon: z.string().default("tag"),
});

export const updateCategorySchema = categorySchema.partial();

export type CategoryInput = z.infer<typeof categorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

// Transaction validation
export const transactionSchema = z.object({
  accountId: z.string().cuid("Invalid account"),
  categoryId: z.string().cuid("Invalid category"),
  amount: z.number().positive("Amount must be greater than 0"),
  type: z.enum(["income", "expense", "transfer"]),
  description: z.string().optional(),
  date: z.coerce.date(),
  isRecurring: z.boolean().default(false),
  frequency: z.enum(["daily", "weekly", "monthly", "yearly"]).optional(),
});

export const updateTransactionSchema = transactionSchema.omit({ accountId: true, categoryId: true }).partial().extend({
  accountId: z.string().cuid().optional(),
  categoryId: z.string().cuid().optional(),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;

// Budget validation
export const budgetSchema = z.object({
  categoryId: z.string().cuid("Invalid category"),
  limit: z.number().positive("Budget limit must be greater than 0"),
  period: z.enum(["monthly", "yearly"]).default("monthly"),
  month: z.number().min(1).max(12),
  year: z.number().min(2024),
});

export const updateBudgetSchema = budgetSchema.partial();

export type BudgetInput = z.infer<typeof budgetSchema>;
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>;

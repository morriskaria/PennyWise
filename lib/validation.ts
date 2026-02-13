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
// Invoice validation
export const invoiceSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Invalid email").optional(),
  clientPhone: z.string().optional(),
  issueDate: z.coerce.date(),
  dueDate: z.coerce.date().optional(),
  amount: z.number().positive("Amount must be greater than 0"),
  status: z.enum(["draft", "pending", "paid", "overdue"]).default("draft"),
  description: z.string().optional(),
  notes: z.string().optional(),
  paymentTerms: z.string().optional(),
  paymentMethod: z.enum(["mpesa", "bank", "cash", "cheque"]).optional(),
});

export const updateInvoiceSchema = invoiceSchema.partial();

export type InvoiceInput = z.infer<typeof invoiceSchema>;
export type UpdateInvoiceInput = z.infer<typeof updateInvoiceSchema>;

// Business Profile validation
export const businessProfileSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessEmail: z.string().email("Invalid email"),
  registrationNumber: z.string().optional(),
  kraPin: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  isVatRegistered: z.boolean().default(false),
  logo: z.string().url().optional(),
});

export const updateBusinessProfileSchema = businessProfileSchema.partial();

export type BusinessProfileInput = z.infer<typeof businessProfileSchema>;
export type UpdateBusinessProfileInput = z.infer<typeof updateBusinessProfileSchema>;

// Team Member validation
export const teamMemberSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(1, "Name is required"),
  role: z.enum(["admin", "accountant", "staff"]).default("staff"),
  permissions: z.record(z.string(), z.boolean()).optional(),
});

export const updateTeamMemberSchema = teamMemberSchema.partial();

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
export type UpdateTeamMemberInput = z.infer<typeof updateTeamMemberSchema>;

// Integration validation
export const integrationSchema = z.object({
  name: z.string().min(1, "Integration name is required"),
  status: z.enum(["active", "inactive", "pending"]).default("inactive"),
  config: z.record(z.string(), z.any()).optional(),
  apiKey: z.string().optional(),
  apiSecret: z.string().optional(),
});

export const updateIntegrationSchema = integrationSchema.partial();

export type IntegrationInput = z.infer<typeof integrationSchema>;
export type UpdateIntegrationInput = z.infer<typeof updateIntegrationSchema>;
# 🎓 Backend Setup - Comprehensive Learning Path

## Welcome to Backend Learning!

This guide will teach you everything about building a backend for PennyWise. We'll go step-by-step, focusing on **understanding** before implementing.

---

## Section 1: The Fundamentals

### What is a Backend? (Real-World Analogy)

Think of a restaurant:

```
FRONTEND (What customers see)
├── Menu display
├── Order form
└── Receipt

BACKEND (What happens behind the counter)
├── Chef receives order
├── Validates order (is it correct?)
├── Checks if items are in stock
├── Prepares the food
├── Updates inventory
└── Sends order to customer
```

Your PennyWise backend is like the kitchen - it:
- Receives data from the user
- Validates it (is it correct?)
- Checks permissions (are they allowed?)
- Processes it
- Saves to database
- Sends result back

---

## Section 2: Your Technology Stack

### The Tools You're Using

```
┌─────────────────┐
│   Next.js 16    │  ← Web framework (handles routing, servers)
├─────────────────┤
│   TypeScript    │  ← Type safety (catch errors early)
├─────────────────┤
│   Prisma ORM    │  ← Database translator (write JS, not SQL)
├─────────────────┤
│   PostgreSQL    │  ← Database (stores your data)
├─────────────────┤
│   NextAuth      │  ← Authentication (login/signup)
├─────────────────┤
│   Zod           │  ← Validation (ensures good data)
└─────────────────┘
```

### How They Work Together

```
User submits form
        ↓
Next.js Server Action receives it
        ↓
Zod validates the data
        ↓
NextAuth checks if user is logged in
        ↓
Your code checks permissions
        ↓
Prisma saves to PostgreSQL
        ↓
Response sent to user
```

---

## Section 3: The Three-Layer Backend Architecture

Your backend has three layers that work together:

### Layer 1: API Entry Points (Next.js)

**Location:** `app/actions/` and `app/api/`

**What it does:**
- Receives requests from the frontend
- Identifies the authenticated user
- Routes to business logic
- Returns responses

**Analogy:** The receptionist taking orders

### Layer 2: Business Logic (Your Code)

**Location:** Various utility files

**What it does:**
- Validates data with Zod
- Checks user permissions
- Applies business rules
- Prepares data for database

**Analogy:** The kitchen preparing the meal

### Layer 3: Data Access (Prisma + PostgreSQL)

**Location:** `prisma/schema.prisma`

**What it does:**
- Defines database structure
- Stores and retrieves data
- Maintains relationships
- Ensures data integrity

**Analogy:** The storage/inventory system

---

## Section 4: Understanding Databases

### What is a Database?

A database is an organized collection of related tables, like a spreadsheet with many sheets:

```
DATABASE: PennyWise
├── users table
├── businesses table
├── transactions table
├── categories table
└── audit_logs table
```

### What is a Table?

A table is like a spreadsheet with rows and columns:

```
USERS TABLE:
┌────┬───────────┬──────────────────┬──────────┐
│ id │ name      │ email            │ password │
├────┼───────────┼──────────────────┼──────────┤
│ 1  │ John Doe  │ john@example.com │ hashed.. │
│ 2  │ Jane Smith│ jane@example.com │ hashed.. │
└────┴───────────┴──────────────────┴──────────┘
```

### Relationships Between Tables

Tables can be linked together:

```
USER "John Doe" (id: 1)
        ↓ owns many
BUSINESSES
├── "John's Coffee Shop" (id: 101)
│   ↓ has many
│   TRANSACTIONS
│   ├── "Coffee machine purchase" (amount: 50000)
│   └── "Rent payment" (amount: 100000)
│
└── "John's Grocery" (id: 102)
    ↓ has many
    TRANSACTIONS
    └── "Stock purchase" (amount: 75000)
```

### The Database Schema

**Schema** = The blueprint of your database

```
It defines:
├── What tables exist
├── What columns each table has
├── What type of data each column holds
├── How tables relate to each other
└── What rules apply
```

Example:
```
TRANSACTIONS table has:
├── id (unique identifier)
├── businessId (which business)
├── amount (money amount - must be > 0)
├── description (text)
├── date (when it happened)
└── createdAt (when added to system)
```

---

## Section 5: Authentication & Authorization

### Authentication: "Who Are You?"

```
User provides email and password
        ↓
System checks database
        ↓
Password matches? 
├── YES → Create session
└── NO  → Reject login

Session = A way to remember "this is John" without
          asking for password on every request
```

### How Sessions Work

```
1. User logs in with password
2. System creates a token: "abc123token456"
3. Token stored in browser cookie
4. Every request includes token
5. System checks: is this token valid?
6. If valid → we know who you are
7. If invalid/expired → user must login again
```

### Authorization: "Are You Allowed?"

```
Just because user is logged in doesn't mean
they can access everything!

Example checks:
├── Does user own this business?
├── Is user an admin?
├── Does user have "editor" role?
└── Is user trying to see someone else's data?
```

### Real Example

```
User 1 logs in successfully (Authentication ✓)

User 1 tries to view User 2's business
        ↓
Check: Does User 1 own this business?
        ↓
NO → Authorization FAILED
        ↓
Reject with "Access Denied"
```

---

## Section 6: Data Validation

### Why Validation?

Bad data can break your app:

```
Frontend sends:
{
  amount: "not a number",      ← Should be numeric
  description: null,            ← Should be text
  category: "invalid",          ← Not in allowed list
  date: "not a date"           ← Should be valid date
}

Without validation → Your app crashes or saves garbage
With validation → You reject the request immediately
```

### Validation Layers

```
LAYER 1: Frontend Validation
├── Quick feedback to user
├── Better user experience
└── BUT user can bypass this!

LAYER 2: Backend Validation (IMPORTANT)
├── Can't be bypassed
├── Protects your data
└── This is the important one!

LAYER 3: Database Constraints
├── Last line of defense
└── Rules like "amount must be > 0"
```

### What Gets Validated?

For a transaction:
```
✓ Amount is a positive number
✓ Amount is not zero
✓ Description is provided and is a string
✓ Category exists in your category list
✓ Date is a valid date
✓ Date is not in the future
✓ Type is either "income" or "expense"
```

---

## Section 7: File Organization

### Where Backend Code Lives

```
PennyWise/
│
├── app/
│   ├── actions/                    ← Server Actions (new way)
│   │   ├── transactions.ts         ← Functions for transactions
│   │   ├── auth.ts                 ← Auth functions
│   │   └── reports.ts              ← Report functions
│   │
│   ├── api/                        ← API Routes (traditional way)
│   │   └── webhooks/
│   │       └── route.ts            ← For integrations
│   │
│   ├── page.tsx                    ← Home page
│   ├── layout.tsx                  ← Main layout
│   └── globals.css
│
├── lib/                             ← Shared utilities
│   ├── validation.ts               ← Zod schemas
│   ├── permissions.ts              ← Authorization logic
│   ├── auth.ts                     ← Auth helpers
│   ├── errors.ts                   ← Error handling
│   └── db.ts                       ← Database helpers
│
├── prisma/
│   ├── schema.prisma               ← Database blueprint
│   └── migrations/                 ← Database history
│
└── types/
    └── index.ts                    ← TypeScript types
```

### What Goes in Each Folder?

#### `app/actions/`
- Server Actions (functions backend can call)
- Handle business logic
- Call database via Prisma
- Example: `createTransaction()`, `getUserTransactions()`

#### `lib/validation.ts`
- Zod schemas defining data shapes
- Reusable for frontend and backend

#### `lib/permissions.ts`
- Check if user is authorized
- Example: `canUserEditBusiness(userId, businessId)`

#### `lib/auth.ts`
- Authentication helpers
- Get current user
- Check if user is logged in

#### `prisma/schema.prisma`
- Database blueprint
- Defines all tables
- Defines all relationships

---

## Section 8: The Complete Request Flow

### User Adds a Transaction (Step-by-Step)

```
STEP 1: User Interaction
┌────────────────────────────────────────┐
│ User fills form in browser:            │
├────────────────────────────────────────┤
│ Amount: 5000                           │
│ Description: "Office rent"             │
│ Category: "Expenses"                   │
│ Date: 2026-01-29                       │
│                                        │
│ Clicks "Add Transaction" button        │
└────────────────────────────────────────┘

STEP 2: Frontend Sends Data
┌────────────────────────────────────────┐
│ Browser sends to backend:              │
├────────────────────────────────────────┤
│ POST /api/transactions                 │
│ Body: {                                │
│   amount: 5000,                        │
│   description: "Office rent",          │
│   category: "Expenses",                │
│   date: "2026-01-29"                   │
│ }                                      │
│                                        │
│ Also includes: authentication token    │
└────────────────────────────────────────┘

STEP 3: Backend Receives
┌────────────────────────────────────────┐
│ Server Action runs:                    │
│ app/actions/transactions.ts            │
├────────────────────────────────────────┤
│ • Extract data from request            │
│ • Extract user ID from token           │
│ • Proceed to validation                │
└────────────────────────────────────────┘

STEP 4: Validate Data
┌────────────────────────────────────────┐
│ Zod checks each field:                 │
├────────────────────────────────────────┤
│ ✓ amount is a number: 5000             │
│ ✓ description is text: "Office rent"   │
│ ✓ category exists: "Expenses"          │
│ ✓ date is valid: 2026-01-29            │
│                                        │
│ All checks pass → Continue             │
└────────────────────────────────────────┘

STEP 5: Check Authorization
┌────────────────────────────────────────┐
│ Permissions check:                     │
├────────────────────────────────────────┤
│ • Is user logged in? ✓                 │
│ • Does user own this business? ✓       │
│ • Can user add transactions? ✓         │
│                                        │
│ All checks pass → Continue             │
└────────────────────────────────────────┘

STEP 6: Business Logic
┌────────────────────────────────────────┐
│ Process the transaction:               │
├────────────────────────────────────────┤
│ • Apply any business rules             │
│ • Calculate derived data (if needed)   │
│ • Prepare for database                 │
│ • All OK → Continue to database        │
└────────────────────────────────────────┘

STEP 7: Save to Database
┌────────────────────────────────────────┐
│ Using Prisma:                          │
├────────────────────────────────────────┤
│ prisma.transaction.create({            │
│   data: {                              │
│     businessId: "business-123",        │
│     amount: 5000,                      │
│     description: "Office rent",        │
│     category: "Expenses",              │
│     date: "2026-01-29"                 │
│   }                                    │
│ })                                     │
│                                        │
│ Database creates transaction            │
│ Returns with auto-generated ID         │
└────────────────────────────────────────┘

STEP 8: Send Response Back
┌────────────────────────────────────────┐
│ Backend sends to frontend:             │
├────────────────────────────────────────┤
│ Status: 200 (Success)                  │
│ Body: {                                │
│   success: true,                       │
│   data: {                              │
│     id: "tx_123",                      │
│     amount: 5000,                      │
│     description: "Office rent",        │
│     createdAt: "2026-01-29T10:00:00"  │
│   }                                    │
│ }                                      │
└────────────────────────────────────────┘

STEP 9: Frontend Updates
┌────────────────────────────────────────┐
│ Frontend receives success:             │
├────────────────────────────────────────┤
│ • Add transaction to list              │
│ • Show success message                 │
│ • Clear form fields                    │
│ • Update totals/dashboard              │
└────────────────────────────────────────┘

STEP 10: User Sees Result
┌────────────────────────────────────────┐
│ User sees:                             │
├────────────────────────────────────────┤
│ ✓ "Transaction added successfully"    │
│ ✓ New transaction in the list          │
│ ✓ Updated totals                       │
└────────────────────────────────────────┘
```

---

## Section 9: Potential Issues & How Backend Handles Them

### Issue 1: Invalid Data

```
User submits: amount = "not a number"

DETECTION: Zod validation catches this
RESPONSE: Error sent to frontend
RESULT: User sees error, form not submitted
```

### Issue 2: Unauthorized Access

```
User tries to view another user's business

DETECTION: Permission check fails
RESPONSE: Error sent to frontend
RESULT: Access denied, user sees error
```

### Issue 3: Database Error

```
Database connection fails unexpectedly

DETECTION: Prisma catches error
RESPONSE: Error sent to frontend
RESULT: User sees "Something went wrong" message
```

### Issue 4: Session Expired

```
User's login token expired

DETECTION: NextAuth validation fails
RESPONSE: Redirect to login
RESULT: User must log in again
```

---

## Section 10: Key Takeaways

### The Backend's Job

```
1. Receive data from user
2. Validate it's correct format
3. Check user is authorized
4. Process the business logic
5. Save to database securely
6. Send result back to user
7. Handle anything that goes wrong
```

### The Three Layers (Remember These!)

```
Layer 1: API (Entry point)
Layer 2: Business Logic (Processing)
Layer 3: Database (Storage)
```

### Security Principles

```
✓ Never trust frontend validation alone
✓ Always validate on backend
✓ Always check permissions
✓ Never expose database errors to user
✓ Use encryption for sensitive data
✓ Keep secrets in environment variables
```

### Tools & What They Do

| Tool | Job |
|------|-----|
| Next.js | Receive requests, route them |
| TypeScript | Catch errors early |
| Zod | Validate data |
| NextAuth | Manage login/sessions |
| Prisma | Talk to database |
| PostgreSQL | Store data |

---

## What We'll Build

Once you understand these concepts, we'll build:

### Phase 1: Database Design
- Define what tables we need
- Define what fields each table has
- Define how tables relate
- Create Prisma schema

### Phase 2: Authentication
- Setup NextAuth
- Create login/signup
- Protect routes
- Get current user

### Phase 3: Core Features
- Create transactions
- View transactions
- Update transactions (carefully!)
- Generate reports

### Phase 4: Security & Polish
- Add proper error handling
- Add audit logging
- Add input validation
- Add permission checks

---

## Your Learning Path

```
1. FUNDAMENTALS (This document)
   ✓ What is a backend?
   ✓ How do the technologies work?
   ✓ What's the architecture?
   ✓ How does data flow?

2. DATABASE DESIGN (Next)
   ✓ What tables do we need?
   ✓ What are the relationships?
   ✓ Write the Prisma schema

3. AUTHENTICATION (Then)
   ✓ How does NextAuth work?
   ✓ Setup login/signup
   ✓ Protect routes

4. BUSINESS LOGIC (Then)
   ✓ Write Server Actions
   ✓ Add validation
   ✓ Add permissions
   ✓ Save to database

5. ADVANCED (Finally)
   ✓ Error handling
   ✓ Logging
   ✓ Testing
   ✓ Deployment
```

---

## Questions to Reflect On

Before we move to the next section, think about:

1. **What data does PennyWise need to store?**
2. **Who are the users?** (Solo entrepreneurs, teams, accountants managing multiple clients?)
3. **What are the security requirements?** (Can users delete transactions?)
4. **What reports do users need?** (Monthly totals, by category, etc.)

These answers will guide our database design!

---

## Ready?

You now understand:
- ✅ What a backend is
- ✅ How the technologies work together
- ✅ The three-layer architecture
- ✅ How data flows through the system
- ✅ Authentication vs Authorization
- ✅ Data validation importance
- ✅ How to organize code

**Next Step:** We'll design the database schema (what tables we need).

Would you like to:
1. Continue to database design?
2. Ask questions about this section?
3. Dive deeper into any particular concept?

Let me know! 🚀

# 🏗️ PennyWise Backend Architecture - Learning Guide

## Table of Contents

1. [Backend Overview](#backend-overview)
2. [Technology Stack Explained](#technology-stack-explained)
3. [How the Backend Works](#how-the-backend-works)
4. [Request Flow](#request-flow)
5. [Database Layer](#database-layer)
6. [Authentication Flow](#authentication-flow)
7. [Data Validation](#data-validation)
8. [Backend File Structure](#backend-file-structure)
9. [How Everything Connects](#how-everything-connects)

---

## Backend Overview

### What is a Backend?

The **backend** is the server-side logic that:
- Receives requests from the frontend (browser/app)
- Validates and processes the data
- Reads/writes data from the database
- Sends responses back to the frontend
- Handles authentication and authorization
- Enforces business rules and security

### Your PennyWise Backend Will Handle:

```
User fills a form in browser
        ↓
Form data sent to backend
        ↓
Backend validates the data
        ↓
Backend checks authentication (who are you?)
        ↓
Backend checks authorization (are you allowed to do this?)
        ↓
Backend processes the business logic
        ↓
Backend saves data to database
        ↓
Backend sends response back to frontend
        ↓
Frontend shows success message to user
```

---

## Technology Stack Explained

### Next.js - Your Web Framework

**What it does:**
- Provides the web server
- Handles routing (URLs mapping to handlers)
- Serves both frontend and backend from one project
- Manages compilation and optimization

**Backend Parts of Next.js:**
1. **Server Actions** - Function-based backend (newer, recommended)
2. **API Routes** - Endpoint-based backend (traditional REST)

**For PennyWise, we'll use:** Server Actions + API Routes
- Server Actions for core business logic
- API Routes for integrations and exports

---

### Prisma ORM - Your Database Layer

**What it does:**
- Acts as a translator between your code and the database
- Lets you work with JavaScript/TypeScript objects instead of SQL
- Handles database migrations
- Provides type safety

**Why Prisma?**
```
You write JavaScript:
  const user = await prisma.user.findUnique({ where: { id: "123" } })

Prisma converts it to SQL:
  SELECT * FROM users WHERE id = '123'

Database executes and returns result
```

**Key Features:**
- Type-safe (TypeScript knows what fields exist)
- Migrations (version control for database changes)
- Query builder (write queries easily)
- Relations (link data together)

---

### PostgreSQL - Your Database

**What it does:**
- Stores all your application data
- Maintains relationships between data
- Enforces data integrity
- Provides querying capabilities

**Think of it like:**
```
A set of organized tables with relationships:

users table:
├── id (unique identifier)
├── name
├── email
└── password

transactions table:
├── id
├── userId (links to users table)
├── amount
└── description
```

---

### NextAuth - Your Authentication System

**What it does:**
- Handles user login/signup
- Manages sessions (remembers who you are)
- Creates and verifies tokens
- Protects routes (ensures only logged-in users access certain pages)

**How it works:**
```
User logs in
    ↓
NextAuth verifies credentials
    ↓
NextAuth creates a session token
    ↓
Token stored in browser cookies
    ↓
Each request includes the token
    ↓
NextAuth verifies token is valid
    ↓
Backend knows who the user is
```

---

### Zod - Your Validation Layer

**What it does:**
- Validates incoming data
- Ensures data has correct types and shapes
- Provides clear error messages
- Protects your database from bad data

**Example validation:**
```
When user submits a transaction:
✓ Amount must be a number
✓ Amount must be positive
✓ Description must be a string
✓ Category must be from allowed list
✓ Description can't be empty

If any check fails → reject the data
If all checks pass → process the data
```

---

## How the Backend Works

### The Three-Layer Architecture

Your backend will have three layers:

#### Layer 1: API Layer (Entry Points)
```
Server Actions & API Routes
├── Receive HTTP requests from frontend
├── Parse the incoming data
├── Route to appropriate handler
└── Send response back
```

#### Layer 2: Business Logic Layer (Core Logic)
```
Services & Utils
├── Validate data with Zod
├── Check permissions (authorization)
├── Process transactions
├── Calculate reports
├── Handle business rules
└── Ensure data consistency
```

#### Layer 3: Database Layer (Data Storage)
```
Prisma ORM
├── Query the database
├── Create records
├── Update records
├── Delete records (soft-delete for financial data)
└── Maintain relationships
```

### Visual Flow:

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Browser)                        │
│  User clicks "Add Transaction" button                           │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ↓ HTTP Request with data
┌─────────────────────────────────────────────────────────────────┐
│                  API LAYER (Entry Point)                        │
│  Server Action: "createTransaction"                             │
│  • Receives data                                                 │
│  • Checks user is authenticated                                 │
│  • Routes to business logic                                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│              BUSINESS LOGIC LAYER (Processing)                  │
│  • Validate with Zod (is data correct format?)                 │
│  • Check authorization (does user own this business?)          │
│  • Apply business rules (amount > 0?, categories valid?)       │
│  • Calculate derived data (if needed)                           │
│  • Prepare data for database                                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│             DATABASE LAYER (Data Storage)                       │
│  Prisma & PostgreSQL                                            │
│  • Insert transaction record                                    │
│  • Create audit log entry                                       │
│  • Update business totals (if needed)                           │
│  • Confirm success                                              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ↓ Response with result
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Browser)                        │
│  Show success message to user                                   │
│  Update the transaction list on screen                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Request Flow

### Complete Journey of a Request

Let's trace what happens when a user adds a transaction:

#### Step 1: User Action (Frontend)
```
User fills in form:
├── Amount: 5000
├── Description: "Office supplies"
├── Category: "Expenses"
└── Date: "2026-01-29"

User clicks "Add Transaction" button
```

#### Step 2: Frontend Sends Data
```
Browser sends to backend:
├── URL: /api/transactions/create
├── Method: POST
├── Body: { amount: 5000, description: "...", ... }
└── Headers: { authorization: "Bearer token123..." }
```

#### Step 3: Backend Receives (API Layer)
```
Server Action receives the request
├── Extract data from request body
├── Extract user ID from authentication token
├── Check if user is authenticated
├── Pass to business logic
```

#### Step 4: Validation & Authorization (Business Logic)
```
Validate data with Zod:
├── Is amount a positive number? ✓
├── Is description a string? ✓
├── Is category valid? ✓
└── Is date valid? ✓

Check authorization:
├── Does user own this business? ✓
├── Does user have permission to add transactions? ✓
```

#### Step 5: Process & Save (Database Layer)
```
Use Prisma to save:
├── Create transaction record in database
├── Create audit log entry
├── Return created transaction with ID
```

#### Step 6: Response to Frontend
```
Backend sends back:
├── Status: 200 (success)
└── Body: { id: "123", amount: 5000, ... }
```

#### Step 7: Frontend Updates
```
Frontend receives success
├── Add new transaction to list
├── Show success message
├── Clear form fields
└── Update dashboard totals
```

---

## Database Layer

### Understanding Your Data

For a financial app, you need several related tables:

#### Key Tables You'll Need:

**Users Table**
```
Stores user information
├── id (unique identifier)
├── email (unique, used for login)
├── password (hashed)
├── name
├── createdAt
└── updatedAt
```

**Businesses Table**
```
Stores business information
├── id
├── name (e.g., "John's Shop")
├── userId (who owns it)
├── description
└── createdAt
```

**Transactions Table** (Core)
```
Stores financial transactions
├── id
├── businessId (which business)
├── amount (money value)
├── description (what it was for)
├── category (expense, income, etc.)
├── type (income or expense)
├── date (when it happened)
├── createdAt (when added to system)
├── updatedAt
└── deletedAt (for soft deletes - never truly delete)
```

**Categories Table**
```
Stores transaction categories
├── id
├── businessId
├── name (e.g., "Office Supplies")
└── type (income or expense)
```

### Table Relationships

```
users
  ↓ (one-to-many)
businesses
  ↓ (one-to-many)
transactions
  ↓ (many-to-one)
categories
```

**What this means:**
- One user can have many businesses
- One business can have many transactions
- Many transactions can be in one category
- Transactions belong to one business

### How Prisma Helps

Instead of writing SQL:
```sql
SELECT * FROM transactions 
WHERE businessId = '123' 
AND date >= '2026-01-01' 
ORDER BY date DESC
```

You write JavaScript:
```javascript
const transactions = await prisma.transaction.findMany({
  where: { businessId: '123', date: { gte: new Date('2026-01-01') } },
  orderBy: { date: 'desc' }
})
```

---

## Authentication Flow

### How Users Stay Logged In

#### Step 1: Signup/Login Process
```
User provides:
├── Email
└── Password

Backend:
├── Validates format
├── Checks if user exists
├── Hashes password (one-way encryption)
└── Saves to database
```

#### Step 2: Session Creation
```
NextAuth creates:
├── Session token (unique identifier for user)
├── Stores in secure cookie
└── Expires after certain time
```

#### Step 3: Authenticated Requests
```
Each request includes:
├── Cookie with session token
└── Backend verifies token

Backend checks:
├── Is token valid?
├── Has it expired?
└── Who is the user?
```

#### Step 4: Protected Routes
```
Before executing any action:
├── Check if request has valid session
├── If not, reject with "Unauthorized"
├── If yes, proceed and know who the user is
```

### Authorization (Different from Authentication)

**Authentication:** Are you who you say you are?
```
✓ User has valid login token
```

**Authorization:** Are you allowed to do this?
```
✓ You own this business
✓ You have "owner" role
✓ You're not trying to access another user's data
```

---

## Data Validation

### Why Validation Matters

Imagine a user submits:
```javascript
{
  amount: "not a number",
  description: null,
  category: "invalid-category"
}
```

Without validation → Your code crashes or saves bad data
With validation → You reject the request with clear error

### Zod Validation Flow

```
Frontend sends data
        ↓
Zod checks structure
├── Is amount a number?
├── Is amount positive?
├── Is description provided?
├── Is category in allowed list?
        ↓
All checks pass? → Process the data
Any check fails? → Return error to frontend
```

### What Zod Validates

For a transaction:
- Amount is a positive number
- Description is a non-empty string
- Category exists and is valid
- Date is a valid date
- Type is either "income" or "expense"

---

## Backend File Structure

### How You'll Organize Backend Code

```
PennyWise/
├── app/
│   ├── api/                    ← API Routes (for REST endpoints)
│   │   └── transactions/
│   │       └── route.ts        ← GET, POST handlers
│   │
│   ├── actions/                ← Server Actions (new approach)
│   │   ├── transactions.ts     ← Transaction actions
│   │   ├── auth.ts             ← Auth actions
│   │   └── reports.ts          ← Report actions
│   │
│   └── layout.tsx
│
├── lib/                         ← Shared utilities
│   ├── auth.ts                 ← Authentication helpers
│   ├── db.ts                   ← Database connection
│   ├── validation.ts           ← Zod schemas
│   ├── permissions.ts          ← Authorization checks
│   └── errors.ts               ← Error handling
│
├── prisma/
│   ├── schema.prisma           ← Database schema (defines tables)
│   └── migrations/             ← Database version history
│
└── types/
    └── index.ts                ← TypeScript type definitions
```

**What Each Folder Does:**

| Folder | Purpose |
|--------|---------|
| `app/api/` | REST API endpoints (traditional approach) |
| `app/actions/` | Server Actions (recommended approach) |
| `lib/auth.ts` | Authentication logic and helpers |
| `lib/validation.ts` | Zod schemas for data validation |
| `lib/permissions.ts` | Check if user is authorized |
| `prisma/schema.prisma` | Define your database tables |

---

## How Everything Connects

### The Complete Picture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER IN BROWSER                          │
│               Fills form, clicks "Submit"                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              app/actions/transactions.ts                        │
│              (Server Action - Entry Point)                      │
│  • Receives data from frontend                                  │
│  • Already has access to authenticated user                     │
│  • Calls business logic                                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              lib/validation.ts (Zod Schema)                     │
│              • Schema defines shape of data                     │
│              • Validates incoming data                          │
│              • Returns errors if validation fails               │
└────────────────────────────┬────────────────────────────────────┘
                             │ (if validation passes)
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              lib/permissions.ts (Authorization)                 │
│              • Check user authentication                        │
│              • Verify user owns this business                   │
│              • Check user role/permissions                      │
└────────────────────────────┬────────────────────────────────────┘
                             │ (if authorized)
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              Business Logic (app/actions/)                      │
│              • Process the data                                 │
│              • Apply business rules                             │
│              • Prepare for database                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              lib/db.ts (Database Connection)                    │
│              • Establish connection to database                 │
│              • Execute queries                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              prisma/ (ORM - Data Layer)                         │
│              • Translate to SQL                                 │
│              • Execute against PostgreSQL                       │
│              • Return results                                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              PostgreSQL (Database)                              │
│              • Stores the data in tables                        │
│              • Maintains relationships                          │
│              • Returns results to Prisma                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
            (data flows back through the chain)
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              Server Action Returns Result                       │
│              • Result sent to frontend                          │
│              • Frontend updates display                         │
│              • User sees confirmation                           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                        USER IN BROWSER                          │
│               Sees success message or error                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Examples

### Example 1: Adding a Transaction

```
1. User fills form
   └─ Amount: 5000, Description: "Office rent", Category: "Expenses"

2. Submits to Server Action
   └─ app/actions/transactions.ts → createTransaction()

3. Server Action validates
   └─ lib/validation.ts → TransactionSchema.parse(data)

4. Check authorization
   └─ lib/permissions.ts → canUserEditBusiness(userId, businessId)

5. Save to database
   └─ prisma.transaction.create({ data: { ... } })

6. Return to frontend
   └─ { success: true, id: "123", amount: 5000, ... }

7. Frontend updates
   └─ Show in transaction list, update totals
```

### Example 2: Viewing Transactions

```
1. User opens transactions page
   └─ Frontend loads component

2. Component calls Server Action
   └─ app/actions/transactions.ts → getTransactions(businessId)

3. Check if user owns business
   └─ lib/permissions.ts → canUserViewBusiness(userId, businessId)

4. Query database
   └─ prisma.transaction.findMany({ where: { businessId } })

5. Database returns transactions
   └─ Array of transaction records

6. Return to frontend
   └─ [{ id: "1", amount: 5000, ... }, ...]

7. Frontend displays
   └─ Show transactions in table
```

### Example 3: Failed Authorization

```
1. User tries to view another user's business
   └─ Frontend calls Server Action with other user's businessId

2. Check authorization
   └─ lib/permissions.ts → canUserViewBusiness(userId, businessId)

3. Authorization fails
   └─ User doesn't own this business
   └─ Return error: "Not authorized"

4. Frontend receives error
   └─ Show error message to user
   └─ Don't allow access to data
```

---

## Key Concepts Summary

### Authentication vs Authorization

| Authentication | Authorization |
|---|---|
| **Who are you?** | **What are you allowed to do?** |
| Login with email/password | Check user owns the business |
| Session token | User roles/permissions |
| NextAuth handles this | You write this logic |

### Server Actions vs API Routes

| Server Actions | API Routes |
|---|---|
| Function-based | URL endpoint-based |
| Automatic CSRF protection | Manual setup |
| Direct database access | Via HTTP |
| Recommended for PennyWise | For integrations |

### Validation Layers

1. **Frontend Validation** - Quick feedback (fast)
2. **Backend Validation** - Security (can't be bypassed)
3. **Database Constraints** - Last line of defense

### Error Handling

```
Always assume things can go wrong:
├── Network failure
├── Invalid data from user
├── Database connection error
├── User tries to access unauthorized data
└── Always return clear error to frontend
```

---

## Next Steps for Backend Setup

Once you understand these concepts, we'll:

1. **Define Database Schema**
   - What tables do we need?
   - What relationships exist?
   - What fields does each table have?

2. **Create Prisma Schema**
   - Write the schema.prisma file
   - Define all tables and relationships
   - Run initial migration

3. **Set Up Authentication**
   - Configure NextAuth
   - Create login/signup flows
   - Protect routes

4. **Create Validation Schemas**
   - Define Zod schemas for each entity
   - Ensure data integrity

5. **Build Business Logic**
   - Create Server Actions
   - Implement authorization checks
   - Handle edge cases

6. **Add API Routes** (if needed)
   - For exports, integrations
   - Webhook handlers

---

## Questions to Consider

Before we start building, think about:

1. **What data do you need to track?**
   - Transactions, categories, invoices, users?

2. **How are users organized?**
   - Solo users, teams, accountants managing clients?

3. **What security rules matter?**
   - Can users delete transactions?
   - Who can see reports?
   - Can transactions be edited?

4. **What calculations are needed?**
   - Totals by category?
   - Monthly reports?
   - Tax calculations?

These answers will shape your backend design.

---

## You're Ready to Learn!

You now understand:
- ✓ What the backend does
- ✓ How the three layers work
- ✓ How data flows through the system
- ✓ What each technology handles
- ✓ How everything connects

**Next: I'll explain the database schema and what tables we need for PennyWise.**

Ready to continue? Let me know what questions you have!

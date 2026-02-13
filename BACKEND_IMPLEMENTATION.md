# PennyWise Backend Implementation Guide

## Overview

This document outlines the complete backend implementation for PennyWise, including database models, API endpoints, and frontend integration patterns.

## Database Models (Prisma)

### New Models Added

#### 1. **BusinessProfile**
Stores business/company information
```prisma
- businessName: string
- businessEmail: string
- registrationNumber: string (optional)
- kraPin: string (optional)
- phoneNumber: string (optional)
- address, city, state, postalCode, country: strings (optional)
- isVatRegistered: boolean
- logo: URL string (optional)
```

#### 2. **Invoice**
Core invoicing system
```prisma
- invoiceNumber: unique per user
- clientName, clientEmail, clientPhone: strings
- issueDate, dueDate: dates
- amount: decimal
- status: "draft" | "pending" | "paid" | "overdue"
- description, notes, paymentTerms: strings (optional)
- paymentMethod: enum (optional)
- paidDate: date (optional)
```

#### 3. **InvoiceItem**
Line items for invoices
```prisma
- invoiceId: reference to Invoice
- description: string
- quantity: integer
- unitPrice: decimal
- total: decimal
```

#### 4. **Payment**
Tracks payments against invoices
```prisma
- invoiceId: reference to Invoice
- amount: decimal
- paymentDate: date
- method: "mpesa" | "bank" | "cash" | "cheque"
- reference, notes: strings (optional)
```

#### 5. **AuditLog**
Complete audit trail of all actions
```prisma
- userId: reference to User
- action: string ("create", "update", "delete", "export", "login")
- entityType: string ("invoice", "settings", "user")
- entityId: string (optional)
- details: JSON string
- ipAddress, userAgent: strings (optional)
- timestamp: datetime
```

#### 6. **Integration**
Third-party service integrations
```prisma
- name: string (mpesa, bank_feeds, kra_itax)
- status: "active" | "inactive" | "pending"
- config: JSON string
- apiKey, apiSecret: encrypted strings (optional)
- lastSyncDate: datetime (optional)
```

#### 7. **TeamMember**
Team/user access management
```prisma
- userId: reference to User (owner)
- email, name: strings
- role: "admin" | "accountant" | "staff"
- permissions: JSON object
- isActive: boolean
- invitedDate, joinedDate: dates
```

## API Endpoints

### Invoices

**GET /api/invoices**
- Query params: `userId`, `status` (optional)
- Returns: List of invoices + statistics

**GET /api/invoices/[id]**
- Returns: Single invoice with items and payments

**POST /api/invoices**
- Body: InvoiceInput
- Returns: Created invoice

**PUT /api/invoices/[id]**
- Body: UpdateInvoiceInput
- Returns: Updated invoice

**DELETE /api/invoices/[id]**
- Returns: Success message

### Business Profile

**GET /api/business-profile**
- Query params: `userId`
- Returns: Business profile

**POST /api/business-profile**
- Body: BusinessProfileInput
- Returns: Created/updated profile

**PUT /api/business-profile**
- Query params: `userId`
- Body: UpdateBusinessProfileInput
- Returns: Updated profile

### Team Members

**GET /api/team-members**
- Query params: `userId`
- Returns: Array of team members

**POST /api/team-members**
- Body: TeamMemberInput + userId
- Returns: Created team member

**PUT /api/team-members/[id]**
- Body: UpdateTeamMemberInput
- Returns: Updated member

**DELETE /api/team-members/[id]**
- Returns: Success message

### Audit Logs

**GET /api/audit-logs**
- Query params: `userId`, `action` (optional), `limit`, `skip`
- Returns: Paginated audit logs

**POST /api/audit-logs**
- Body: { userId, action, entityType, details, ipAddress, userAgent }
- Returns: Created log

### Integrations

**GET /api/integrations**
- Query params: `userId`
- Returns: Array of integrations (sensitive data removed)

**POST /api/integrations**
- Body: IntegrationInput + userId
- Returns: Created integration

**PUT /api/integrations/[id]**
- Body: UpdateIntegrationInput
- Returns: Updated integration

**DELETE /api/integrations/[id]**
- Returns: Success message

### Dashboard

**GET /api/dashboard**
- Query params: `userId`
- Returns: Dashboard statistics and summary data

## Frontend Integration

### Using the API Client

```typescript
import { invoiceAPI, businessProfileAPI } from '@/lib/api-client';

// Fetch invoices
const invoices = await invoiceAPI.getAll(userId, 'pending');

// Create invoice
const newInvoice = await invoiceAPI.create(userId, {
  invoiceNumber: '#INV-2024-001',
  clientName: 'Client Name',
  amount: 50000,
  status: 'draft',
  issueDate: new Date(),
});

// Update invoice
const updated = await invoiceAPI.update(invoiceId, {
  status: 'sent',
});

// Delete invoice
await invoiceAPI.delete(invoiceId);
```

### Using React Hooks

```typescript
import { useInvoices, useCreateInvoice, useUpdateInvoice } from '@/lib/hooks';

export function MyComponent() {
  const userId = 'user-123';
  
  // Fetch data
  const { data: invoices, loading, error, refetch } = useInvoices(userId);
  
  // Create invoice
  const { create, loading: creating } = useCreateInvoice();
  
  const handleCreate = async () => {
    try {
      const invoice = await create(userId, { /* data */ });
      refetch(); // Refresh list
    } catch (err) {
      console.error('Failed to create invoice');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {invoices?.map(inv => (
        <div key={inv.id}>{inv.invoiceNumber}</div>
      ))}
    </div>
  );
}
```

## Validation Schemas

All inputs are validated using Zod schemas in `/lib/validation.ts`:

- `invoiceSchema` / `updateInvoiceSchema`
- `businessProfileSchema` / `updateBusinessProfileSchema`
- `teamMemberSchema` / `updateTeamMemberSchema`
- `integrationSchema` / `updateIntegrationSchema`

Example:
```typescript
import { invoiceSchema, InvoiceInput } from '@/lib/validation';

const data = { /* ... */ };
const validated = invoiceSchema.parse(data); // Throws if invalid
```

## Setting Up the Database

### 1. Update .env.local
```
DATABASE_URL="postgresql://user:password@localhost:5432/pennywise"
```

### 2. Run Migrations
```bash
# Generate migration
npx prisma migrate dev --name init

# Apply migrations
npx prisma migrate deploy
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

## Error Handling

All endpoints follow consistent error handling:

```json
// Success (200)
{ "data": {...} }

// Validation Error (400)
{ "error": "Field validation error" }

// Not Found (404)
{ "error": "Resource not found" }

// Server Error (500)
{ "error": "Failed to process request" }
```

## Security Considerations

1. **API Keys**: Stored encrypted, never exposed to frontend
2. **Sensitive Data**: API responses filter out `apiKey` and `apiSecret`
3. **Authentication**: Add NextAuth session verification to all endpoints
4. **Input Validation**: Zod schemas validate all inputs
5. **Rate Limiting**: Implement rate limiting for production
6. **CORS**: Configure appropriate CORS policies

## Next Steps

1. **Add Authentication**: Integrate NextAuth checks to all endpoints
2. **Add Rate Limiting**: Implement rate limiting middleware
3. **Add Encryption**: Encrypt sensitive fields (API keys, etc.)
4. **Error Logging**: Implement logging/monitoring
5. **Testing**: Write unit and integration tests
6. **Documentation**: Generate API documentation with Swagger/OpenAPI

## Useful Commands

```bash
# View database
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Check schema
npx prisma validate

# Format schema
npx prisma format
```

d                                                                                                                                       
                               # 🇰🇪 SME Bookkeeping & Tax-Readiness SaaS                                                                                                   
                                                                                                                                                                           
                               A **production-grade, multi-tenant bookkeeping and tax-readiness platform** for Kenyan SMEs, designed to provide **accurate financial       
                               records**, **audit-ready reporting**, and **simplified tax preparation**.                                                                   
                                                                                                                                                                           
                               This repository is both:                                                                                                                    
                               - a **real SaaS product foundation**, and                                                                                                   
                               - a **learning-driven engineering guide** covering architecture, data modeling, security, compliance, and deployment.                       
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 📌 Why This Project Exists                                                                                                               
                                                                                                                                                                           
                               Kenyan SMEs struggle with:                                                                                                                  
                               - Manual bookkeeping                                                                                                                        
                               - Poor financial visibility                                                                                                                 
                               - Stressful KRA compliance                                                                                                                  
                               - Lack of audit-ready records                                                                                                               
                                                                                                                                                                           
                               This platform solves that by:                                                                                                               
                               - Enforcing **correct accounting flows**                                                                                                    
                               - Designing for **trust and traceability**                                                                                                  
                               - Supporting **accountants and SMEs together**                                                                                              
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 🎯 Product Goals                                                                                                                         
                                                                                                                                                                           
                               1. Enable SMEs to **track income and expenses accurately**                                                                                  
                               2. Generate **tax-ready financial reports**                                                                                                 
                               3. Provide **audit-proof financial records**                                                                                                
                               4. Support **accountants managing multiple clients**                                                                                        
                               5. Scale safely as a **multi-tenant SaaS**                                                                                                  
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 🧱 Technology Stack                                                                                                                      
                                                                                                                                                                           
                               ### Application                                                                                                                             
                               - **Next.js (App Router)**                                                                                                                  
                               - **TypeScript**                                                                                                                            
                               - **React**                                                                                                                                 
                               - **Tailwind CSS**                                                                                                                          
                                                                                                                                                                           
                               ### Backend                                                                                                                                 
                               - **Next.js Server Actions + API Routes**                                                                                                   
                               - **PostgreSQL**                                                                                                                            
                               - **Prisma ORM**                                                                                                                            
                                                                                                                                                                           
                               ### Infrastructure                                                                                                                          
                               - **Vercel / Fly.io**                                                                                                                       
                               - **Neon / Supabase / AWS RDS**                                                                                                             
                               - **Redis (later, for caching)**                                                                                                            
                                                                                                                                                                           
                               ### Tooling                                                                                                                                 
                               - ESLint + Prettier                                                                                                                         
                               - Vitest                                                                                                                                    
                               - Playwright                                                                                                                                
                               - GitHub Actions (CI)                                                                                                                       
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 🧠 Architectural Principles                                                                                                              
                                                                                                                                                                           
                               - **Correctness over speed**                                                                                                                
                               - **Auditability over convenience**                                                                                                         
                               - **Explicit data modeling**                                                                                                                
                               - **No silent mutations**                                                                                                                   
                               - **Multi-tenant from Day 1**                                                                                                               
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 🧩 High-Level Architecture                                                                                                               
                                                                                                                                                                           
                               ```                                                                                                                                         
                                                                                                                                                                           
                               Browser                                                                                                                                     
                               ↓                                                                                                                                           
                               Next.js App (App Router)                                                                                                                    
                               ├── Server Actions (core business logic)                                                                                                    
                               ├── API Routes (integrations & exports)                                                                                                     
                               ├── Auth (RBAC)                                                                                                                             
                               ├── Prisma ORM                                                                                                                              
                               ↓                                                                                                                                           
                               PostgreSQL (Multi-Tenant)                                                                                                                   
                                                                                                                                                                           
                               ```                                                                                                                                         
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 🏗️ Project Structure                                                                                                                     
                                                                                                                                                                           
                               ```                                                                                                                                         
                                                                                                                                                                           
                               app/                                                                                                                                        
                               ├── layout.tsx                                                                                                                              
                               ├── page.tsx                                                                                                                                
                               ├── auth/                                                                                                                                   
                               ├── dashboard/                                                                                                                              
                               ├── businesses/                                                                                                                             
                               ├── transactions/                                                                                                                           
                               ├── invoices/                                                                                                                               
                               ├── reports/                                                                                                                                
                               ├── api/                                                                                                                                    
                               components/                                                                                                                                 
                               ├── forms/                                                                                                                                  
                               ├── tables/                                                                                                                                 
                               ├── charts/                                                                                                                                 
                               lib/                                                                                                                                        
                               ├── auth.ts                                                                                                                                 
                               ├── db.ts                                                                                                                                   
                               ├── permissions.ts                                                                                                                          
                               ├── audit.ts                                                                                                                                
                               prisma/                                                                                                                                     
                               ├── schema.prisma                                                                                                                           
                               ├── migrations/                                                                                                                             
                               types/                                                                                                                                      
                               tests/                                                                                                                                      
                                                                                                                                                                           
                               ````                                                                                                                                        
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 🚀 PHASE 1 — Project Setup (Week 1)                                                                                                      
                                                                                                                                                                           
                               ### 1️⃣ Initialize Project                                                                                                                   
                                                                                                                                                                           
                               ```bash                                                                                                                                     
                               npx create-next-app@latest bookkeeping-saas --typescript                                                                                    
                               cd bookkeeping-saas                                                                                                                         
                               npm run dev                                                                                                                                 
                               ````                                                                                                                                        
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ### 2️⃣ Install Core Dependencies                                                                                                            
                                                                                                                                                                           
                               ```bash                                                                                                                                     
                               npm install prisma @prisma/client                                                                                                           
                               npm install next-auth                                                                                                                       
                               npm install zod                                                                                                                             
                               npm install -D prettier eslint-config-next vitest                                                                                           
                               ```                                                                                                                                         
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ### 3️⃣ Environment Configuration                                                                                                            
                                                                                                                                                                           
                               Create `.env.local`:                                                                                                                        
                                                                                                                                                                           
                               ```env                                                                                                                                      
                               DATABASE_URL=                                                                                                                               
                               NEXTAUTH_SECRET=                                                                                                                            
                               NEXTAUTH_URL=http://localhost:3000                                                                                                          
                               ```                                                                                                                                         
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 🧮 PHASE 2 — Data Modeling (Critical)                                                                                                    
                                                                                                                                                                           
                               ### Multi-Tenant Rule                                                                                                                       
                                                                                                                                                                           
                               > **Every financial record belongs to a business.**                                                                                         
                                                                                                                                                                           
                               ### Core Tables                                                                                                                             
                                                                                                                                                                           
                               ```                                                                                                                                         
                               users                                                                                                                                       
                               businesses                                                                                                                                  
                               memberships                                                                                                                                 
                               transactions                                                                                                                                
                               invoices                                                                                                                                    
                               invoice_items                                                                                                                               
                               payments                                                                                                                                    
                               categories                                                                                                                                  
                               tax_reports                                                                                                                                 
                               audit_logs                                                                                                                                  
                               ```                                                                                                                                         
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ### Prisma Schema (Simplified Example)                                                                                                      
                                                                                                                                                                           
                               ```prisma                                                                                                                                   
                               model Business {                                                                                                                            
                                 id        String   @id @default(uuid())                                                                                                   
                                 name      String                                                                                                                          
                                 createdAt DateTime @default(now())                                                                                                        
                                 users     Membership[]                                                                                                                    
                               }                                                                                                                                           
                                                                                                                                                                           
                               model Membership {                                                                                                                          
                                 id         String @id @default(uuid())                                                                                                    
                                 userId     String                                                                                                                         
                                 businessId String                                                                                                                         
                                 role       Role                                                                                                                           
                               }                                                                                                                                           
                                                                                                                                                                           
                               model Transaction {                                                                                                                         
                                 id         String   @id @default(uuid())                                                                                                  
                                 businessId String                                                                                                                         
                                 amount     Decimal                                                                                                                        
                                 type       TransactionType                                                                                                                
                                 createdAt DateTime @default(now())                                                                                                        
                               }                                                                                                                                           
                               ```                                                                                                                                         
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 🔐 PHASE 3 — Authentication & RBAC                                                                                                       
                                                                                                                                                                           
                               ### Roles                                                                                                                                   
                                                                                                                                                                           
                               * OWNER                                                                                                                                     
                               * ACCOUNTANT                                                                                                                                
                               * STAFF                                                                                                                                     
                                                                                                                                                                           
                               ### Rules                                                                                                                                   
                                                                                                                                                                           
                               * Owners manage business settings                                                                                                           
                               * Accountants access multiple businesses                                                                                                    
                               * Staff have restricted permissions                                                                                                         
                                                                                                                                                                           
                               ### RBAC Enforcement                                                                                                                        
                                                                                                                                                                           
                               * Checked **on every server action**                                                                                                        
                               * Never trust client-side role checks                                                                                                       
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 📒 PHASE 4 — Core Bookkeeping Logic                                                                                                      
                                                                                                                                                                           
                               ### Financial Rules (Non-Negotiable)                                                                                                        
                                                                                                                                                                           
                               * No hard deletes                                                                                                                           
                               * All updates are logged                                                                                                                    
                               * Adjustments are separate entries                                                                                                          
                               * Reports are derived, never stored                                                                                                         
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ### Transactions Flow                                                                                                                       
                                                                                                                                                                           
                               ```                                                                                                                                         
                               User Action                                                                                                                                 
                                 ↓                                                                                                                                         
                               Server Action                                                                                                                               
                                 ↓                                                                                                                                         
                               Validation (Zod)                                                                                                                            
                                 ↓                                                                                                                                         
                               Transaction Insert                                                                                                                          
                                 ↓                                                                                                                                         
                               Audit Log Entry                                                                                                                             
                               ```                                                                                                                                         
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 📊 PHASE 5 — Reporting                                                                                                                   
                                                                                                                                                                           
                               ### MVP Reports                                                                                                                             
                                                                                                                                                                           
                               * Profit & Loss                                                                                                                             
                               * Expense summary                                                                                                                           
                               * VAT summary (read-only)                                                                                                                   
                               * CSV exports                                                                                                                               
                                                                                                                                                                           
                               ### Performance Target                                                                                                                      
                                                                                                                                                                           
                               * < 3 seconds for monthly reports                                                                                                           
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 🔍 PHASE 6 — Audit Logging                                                                                                               
                                                                                                                                                                           
                               ### Audit Log Schema                                                                                                                        
                                                                                                                                                                           
                               ```ts                                                                                                                                       
                               {                                                                                                                                           
                                 id,                                                                                                                                       
                                 businessId,                                                                                                                               
                                 userId,                                                                                                                                   
                                 action,                                                                                                                                   
                                 entity,                                                                                                                                   
                                 before,                                                                                                                                   
                                 after,                                                                                                                                    
                                 timestamp                                                                                                                                 
                               }                                                                                                                                           
                               ```                                                                                                                                         
                                                                                                                                                                           
                               Every mutation writes an audit entry.                                                                                                       
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 🔐 Security Practices                                                                                                                    
                                                                                                                                                                           
                               * TLS everywhere                                                                                                                            
                               * Encrypted DB storage                                                                                                                      
                               * Secrets via environment variables                                                                                                         
                               * Least-privilege access                                                                                                                    
                               * No shared credentials                                                                                                                     
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## ⚖️ Compliance                                                                                                                            
                                                                                                                                                                           
                               ### Kenya Data Protection Act (2019)                                                                                                        
                                                                                                                                                                           
                               * Explicit consent                                                                                                                          
                               * Data export support                                                                                                                       
                               * Data minimization                                                                                                                         
                                                                                                                                                                           
                               ### GDPR (Where Applicable)                                                                                                                 
                                                                                                                                                                           
                               * Right to access                                                                                                                           
                               * Right to erasure (anonymization)                                                                                                          
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 🧪 Testing Strategy                                                                                                                      
                                                                                                                                                                           
                               ### Unit Tests                                                                                                                              
                                                                                                                                                                           
                               * Financial calculations                                                                                                                    
                               * Permission checks                                                                                                                         
                                                                                                                                                                           
                               ### Integration Tests                                                                                                                       
                                                                                                                                                                           
                               * Transaction creation                                                                                                                      
                               * Report generation                                                                                                                         
                                                                                                                                                                           
                               ### E2E Tests                                                                                                                               
                                                                                                                                                                           
                               * Full bookkeeping flow                                                                                                                     
                               * Accountant multi-tenant access                                                                                                            
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 🚀 Deployment                                                                                                                            
                                                                                                                                                                           
                               ### Vercel                                                                                                                                  
                                                                                                                                                                           
                               1. Push to GitHub                                                                                                                           
                               2. Import repo                                                                                                                              
                               3. Set env vars                                                                                                                             
                               4. Deploy                                                                                                                                   
                                                                                                                                                                           
                               ### Database                                                                                                                                
                                                                                                                                                                           
                               * Managed PostgreSQL                                                                                                                        
                               * Daily backups                                                                                                                             
                               * PITR enabled                                                                                                                              
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 🔁 CI/CD (GitHub Actions)                                                                                                                
                                                                                                                                                                           
                               ```yaml                                                                                                                                     
                               name: CI                                                                                                                                    
                                                                                                                                                                           
                               on: [push, pull_request]                                                                                                                    
                                                                                                                                                                           
                               jobs:                                                                                                                                       
                                 build:                                                                                                                                    
                                   runs-on: ubuntu-latest                                                                                                                  
                                   steps:                                                                                                                                  
                                     - uses: actions/checkout@v4                                                                                                           
                                     - uses: actions/setup-node@v4                                                                                                         
                                       with:                                                                                                                               
                                         node-version: 18                                                                                                                  
                                     - run: npm install                                                                                                                    
                                     - run: npm run lint                                                                                                                   
                                     - run: npm run test                                                                                                                   
                                     - run: npm run build                                                                                                                  
                               ```                                                                                                                                         
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 📈 Metrics & Success Criteria                                                                                                            
                                                                                                                                                                           
                               ### MVP                                                                                                                                     
                                                                                                                                                                           
                               * 100 active SMEs                                                                                                                           
                               * < 1% data inconsistencies                                                                                                                 
                               * 0 security incidents                                                                                                                      
                               * 99.5% uptime                                                                                                                              
                                                                                                                                                                           
                               ### Scale                                                                                                                                   
                                                                                                                                                                           
                               * 99.9% uptime                                                                                                                              
                               * < 500ms core actions                                                                                                                      
                               * 20% MoM growth                                                                                                                            
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## ⚠️ Common Pitfalls                                                                                                                       
                                                                                                                                                                           
                               * Treating accounting as CRUD ❌                                                                                                            
                               * Allowing deletes ❌                                                                                                                       
                               * Mixing tenants ❌                                                                                                                         
                               * Skipping audit logs ❌                                                                                                                    
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 🔮 Future Enhancements                                                                                                                   
                                                                                                                                                                           
                               * Bank & M-Pesa sync                                                                                                                        
                               * Payroll                                                                                                                                   
                               * Mobile app                                                                                                                                
                               * KRA API integrations                                                                                                                      
                               * AI-assisted categorization                                                                                                                
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 🧠 Final Note                                                                                                                            
                                                                                                                                                                           
                               This project is **not a demo**.                                                                                                             
                               It is a **real SaaS architecture** built to:                                                                                                
                                                                                                                                                                           
                               * teach serious backend engineering                                                                                                         
                               * respect financial correctness                                                                                                             
                               * scale responsibly                                                                                                                         
                                                                                                                                                                           
                               Build it slowly. Build it right.                                                                                                            
                                                                                                                                                                           
                               ---                                                                                                                                         
                                                                                                                                                                           
                               ## 👨‍💻 Author                                                                                                                                
                                                                                                                                                                           
                               Built with a **CTO-level mindset**, focused on correctness, security, and long-term value
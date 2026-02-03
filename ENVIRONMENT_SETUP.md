# PennyWise Environment Setup Guide

## Overview

This guide walks you through setting up different environments for the PennyWise project:
- **Development** - Local development
- **Staging** - Pre-production testing
- **Production** - Live environment

---

## Quick Start (5 minutes)

### 1. **Copy the Template**
```bash
cp .env.example .env.local
```

### 2. **Generate NextAuth Secret**
```bash
openssl rand -base64 32
```
Copy the output and paste it into `NEXTAUTH_SECRET` in `.env.local`

### 3. **Set Database URL**
```bash
# Local PostgreSQL
DATABASE_URL=postgresql://postgres:password@localhost:5432/pennywise_dev
```

### 4. **Start Development Server**
```bash
npm run dev
```

---

## Detailed Setup Instructions

### STEP 1: Development Environment (.env.local)

#### Create the file:
```bash
cp .env.example .env.local
```

#### Edit `.env.local`:
```bash
nano .env.local  # or open in your editor
```

#### Fill in the values:

**Database Setup:**
- If using local PostgreSQL:
  ```
  DATABASE_URL=postgresql://postgres:password@localhost:5432/pennywise_dev
  ```
- If using Docker:
  ```
  DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pennywise_dev
  ```
- If using cloud (Supabase, Neon):
  ```
  DATABASE_URL=postgresql://user:password@db.example.com:5432/pennywise_dev
  ```

**Generate SecureNextAuth Secret:**
```bash
openssl rand -base64 32
# Example output: abc123def456xyz789...
```
Copy to `.env.local`:
```
NEXTAUTH_SECRET=abc123def456xyz789...
```

**Set API URL (local):**
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

### STEP 2: Set Up Database

#### Option A: Local PostgreSQL

**Install PostgreSQL:**
```bash
# macOS with Homebrew
brew install postgresql@15
brew services start postgresql@15

# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# Windows
# Download from https://www.postgresql.org/download/windows/
```

**Create Database:**
```bash
# Connect to PostgreSQL
psql -U postgres

# Inside psql:
CREATE DATABASE pennywise_dev;
CREATE USER pennywise_user WITH PASSWORD 'your_password';
ALTER ROLE pennywise_user SET client_encoding TO 'utf8';
ALTER ROLE pennywise_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE pennywise_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE pennywise_dev TO pennywise_user;
\q
```

**Update .env.local:**
```
DATABASE_URL=postgresql://pennywise_user:your_password@localhost:5432/pennywise_dev
```

#### Option B: Docker PostgreSQL

**Install Docker:**
```bash
# Download from https://www.docker.com/products/docker-desktop
```

**Create and Run PostgreSQL Container:**
```bash
docker run --name pennywise-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=pennywise_dev \
  -p 5432:5432 \
  -d postgres:15

# Verify it's running
docker ps
```

**Update .env.local:**
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pennywise_dev
```

#### Option C: Cloud Database (Recommended for Production)

**Supabase (Free tier available):**
1. Go to https://supabase.com
2. Create a new project
3. Copy the connection string
4. Update `.env.local`:
   ```
   DATABASE_URL=postgresql://user:password@db.supabase.co:5432/postgres
   ```

**Neon (Free tier available):**
1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string
4. Update `.env.local`:
   ```
   DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/neondb
   ```

---

### STEP 3: Run Database Migrations

**Install Prisma CLI (if not already installed):**
```bash
npm install -D prisma
```

**Run migrations:**
```bash
# Create initial migration
npx prisma migrate dev --name init

# Apply migrations
npx prisma migrate deploy

# View database in Prisma Studio
npx prisma studio
```

---

### STEP 4: Verify Development Setup

**Start the development server:**
```bash
npm run dev
```

**Expected output:**
```
> next dev

▲ Next.js 16.1.6
- Local:        http://localhost:3000
- Environments: .env.local

✓ Ready in 2.5s
```

**Visit:** http://localhost:3000

---

## Environment Variables Reference

### Core Configuration

| Variable | Purpose | Example |
|----------|---------|---------|
| `NODE_ENV` | Execution environment | `development`, `production` |
| `NEXT_PUBLIC_API_URL` | Frontend API endpoint | `http://localhost:3000` |
| `DATABASE_URL` | Database connection string | `postgresql://...` |

### Authentication

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXTAUTH_SECRET` | Session encryption key | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | NextAuth callback URL | `http://localhost:3000` |

### Database

| Variable | Purpose | Default |
|----------|---------|---------|
| `DATABASE_POOL_MIN` | Min pool connections | `2` |
| `DATABASE_POOL_MAX` | Max pool connections | `10` |

### Email (Optional)

| Variable | Purpose | Example |
|----------|---------|---------|
| `EMAIL_PROVIDER` | Email service | `smtp`, `sendgrid`, `console` |
| `SMTP_HOST` | SMTP server | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP username | `your-email@gmail.com` |
| `SMTP_PASSWORD` | SMTP password | `app-password` |
| `EMAIL_FROM` | Default from address | `noreply@pennywise.app` |

---

## Staging Environment Setup

**Create `.env.staging`:**
```bash
cp .env.example .env.staging
```

**Edit and configure for staging:**
- Use staging database URL
- Use staging API endpoint (e.g., `https://staging.pennywise.app`)
- Generate new `NEXTAUTH_SECRET`
- Set `NODE_ENV=production`

**Deploy to staging:**
```bash
# On your staging server
git clone <repo>
cd PennyWise
cp .env.staging .env.local
npm install
npm run build
npm start
```

---

## Production Environment Setup

### Prerequisites:
- Domain name
- SSL/TLS certificate
- Managed database (AWS RDS, Supabase, etc.)
- Secrets manager (AWS Secrets Manager, Vault, etc.)

### Using Vercel (Recommended):

1. **Connect your repository:**
   - Push to GitHub
   - Import project in Vercel Dashboard

2. **Set environment variables:**
   - Go to: Project Settings > Environment Variables
   - Add all variables for production
   - Set environment to "Production"

3. **Configure database:**
   - Use managed database (Vercel Postgres, Supabase, etc.)
   - Add connection string

4. **Deploy:**
   - Push to main branch
   - Vercel automatically builds and deploys

### Using Custom Server:

1. **Prepare server:**
   ```bash
   # Install Node.js, PostgreSQL, Nginx
   # Set up SSL with Let's Encrypt
   ```

2. **Clone and configure:**
   ```bash
   git clone <repo> /opt/pennywise
   cd /opt/pennywise
   npm install --production
   ```

3. **Set environment variables:**
   - Use secrets manager
   - Never commit .env.production to git
   - Use deployment platform's secret management

4. **Build and run:**
   ```bash
   npm run build
   npm start
   ```

5. **Use process manager:**
   ```bash
   npm install -g pm2
   pm2 start npm --name "pennywise" -- start
   pm2 save
   pm2 startup
   ```

---

## Security Best Practices

### ✅ DO:
- Generate strong secrets: `openssl rand -base64 32`
- Rotate secrets regularly
- Use different secrets for each environment
- Store secrets in secrets manager
- Use HTTPS everywhere
- Enable database backups
- Set up database encryption

### ❌ DON'T:
- Commit `.env.local` to git
- Commit `.env.production` to git
- Share secrets via chat/email
- Use weak passwords
- Reuse production secrets in development
- Store secrets in code comments
- Disable SSL in production

---

## Troubleshooting

### Problem: `DATABASE_URL is not set`
**Solution:**
```bash
# Verify .env.local exists
ls -la .env.local

# Check content
cat .env.local

# Recreate if missing
cp .env.example .env.local
# Edit and add DATABASE_URL
```

### Problem: `NEXTAUTH_SECRET is not configured`
**Solution:**
```bash
# Generate new secret
openssl rand -base64 32

# Add to .env.local
echo "NEXTAUTH_SECRET=<generated-secret>" >> .env.local
```

### Problem: `Can't connect to database`
**Solution:**
```bash
# Verify PostgreSQL is running
psql -U postgres -d pennywise_dev

# Check connection string format
# postgresql://username:password@host:port/database

# Verify user permissions
# Connect to psql and run: \dt (show tables)
```

### Problem: Port 3000 already in use
**Solution:**
```bash
# Use different port
npm run dev -- -p 3001

# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

---

## Next Steps

1. ✅ Set up `.env.local`
2. ✅ Configure database
3. ✅ Run migrations: `npx prisma migrate dev`
4. ✅ Start development: `npm run dev`
5. ✅ Open http://localhost:3000
6. 📝 Create first feature
7. 🚀 Deploy to staging
8. 🎉 Deploy to production

---

## Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [NextAuth Documentation](https://next-auth.js.org/getting-started/example)
- [Prisma Database Connection](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Vercel Deployment](https://vercel.com/docs)

---

**Need help? Check the troubleshooting section or open an issue on GitHub.**

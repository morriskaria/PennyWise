# 🚀 Getting Started with PennyWise Environment Setup

## What's Been Set Up For You

I've created a complete environment management system for your PennyWise project. Here's what you now have:

---

## 📁 New Files Created

### Environment Configuration Files (Reference)
| File | Purpose |
|------|---------|
| `.env.example` | Master template with all variables |
| `.env.development` | Reference development config |
| `.env.staging` | Reference staging config |
| `.env.production` | Reference production config |

### Automation & Documentation
| File | Purpose | Size |
|------|---------|------|
| `scripts/setup-env.sh` | Interactive setup wizard | 5.7 KB |
| `ENVIRONMENT_SETUP.md` | Complete setup guide (400+ lines) | 9.0 KB |
| `ENV_QUICK_REFERENCE.md` | Quick lookup guide | 4.1 KB |
| `ENVIRONMENT_SETUP_SUMMARY.md` | Overview document | 5.5 KB |
| `SETUP_FLOWCHART.txt` | Visual setup flow | 16 KB |

---

## ⚡ Quick Start (Choose One Method)

### Method 1: Automated Setup (Recommended - 2 minutes)
```bash
./scripts/setup-env.sh
# Follow the interactive menu
# Select option 1 for development
```

### Method 2: Manual Setup (5 minutes)
```bash
# 1. Copy template
cp .env.example .env.local

# 2. Generate secret
openssl rand -base64 32
# Paste the output into NEXTAUTH_SECRET

# 3. Edit .env.local with your database
nano .env.local

# 4. Install and run
npm install
npx prisma migrate dev
npm run dev
```

---

## 📋 Step-by-Step Guide

### Step 1: Setup Environment File
```bash
# Copy the template
cp .env.example .env.local

# This file is automatically ignored by git (.gitignore)
```

### Step 2: Generate Security Secret
```bash
# Generate a secure secret
openssl rand -base64 32

# Example output:
# xY7kL9mN2pQ5rT8uV3wX4zB1cD6eF9gH0jK3lM6nP9qR2sT5uV8wX

# Copy this and add to .env.local as:
# NEXTAUTH_SECRET=xY7kL9mN2pQ5rT8uV3wX4zB1cD6eF9gH0jK3lM6nP9qR2sT5uV8wX
```

### Step 3: Configure Your Database

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL
brew install postgresql@15  # macOS
# or
sudo apt install postgresql # Linux

# Create database
createdb pennywise_dev

# Add to .env.local:
# DATABASE_URL=postgresql://postgres:password@localhost:5432/pennywise_dev
```

**Option B: Docker (No Installation Needed)**
```bash
# Run PostgreSQL in Docker
docker run --name pennywise-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=pennywise_dev \
  -p 5432:5432 \
  -d postgres:15

# Add to .env.local:
# DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pennywise_dev
```

**Option C: Cloud Database (Recommended)**
- Supabase: https://supabase.com (Free tier)
- Neon: https://neon.tech (Free tier)
- Get connection string and add to .env.local

### Step 4: Install Dependencies
```bash
npm install
```

### Step 5: Initialize Database
```bash
npx prisma migrate dev --name init
```

### Step 6: Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

---

## 🔑 Essential Environment Variables

| Variable | Required | Example |
|----------|----------|---------|
| `NODE_ENV` | Yes | `development` |
| `DATABASE_URL` | Yes | `postgresql://user:pass@host/db` |
| `NEXTAUTH_SECRET` | Yes | `openssl rand -base64 32` |
| `NEXT_PUBLIC_API_URL` | Yes | `http://localhost:3000` |
| `NEXTAUTH_URL` | Yes | `http://localhost:3000` |

---

## 📚 Documentation Guide

Choose the documentation based on your needs:

### For Quick Setup
👉 **Read:** `ENV_QUICK_REFERENCE.md`
- 2-minute quick reference
- Command cheatsheet
- Common issues and fixes

### For Detailed Instructions
👉 **Read:** `ENVIRONMENT_SETUP.md`
- Complete 400+ line guide
- Step-by-step instructions
- Multiple database options
- Deployment information
- Troubleshooting guide

### For Visual Overview
👉 **Read:** `SETUP_FLOWCHART.txt`
- Visual setup flow
- Environment variable reference
- Helpful commands list

### For Summary
👉 **Read:** `ENVIRONMENT_SETUP_SUMMARY.md`
- What was created
- File structure
- Next steps

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| `.env.local` not found | `cp .env.example .env.local` |
| Secret not generated | `openssl rand -base64 32` |
| Can't connect to database | Verify PostgreSQL is running |
| Port 3000 busy | `npm run dev -- -p 3001` |
| Module not found | `npm install` |

---

## 🛠️ Helpful Commands

```bash
# Setup
./scripts/setup-env.sh           # Interactive setup
npm install                      # Install dependencies
npx prisma migrate dev           # Run migrations

# Development
npm run dev                      # Start dev server
npx prisma studio               # View database UI
npm run lint                     # Check code

# Utilities
openssl rand -base64 32          # Generate secret
cat .env.local                   # View config
cp .env.example .env.local       # Reset from template
```

---

## ✅ Verification Checklist

- [ ] `.env.local` file created
- [ ] `NEXTAUTH_SECRET` generated and added
- [ ] `DATABASE_URL` configured
- [ ] Dependencies installed (`npm install`)
- [ ] Database migrated (`npx prisma migrate dev`)
- [ ] Dev server starts (`npm run dev`)
- [ ] Can visit http://localhost:3000

---

## 🎯 Next Steps

1. **Complete setup** (5-10 minutes):
   - Run `./scripts/setup-env.sh` or follow Step-by-Step Guide above
   
2. **Start development**:
   ```bash
   npm run dev
   ```

3. **Begin coding**:
   - Create features in the `app/` directory
   - Add components in the `components/` directory
   - Use Prisma Studio for database management

4. **Deploy when ready**:
   - See `ENVIRONMENT_SETUP.md` for deployment instructions

---

## 📞 Need Help?

- **Quick answers:** Check `ENV_QUICK_REFERENCE.md`
- **Detailed help:** Read `ENVIRONMENT_SETUP.md`
- **Interactive help:** Run `./scripts/setup-env.sh`
- **Visual guide:** Check `SETUP_FLOWCHART.txt`

---

## 🔒 Security Reminders

✅ `.env.local` is in `.gitignore` - Safe to commit changes
✅ Never commit `.env.production` - Use secrets manager instead
✅ Rotate secrets regularly
✅ Use different secrets for each environment
✅ Keep passwords strong and unique

---

## 🎉 You're Ready!

Your environment is now fully configured. Everything is in place for development.

**Run this command to start:**
```bash
npm run dev
```

**Then open:** http://localhost:3000

Happy coding! 🚀

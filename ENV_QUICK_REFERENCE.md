# Environment Setup Quick Reference

## Files Created

```
PennyWise/
├── .env.example          ← Template for all environments
├── .env.development      ← Development config (reference)
├── .env.staging          ← Staging config (reference)
├── .env.production       ← Production config (reference)
├── ENVIRONMENT_SETUP.md  ← Full setup guide
└── scripts/
    └── setup-env.sh      ← Automated setup script
```

---

## 🚀 Quick Start (Choose One)

### Option A: Automated Setup (Recommended)
```bash
chmod +x scripts/setup-env.sh
./scripts/setup-env.sh
# Select option 1 for development
```

### Option B: Manual Setup (5 minutes)
```bash
# 1. Copy template
cp .env.example .env.local

# 2. Generate secret
openssl rand -base64 32
# Copy output to NEXTAUTH_SECRET in .env.local

# 3. Add database URL
# Edit .env.local and set DATABASE_URL

# 4. Start dev server
npm run dev
```

---

## 📝 Environment Variables Summary

### Development (.env.local)
```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=generated-secret
NEXTAUTH_URL=http://localhost:3000
DEBUG=true
ALLOW_MOCK_DATA=true
EMAIL_PROVIDER=console
```

### Staging (.env.staging)
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://staging.pennywise.app
DATABASE_URL=postgresql://... (staging database)
NEXTAUTH_SECRET=staging-secret
NEXTAUTH_URL=https://staging.pennywise.app
DEBUG=false
```

### Production (.env.production)
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://pennywise.app
DATABASE_URL=postgresql://... (production database)
NEXTAUTH_SECRET=prod-secret
NEXTAUTH_URL=https://pennywise.app
DEBUG=false
EMAIL_PROVIDER=sendgrid
```

---

## 🗄️ Database Setup

### Local PostgreSQL
```bash
# Install
brew install postgresql@15  # macOS
sudo apt install postgresql # Ubuntu

# Create database
createdb pennywise_dev

# Connection string
DATABASE_URL=postgresql://postgres:password@localhost:5432/pennywise_dev
```

### Docker PostgreSQL
```bash
docker run --name pennywise-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=pennywise_dev \
  -p 5432:5432 \
  -d postgres:15

# Connection string
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pennywise_dev
```

### Cloud Database (Recommended)
- **Supabase:** https://supabase.com (Free tier)
- **Neon:** https://neon.tech (Free tier)
- **AWS RDS:** PostgreSQL managed service
- **Railway:** https://railway.app (Easy deployment)

---

## 🔐 Security Checklist

- [ ] Generated `NEXTAUTH_SECRET` with `openssl rand -base64 32`
- [ ] `.env.local` is in `.gitignore` (already configured)
- [ ] `.env.production` is in `.gitignore` (already configured)
- [ ] Using strong database passwords
- [ ] Different secrets for each environment
- [ ] Production database backed up
- [ ] HTTPS enabled in production

---

## ✅ Verification Steps

```bash
# 1. Verify .env.local exists
ls -la .env.local

# 2. Test database connection
npm run test:db  # If configured in package.json

# 3. Check NextAuth setup
npm run dev

# 4. Visit http://localhost:3000
# Should see no errors in console
```

---

## 📚 Full Documentation

See **ENVIRONMENT_SETUP.md** for detailed instructions on:
- Complete setup walkthrough
- Database configuration options
- Email setup
- Deployment instructions
- Troubleshooting

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| `.env.local` not found | Run: `cp .env.example .env.local` |
| `DATABASE_URL is not set` | Add `DATABASE_URL=...` to `.env.local` |
| Can't connect to database | Check PostgreSQL is running, verify credentials |
| Port 3000 already in use | Run: `npm run dev -- -p 3001` |
| NEXTAUTH_SECRET not set | Run: `openssl rand -base64 32` and add to `.env.local` |

---

## 📞 Next Steps

1. **Run automated setup:** `./scripts/setup-env.sh`
2. **Or manual setup:** Follow Option B above
3. **Install dependencies:** `npm install`
4. **Run migrations:** `npx prisma migrate dev`
5. **Start dev server:** `npm run dev`
6. **Visit:** http://localhost:3000

---

**All set! Your environment is ready for development. 🎉**

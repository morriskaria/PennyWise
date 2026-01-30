# PennyWise

A **modern bookkeeping and financial management platform** designed for small businesses and individuals. PennyWise helps you track expenses, manage income, and stay organized with an intuitive, easy-to-use interface.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Development](#development)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- 💰 **Track Income & Expenses** - Organize all your financial transactions
- 📊 **Financial Reports** - Generate insights from your data
- 🔐 **Secure & Private** - Your data is encrypted and secure
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Fast & Efficient** - Built with modern web technologies
- 👥 **Multi-User Support** - Manage team access and permissions

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Prettier** - Code formatter

### Backend & Database
- **Next.js API Routes & Server Actions** - Backend logic
- **PostgreSQL** - Relational database
- **Prisma ORM** - Database ORM

### Development Tools
- **ESLint** - Code linting
- **Tailwind CSS v4** - CSS framework
- **TypeScript 5** - Type checking

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/pennywise.git
   cd PennyWise
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your configuration:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   DATABASE_URL=postgresql://user:password@localhost:5432/pennywise
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📥 Installation

### Step-by-Step Setup

#### 1. **Verify Node.js Installation**
   ```bash
   node --version
   npm --version
   ```

#### 2. **Install Project Dependencies**
   ```bash
   npm install
   ```

#### 3. **Set Up Environment Variables**
   Create a `.env.local` file with the following variables:
   ```
   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/pennywise
   
   # API
   NEXT_PUBLIC_API_URL=http://localhost:3000
   
   # Auth (optional)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   ```

#### 4. **Run Database Migrations** (if using Prisma)
   ```bash
   npx prisma migrate dev
   ```

#### 5. **Start the Development Server**
   ```bash
   npm run dev
   ```

---

## 💻 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

### Development Server

The development server runs on `http://localhost:3000` by default. It includes:
- Hot module replacement (HMR)
- Automatic page reloading
- TypeScript checking

### Making Changes

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "Add your feature description"
   ```

3. Push to GitHub and open a Pull Request:
   ```bash
   git push origin feature/your-feature-name
   ```

---

## 📁 Project Structure

```
PennyWise/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   └── ...
├── public/                   # Static assets
├── .eslintrc.json           # ESLint configuration
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── package.json             # Project dependencies
└── README.md                # This file
```

---

## 🔧 Configuration

### TypeScript (`tsconfig.json`)
Configured for strict type checking and modern JavaScript features.

### ESLint (`eslint.config.mjs`)
Uses Next.js recommended ESLint rules for code quality.

### Tailwind CSS (`tailwind.config.ts`)
Preconfigured with sensible defaults. Customize in the config file.

### Next.js (`next.config.ts`)
Production-ready configuration with all necessary optimizations.

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for all code
- Follow the ESLint rules defined in the project
- Format code with Prettier before committing
- Write meaningful commit messages

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For support, email support@pennywise.local or open an issue on GitHub.

---

**Happy bookkeeping! 💚**

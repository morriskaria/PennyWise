import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pennywise - Master Your SME Finances with Ease",
  description: "Automate your bookkeeping, generate audit-ready KRA reports, and manage your Kenyan business operations from a single dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: `
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
          .hero-gradient {
            background: radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 100%);
          }
          html {
            scroll-behavior: smooth;
          }
        ` }} />
      </head>
      <body className={`${inter.variable} antialiased bg-white text-neutral-slate font-display`}>
        {children}
      </body>
    </html>
  );
}


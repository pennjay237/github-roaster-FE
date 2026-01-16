import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';  // This imports from same directory

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GitHub Roast AI',
  description: 'AI-powered humorous roasts of GitHub users',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

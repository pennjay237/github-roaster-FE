import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '../styles/animations.css';
import QueryProvider from '@/components/providers/query-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GitHub Roast AI - AI-Powered Developer Roasts',
  description: 'Get hilarious AI-powered roasts of GitHub users based on their coding habits, repository stats, and GitHub activity!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
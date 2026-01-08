import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { ToastProvider } from '@/components/providers/toast-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'GitHub Roast AI | Powered by Gemini AI',
  description: 'Generate hilarious, AI-powered roasts of GitHub users using Google Gemini AI. All in good fun!',
  keywords: ['GitHub', 'Gemini AI', 'Roast', 'Developer', 'Humor', 'Coding', 'Fun'],
  authors: [{ name: 'GitHub Roast AI Team' }],
  openGraph: {
    type: 'website',
    title: 'GitHub Roast AI (Powered by Gemini)',
    description: 'AI-powered humorous roasts of GitHub users using Google Gemini AI',
    siteName: 'GitHub Roast AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHub Roast AI | Gemini AI',
    description: 'AI-powered humorous roasts of GitHub users using Google Gemini AI',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <ToastProvider />
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
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
  title: 'GitHub Roast AI | AI-Powered Developer Humor',
  description: 'Generate hilarious, AI-powered roasts of GitHub users based on their coding activity. All in good fun!',
  keywords: ['GitHub', 'AI', 'Roast', 'Developer', 'Humor', 'Coding', 'Fun'],
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
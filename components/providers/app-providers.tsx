'use client';

import { QueryProvider } from './query-provider';
import { ToastProvider } from './toast-provider';
import { ThemeProvider } from './theme-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <ToastProvider>{children}</ToastProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

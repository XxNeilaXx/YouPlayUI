import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ThemeProvider } from '@/components/theme-provider';
import { NavBar } from '@/components/nav-bar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'XxNeilaXx',
  description: 'Learn an instrument on your own rhythm',
};

const inter = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen flex w-full flex-col bg-background font-sans antialiased',
          inter.variable,
        )}
      >
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            {children}
          </ThemeProvider>
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}

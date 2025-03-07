import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import './globals.css';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Header } from '@/components/shared';
import { ThemeProvider } from './theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <NuqsAdapter>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <main className='flex h-screen flex-col'>
              <Header />
              {children}
            </main>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}

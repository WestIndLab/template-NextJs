import type { Metadata } from 'next';
import { initializeAppConfig } from '../config/init';
import { SessionProvider } from '../providers/SessionProvider';
import './globals.css';

initializeAppConfig();

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

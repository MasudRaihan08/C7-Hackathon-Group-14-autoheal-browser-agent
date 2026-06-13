import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AutoHeal Browser Agent',
  description: 'AI-powered self-healing browser automation platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

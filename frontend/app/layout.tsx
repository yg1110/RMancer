import type { Metadata } from 'next';
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

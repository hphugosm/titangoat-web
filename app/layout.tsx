import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PRE-WORKOUT | White TitanBeast – TitanGOAT',
  description:
    'Sestup do ledu. Pre-workout s klinicky ověřenými dávkami: 11 g L-citrulinu, 435 mg kofeinu, žádné proprietární směsi. 500 g, Made in Sweden.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

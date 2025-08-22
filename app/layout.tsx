import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MAX TV PRO - Premium IPTV Service',
  description: 'Premium IPTV streaming service with 4K quality, instant activation, and 24/7 support. Compatible with all devices.',
  keywords: 'IPTV, streaming, 4K, HD, premium, Arabic channels, sports, movies',
  authors: [{ name: 'MAX TV PRO' }],
  creator: 'MAX TV PRO',
  publisher: 'MAX TV PRO',
  robots: 'index, follow',
  metadataBase: new URL('https://maxprotv.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

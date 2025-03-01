import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/app/components/sidebar';
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bevy Guide',
  description: 'Learn to build games with the Bevy game engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Analytics/>
      <body className={inter.className}>
        <div className="flex">
          <div className="sticky top-0 h-screen">
            <Sidebar />
          </div>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
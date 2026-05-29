import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Roots - Family Tree Builder',
  description: 'Collaborative family tree builder and viewer',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full m-0`}>
      <body className="font-sans antialiased text-[#E0E0E0] bg-[#080809] h-full flex flex-col overflow-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

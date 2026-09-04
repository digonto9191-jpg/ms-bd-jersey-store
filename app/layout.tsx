import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MS BD - Your Jersey. Your Team.',
  description: 'Premium football jerseys for club and national team fans.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'YouTube Multi-View',
  description:
    'Paste one YouTube link and embed it up to 100 times on a single muted multi-view page, with per-player repeat counts.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-950">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#1F2937', color: '#F9FAFB' },
          }}
        />
      </body>
    </html>
  );
}

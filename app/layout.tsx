import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Gestion de tâches ExoDevOps',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-[#fafafa] min-h-screen`}>
        <nav className="bg-white border-b border-zinc-200 px-6 py-4">
          <a href="/tasks" className="font-bold text-zinc-900 text-lg tracking-tight">
            Task<span className="text-violet-600">Manager</span>
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}

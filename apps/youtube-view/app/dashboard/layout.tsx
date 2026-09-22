import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <nav className="border-b border-gray-800 bg-gray-950/80 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="inline-block h-3 w-5 rounded-sm bg-red-600" aria-hidden="true" />
            Multi-View
          </Link>
          <span className="text-xs text-gray-500">Dashboard</span>
        </div>
      </nav>
      {children}
    </div>
  );
}

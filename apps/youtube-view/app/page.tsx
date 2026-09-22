import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="rounded-full border border-red-900 bg-red-950/40 px-3 py-1 text-xs font-medium text-red-400">
        Multi-View
      </span>
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        One link. Many players. All muted.
      </h1>
      <p className="max-w-xl text-sm text-gray-400">
        Paste a YouTube URL or video ID, choose how many copied players you want
        (20–100), and set each one to repeat the video 3, 5, 10 or 20 times before it
        pauses itself. Every player stays muted.
      </p>
      <Link
        href="/dashboard"
        className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Open the dashboard
      </Link>
      <ul className="grid gap-2 text-left text-xs text-gray-500 sm:grid-cols-2">
        <li>✅ Validates youtube.com, youtu.be and raw IDs</li>
        <li>✅ Grid, list and compact layouts</li>
        <li>✅ Autoplay repeat: 3× / 5× / 10× / 20×, then auto-pause</li>
        <li>✅ Sound is always off</li>
      </ul>
    </main>
  );
}

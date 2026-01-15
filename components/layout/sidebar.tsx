'use client';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 hidden md:block">
      <nav className="flex flex-col space-y-2">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
      </nav>
    </aside>
  );
}

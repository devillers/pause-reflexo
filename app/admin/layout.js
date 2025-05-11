import Link from 'next/link';

export const metadata = {
  title: 'Admin – Pause Réflexo'
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-800 text-white p-4">
        <nav className="max-w-4xl mx-auto flex gap-6">
          <Link href="/admin/posts" className="hover:underline">
            Posts
          </Link>
          <Link href="/admin/soins" className="hover:underline">
            Soins
          </Link>
          <Link href="/admin/posts/new" className="hover:underline">
            + Nouveau post
          </Link>
          <Link href="/admin/soins/new" className="hover:underline">
            + Nouveau soin
          </Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-8">
        {children}
      </main>
    </div>
  );
}

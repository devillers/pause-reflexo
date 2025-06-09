import Link from 'next/link';

export const metadata = {
  title: 'Admin – Pause Réflexo'
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar gauche */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-6 min-h-screen">
        <h1 className="text-xl font-semibold mb-6">Pause Réflexo</h1>
        <nav className="flex flex-col gap-4 text-sm">
          <Link href="/admin/posts" className="">
          Tous les posts
          </Link>
           <Link href="/admin/posts/new" className="ml-4">
            Nouveau post
          </Link>
          <Link href="/admin/soins" className="">
            Tous les soins
          </Link>
           <Link href="/admin/soins/new" className="ml-4">
          Nouveau soin
          </Link>
         
         
          <Link href="/" className="hover:underline mt-8 text-red-300">
           Retour au site
          </Link>
        </nav>
      </aside>

      {/* Contenu admin */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

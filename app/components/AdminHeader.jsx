//app/components/Header.jsx

'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session, status } = useSession();
  if (status === 'loading') return null;

  return (
    <header className="p-4 flex justify-between items-center bg-gray-100">
      <Link href="/"><h1 className="text-xl font-bold">Pause Réflexo</h1></Link>
      {session ? (
        <div className="flex items-center space-x-4">
          <span className="text-sm">Salut, {session.user.email}</span>
          <button
            onClick={() => signOut()}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Déconnexion
          </button>
        </div>
      ) : (
        
        <button
          onClick={() => signIn()}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Connexion
        </button>
      )}
    </header>
  );
}


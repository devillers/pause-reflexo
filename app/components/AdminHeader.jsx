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
            className="border border-red-500 text-red-500 px-4 py-2 rounded-full text-[10px] uppercase hover:bg-red-500 hover:text-white transition"
          >
            Déconnexion
          </button>
        </div>
      ) : (
        
        <button
          onClick={() => signIn()}
          className="border border-[#009992] text-[#009992] px-4 py-2 rounded-full text-xs uppercase hover:bg-[#027771] hover:text-white transition"
        >
          Connexion
        </button>
      )}
    </header>
  );
}


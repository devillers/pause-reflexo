// app/components/Header.jsx
'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MegaMenu from './Mega_menu';
import AdminHeader from './AdminHeader';

export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  // Dès que la session est connue, si on est dans /admin sans session, on redirige
  useEffect(() => {
    if (status === 'loading') return;
    if (!session && pathname.startsWith('/admin')) {
      router.replace('/auth/signin');
    }
  }, [status, session, pathname, router]);

  // Pendant le chargement, on n'affiche rien
  if (status === 'loading') return null;

  // Si on est dans /admin ET connecté -> menu admin
  if (session && pathname.startsWith('/admin')) {
    return <AdminHeader />;
  }

  // Pour toutes les autres routes -> MegaMenu
  return (
    <header className=''>
      <MegaMenu />
    </header>
  );
}

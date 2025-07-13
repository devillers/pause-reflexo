import { useLayout } from "@/app/LayoutContext"; // Chemin absolu si possible
import MegaMenu from './Mega_menu';
import AdminHeader from './AdminHeader';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Header() {
  const { setIsBlurred } = useLayout(); // <- Ajoute ceci
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session && pathname.startsWith('/admin')) {
      router.replace('/auth/signin');
    }
  }, [status, session, pathname, router]);

  if (status === 'loading') return null;
  if (session && pathname.startsWith('/admin')) {
    return <AdminHeader />;
  }

  return (
    <header
      onMouseEnter={() => setIsBlurred(true)}
      onMouseLeave={() => setIsBlurred(false)}
      className=""
    >
      <MegaMenu />
    </header>
  );
}

import Providers from './providers';
import Header    from './components/Header';
import './globals.css';

export const metadata = {
  title: 'Pause Réflexo',
  description: '...'
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {/* on wrappe l’app dans SessionProvider */}
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

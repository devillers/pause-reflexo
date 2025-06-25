//app/layout.js

import './globals.css'
import { LayoutProvider } from './LayoutContext'
import LayoutWrapper from './LayoutWrapper'
import Providers from './providers'

export const metadata = {
  title: 'Pause Réflexo',
  description: '...',
  icons: [
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    { rel: 'apple-touch-icon-precomposed', url: '/apple-touch-icon-precomposed.png' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="relative" suppressHydrationWarning={true}>
        <Providers>
          <LayoutProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </LayoutProvider>
        </Providers>
      </body>
    </html>
  )
}

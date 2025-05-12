// app/layout.js (Server Component)
import './globals.css'
import { LayoutProvider } from './LayoutContext'
import LayoutWrapper from './LayoutWrapper'
import Providers from './providers'

export const metadata = {
  title: 'Pause Réflexo',
  description: '...'
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="relative">
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

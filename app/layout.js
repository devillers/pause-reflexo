import './globals.css'
import { LayoutProvider } from './LayoutContext'
import LayoutWrapper from './LayoutWrapper'
import Providers from './providers'
import Head from 'next/head'

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <Head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" />
      </Head>
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

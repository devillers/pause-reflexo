// app/layout.js
import "./globals.css";
import { LayoutProvider } from "./LayoutContext";
import LayoutWrapper from "./LayoutWrapper";
import Providers from "./providers";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="min-h-screen flex flex-col">
      <Head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="apple-touch-icon-precomposed"
          href="/apple-touch-icon-precomposed.png"
        />
      </Head>
      <body
        className="overflow-x-hidden flex flex-col flex-1"
        suppressHydrationWarning={true}
      >
        <Providers>
          <LayoutProvider>
            <LayoutWrapper>
              <main className="flex-2">{children}</main>
            </LayoutWrapper>
          </LayoutProvider>
        </Providers>
      </body>
    </html>
  );
}

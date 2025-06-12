//app/LayoutWrapper.js



"use client";

import React from "react";
import Script from "next/script";
import CookieConsent from "react-cookie-consent";
import Head from "next/head";
import { usePathname } from "next/navigation";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { useLayout } from "./LayoutContext";
import FloatingContact from "./components/FloatingContact";

export default function LayoutWrapper({ children }) {
  const { hideLayout } = useLayout();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isSignin = pathname === '/auth/signin';
  const isContact = pathname === '/contact';
  const isSoins = pathname.startsWith('/soins');

  //const showLayout = !hideLayout && !isAdmin && !isSignin;

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" />
      </Head>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FER4ECWWK3"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', { analytics_storage: 'denied' });
          gtag('config', 'G-FER4ECWWK3', { anonymize_ip: true, page_path: window.location.pathname });
        `}
      </Script>

      {!isAdmin && !isSignin && !hideLayout && <Header />}
      <main>{children}</main>
      {!isAdmin && !isSignin && !hideLayout && <Footer />}
      {!isAdmin && !isSignin && !isContact && !isSoins && !hideLayout && <FloatingContact />}

      {/* Cookie Consent */}
      {!isAdmin && !isSignin && (
        <CookieConsent
          disableStyles
          location="none"
          style={{
            position: "fixed",
            bottom: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            maxWidth: "400px",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            border: "1px solid #ddd",
            borderRadius: "0.5rem",
            padding: "1rem",
            zIndex: 1000,
          }}
          buttonStyle={{
            background: "#000",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            fontSize: "0.75rem",
            fontWeight: 300,
            marginLeft: "1rem",
            marginRight: "3rem",
            marginTop: "1rem",
          }}
          declineButtonStyle={{
            background: "#fff",
            color: "#333",
            padding: "0.5rem 1rem",
            border: "1px solid #ccc",
            borderRadius: "0.375rem",
            fontSize: "0.75rem",
            fontWeight: 300,
          }}
          enableDeclineButton
          buttonText="J'accepte"
          declineButtonText="Je refuse"
          onAccept={() => {
            window.gtag?.("consent", "update", { analytics_storage: "granted" });
          }}
          onDecline={() => {
            window.gtag?.("consent", "update", { analytics_storage: "denied" });
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src="/images/cookie.png"
              alt="Cookie"
              className="w-24 h-24 object-contain flex-shrink-0"
            />
            <p className="text-[12px] text-center sm:text-left">
              Ce site utilise des cookies pour améliorer votre expérience. Vous
              pouvez accepter ou refuser leur utilisation.
            </p>
          </div>
        </CookieConsent>
      )}
    </>
  );
}

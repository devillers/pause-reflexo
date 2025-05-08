// app/layout.js
import './globals.css';     

export const metadata = {
  title: 'My Blog',
  description: 'Next.js + Tailwind + MongoDB demo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}

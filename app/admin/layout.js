// app/admin/layout.js
import Sidebar from "../components/SideBar";

export const metadata = {
  title: 'Admin – Pause Réflexo'
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar gauche personnalisée */}
      <Sidebar />

      {/* Contenu admin */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

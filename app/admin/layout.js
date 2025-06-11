// app/admin/layout.js
import Sidebar from "../components/SideBar";
import { auth } from "../../auth.js";         // ← on utilise maintenant auth() universel de v5
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin – Pause Réflexo",
};

export default async function AdminLayout({ children }) {
  // Récupère la session (ou null)
  const session = await auth();

  // Si pas connecté·e, on redirige avant rendu
  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

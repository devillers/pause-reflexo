<<<<<<< HEAD
//app/admin/settings/page.js

=======
import menuItems from "../../../data/menuItems";
import Link from "next/link";
>>>>>>> 4ce17716a0a63795e5416364d7e34c0f7661f793

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Settings Dashboard</h1>

      <nav className="bg-white shadow rounded w-full max-w-xs p-4">
        <ul className="space-y-2 text-sm">
          {menuItems
            .filter((item) => item.title && item.href)
            .map((item, index) => (
              <li key={index}>
                <Link href={item.href} className="text-[#009992] hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
        </ul>
      </nav>

      <p className="text-gray-600 mt-6">This page is under construction.</p>
      <p className="text-gray-600">Stay tuned for updates!</p>
    </div>
  );
}
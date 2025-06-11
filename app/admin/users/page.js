'use client';
import React from 'react';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          setError(`Erreur réseau : ${res.status}`);
          return;
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les utilisateurs");
      }
    }
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Erreur suppression");
      }
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main className="sm:p-4 max-w-5xl mx-auto ">
      <div className="flex-cols ">
        <h1 className="text-2xl font-bold mb-6">Tous les utilisateurs</h1>
        <button
          onClick={() => router.push("/admin/users/new")}
          className="mb-6 sm:mt-0 border border-[#009992] text-[#009992] px-4 py-2 rounded-full text-xs uppercase hover:bg-[#027771] hover:text-white transition"
        >
          Créer un utilisateur
        </button>
      </div>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user._id}
            className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm rounded-lg bg-white"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
              <div className="w-16 h-16 relative flex-shrink-0">
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.name}
                    fill
                    className="object-cover rounded-full"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full rounded-full flex items-center justify-center text-gray-500 text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-base">{user.name}</h2>
                <p className="text-sm text-gray-600">Email : {user.email}</p>
                <p className="text-sm text-gray-600">Rôle : {user.role}</p>
              </div>
            </div>
            <div className="flex gap-2 self-start sm:self-auto">
              <button
                onClick={() => router.push(`/admin/users/${user._id}/edit`)}
                className="border border-[#009992] text-[#009992] px-4 py-2 rounded-full text-xs uppercase hover:bg-[#027771] hover:text-white transition"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="border border-red-500 text-red-500 px-4 py-2 rounded-full text-xs uppercase hover:bg-red-500 hover:text-white transition"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

//app/admin/posts/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

export default function AdminPostPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setPosts)
      .catch(() => alert("Impossible de charger les posts"));
  }, []);

  return (
    <main className="p-2 sm:p-4 max-w-5xl mx-auto">
      <div className="flex-cols items-center ">
        <h1 className="text-2xl font-light mb-6">Tous les posts</h1>
        <button
          onClick={() => router.push("/admin/posts/new")}
          className="mb-6 border border-[#009992] text-[#009992] px-4 py-2 rounded-full text-xs uppercase hover:bg-[#027771] hover:text-white transition"
        >
          Créer un nouveau post
        </button>
      </div>

      <ul className="space-y-4 ">
        {posts.map((post) => (
          <li
            key={post._id}
            className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm rounded-lg bg-white"
          >
            {/* Left: thumbnail + info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
              <div className="w-full sm:w-24 sm:h-24 h-40 relative flex-shrink-0">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full rounded flex items-center justify-center text-gray-500 text-xs">
                    No Image
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-light text-sm uppercase">{post.title}</h2>
                 <h2 className="font-light text-sm uppercase">{post.second_title}</h2>
                <p className="text-xs font-thin text-gray-700">
                  Catégorie : {post.category || "—"}
                </p>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex gap-2 sm:gap-4 self-start sm:self-auto">
              <button
                onClick={() => router.push(`/admin/posts/${post.slug}/edit`)}
                className="border border-[#009992] text-[#009992] px-4 py-2 rounded-full text-[10px] uppercase hover:bg-[#027771] hover:text-white transition"
              >
                Modifier
              </button>
              <button
                onClick={async () => {
                  if (!confirm("Supprimer ce post ?")) return;
                  await fetch(`/api/posts/${post.slug}`, { method: "DELETE" });
                  setPosts((prev) => prev.filter((p) => p.slug !== post.slug));
                }}
                className="border border-red-500 text-red-500 px-4 py-2 rounded-full text-[10px] uppercase hover:bg-[#990021] hover:text-white transition"
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

"use client";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const emptyHero = {
  heroTitleLines: ["", ""],
  heroImage: { url: "", alt: "" },
  heroDescription: "",
  heroCtaText: "",
  heroCtaLink: "",
};

export default function HeaderGeneralDestinationAdmin() {
  const [hero, setHero] = useState(emptyHero);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/settings-destination/get", {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setHero({ ...emptyHero, ...data });
      }
      setLoading(false);
    })();
  }, []);

  // Upload image header
  const onDrop = async (files) => {
    const file = files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/uploadCloudinary", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const { url } = await res.json();
      setHero((prev) => ({
        ...prev,
        heroImage: { ...prev.heroImage, url },
      }));
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  async function saveHero() {
    const res = await fetch("/api/admin/settings-destination/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hero),
    });
    if (res.ok) alert("Header enregistré !");
    else alert("Erreur sauvegarde header");
  }

  if (loading) return <p className="p-4 text-gray-500">Chargement header…</p>;

  return (
    <section className="mb-10 p-6 bg-white rounded shadow max-w-3xl mx-auto">
      <h2 className="font-semibold text-lg mb-4">
        Header général de la page Destination
      </h2>
      {[0, 1].map((idx) => (
        <input
          key={idx}
          type="text"
          value={hero.heroTitleLines?.[idx] || ""}
          onChange={(e) => {
            const lines = [...(hero.heroTitleLines || ["", ""])];
            lines[idx] = e.target.value;
            setHero((h) => ({ ...h, heroTitleLines: lines }));
          }}
          placeholder={`Ligne ${idx + 1}`}
          className="w-full p-2 border rounded text-sm mb-2"
        />
      ))}
      <textarea
        value={hero.heroDescription}
        onChange={(e) =>
          setHero((h) => ({ ...h, heroDescription: e.target.value }))
        }
        placeholder="Description (optionnelle)"
        className="w-full p-2 border rounded text-sm mb-2"
        rows={2}
      />
      <input
        type="text"
        value={hero.heroCtaText}
        onChange={(e) =>
          setHero((h) => ({ ...h, heroCtaText: e.target.value }))
        }
        placeholder="Texte bouton (optionnel)"
        className="w-full p-2 border rounded text-sm mb-2"
      />
      <input
        type="text"
        value={hero.heroCtaLink}
        onChange={(e) =>
          setHero((h) => ({ ...h, heroCtaLink: e.target.value }))
        }
        placeholder="Lien bouton (optionnel)"
        className="w-full p-2 border rounded text-sm mb-2"
      />
      <input
        type="text"
        value={hero.heroImage?.alt || ""}
        onChange={(e) =>
          setHero((h) => ({
            ...h,
            heroImage: { ...h.heroImage, alt: e.target.value },
          }))
        }
        placeholder="Alt de l'image"
        className="w-full p-2 border rounded text-sm mb-2"
      />
      <div
        {...getRootProps()}
        className="mt-2 border-2 border-dashed p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded"
      >
        <input {...getInputProps()} />
        <p className="text-sm text-gray-600">
          Déposez l’image principale ici ou cliquez
        </p>
      </div>
      {hero.heroImage?.url && (
        <div className="my-3 flex flex-col items-center gap-2">
          <Image
            src={hero.heroImage.url}
            alt={hero.heroImage.alt || ""}
            width={400}
            height={200}
            className="rounded shadow"
            style={{ objectFit: "contain", maxHeight: 200 }}
          />
          <button
            className="text-sm text-red-600 underline mt-2"
            type="button"
            onClick={() =>
              setHero((prev) => ({
                ...prev,
                heroImage: { url: "", alt: "" },
              }))
            }
          >
            Supprimer l’image
          </button>
        </div>
      )}
      <button
        onClick={saveHero}
        className="bg-[#009992] text-white px-6 py-2 rounded hover:bg-[#007c78] mt-2"
      >
        Enregistrer le header
      </button>
    </section>
  );
}

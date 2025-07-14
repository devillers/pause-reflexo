//APP/components/adminDestination/SejourForm.js

"use client";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import ProgrammeSection from "./ProgrammeSection";
import PrixForm from "./PrixForm";
import HebergementForm from "./HebergementForm";

export default function SejourForm({
  form,
  setForm,
  isEditing,
  handleSave,
  handleReset,
  // HERO
  onDropHero,
  handleHeroAltChange,
  onRemoveHeroImage,
  // Miniatures
  onDropMain,
  removeMainImage,
  // Galerie
  onDropGallery,
  removeGalleryImage,
}) {
  // HERO Dropzone
  const { getRootProps: getHeroRootProps, getInputProps: getHeroInputProps } =
    useDropzone({
      accept: { "image/*": [] },
      onDrop: onDropHero,
    });

  // Miniatures Dropzone
  const { getRootProps: getMainRootProps, getInputProps: getMainInputProps } =
    useDropzone({
      accept: { "image/*": [] },
      onDrop: onDropMain,
    });

  // Galerie Dropzone
  const {
    getRootProps: getGalleryRootProps,
    getInputProps: getGalleryInputProps,
  } = useDropzone({
    accept: { "image/*": [] },
    onDrop: onDropGallery,
  });

  // --- RENDU ---
  return (
    <div className="bg-white rounded shadow p-6 space-y-4 max-w-2xl">
      <h2 className="font-semibold mb-2">
        {isEditing ? "Modifier le séjour" : "Ajouter un séjour"}
      </h2>
      {/* Champs principaux */}
      <input
        name="titre"
        value={form.titre}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, titre: e.target.value }))
        }
        placeholder="Titre"
        className="w-full p-2 border rounded text-sm"
      />
      <input
        name="slug"
        value={form.slug}
        onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
        placeholder="Slug (unique, ex: yoga-alpes)"
        className="w-full p-2 border rounded text-sm"
        disabled={isEditing}
      />
      <input
        name="dateDebut"
        value={form.dateDebut || ""}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, dateDebut: e.target.value }))
        }
        placeholder="Date de début"
        className="w-full p-2 border rounded text-sm"
        type="date"
      />
      <input
        name="dateFin"
        value={form.dateFin || ""}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, dateFin: e.target.value }))
        }
        placeholder="Date de fin"
        className="w-full p-2 border rounded text-sm"
        type="date"
      />
      <input
        name="destination"
        value={form.destination}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, destination: e.target.value }))
        }
        placeholder="Destination"
        className="w-full p-2 border rounded text-sm"
      />
      <input
        name="resume"
        value={form.resume}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, resume: e.target.value }))
        }
        placeholder="Résumé"
        className="w-full p-2 border rounded text-sm"
      />
      <input
        name="duree"
        value={form.duree}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, duree: e.target.value }))
        }
        placeholder="Durée"
        className="w-full p-2 border rounded text-sm"
      />
      <input
        name="sport"
        value={form.sport}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, sport: e.target.value }))
        }
        placeholder="Sport"
        className="w-full p-2 border rounded text-sm"
      />
      <input
        name="niveau"
        value={form.niveau}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, niveau: e.target.value }))
        }
        placeholder="Niveau"
        className="w-full p-2 border rounded text-sm"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, description: e.target.value }))
        }
        placeholder="Description"
        className="w-full p-2 border rounded text-sm"
        rows={3}
      />

      {/* Points forts globaux */}
      <div>
        <label className="font-semibold mb-2">Points forts</label>
        {(form.pointsForts || []).map((pt, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              value={pt}
              onChange={(e) => {
                const updated = [...form.pointsForts];
                updated[i] = e.target.value;
                setForm((prev) => ({ ...prev, pointsForts: updated }));
              }}
              className="w-full p-2 border rounded text-sm"
              placeholder={`Point fort ${i + 1}`}
            />
            <button
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  pointsForts: prev.pointsForts.filter((_, idx) => idx !== i),
                }))
              }
              type="button"
              className="text-red-600 font-bold"
            >
              X
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              pointsForts: [...(prev.pointsForts || []), ""],
            }))
          }
          type="button"
          className="text-sm text-[#009992]"
        >
          + Ajouter un point fort
        </button>
      </div>

      {/* HERO IMAGE */}
      <div>
        <label className="font-semibold">Image Header (hero)</label>
        <div
          {...getHeroRootProps()}
          className="mt-2 border-2 border-dashed p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded"
        >
          <input {...getHeroInputProps()} />
          <p className="text-sm text-gray-600">
            Déposez l’image principale ici ou cliquez
          </p>
        </div>
        {form.heroImage?.url && (
          <div className="mt-2 flex flex-col items-center gap-2">
            <Image
              src={form.heroImage.url}
              alt={form.heroImage.alt || ""}
              width={400}
              height={200}
              className="rounded shadow"
              style={{ objectFit: "contain", maxHeight: 200 }}
            />
            <input
              type="text"
              placeholder="Texte alternatif"
              value={form.heroImage.alt}
              onChange={handleHeroAltChange}
              className="w-full p-2 border rounded text-sm"
            />

            <button
              className="text-sm text-red-600 underline mt-2"
              type="button"
              onClick={onRemoveHeroImage}
            >
              Supprimer l’image
            </button>
          </div>
        )}
      </div>

      {/* Images Miniatures */}
      <div>
        <label className="font-semibold">Images miniatures (liste)</label>
        <div
          {...getMainRootProps()}
          className="mt-2 border-2 border-dashed p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded"
        >
          <input {...getMainInputProps()} />
          <p className="text-sm text-gray-600">
            Déposez une image miniature ici ou cliquez
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {(form.imagesMain || []).map((img, i) => (
            <div key={i} className="relative">
              <Image
                src={img.url}
                alt={img.alt}
                width={100}
                height={70}
                className="rounded shadow"
              />
              <button
                onClick={() => removeMainImage(i)}
                className="absolute top-0 right-0 text-red-600 bg-white rounded-full px-1"
                type="button"
                title="Supprimer"
              >
                ×
              </button>
              <input
                type="text"
                placeholder="Texte alt"
                value={img.alt}
                className="block mt-1 text-xs w-full"
                onChange={(e) => {
                  const arr = [...form.imagesMain];
                  arr[i].alt = e.target.value;
                  setForm((prev) => ({ ...prev, imagesMain: arr }));
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Galerie */}
      <div>
        <label className="font-semibold">Galerie (détail)</label>
        <div
          {...getGalleryRootProps()}
          className="mt-2 border-2 border-dashed p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded"
        >
          <input {...getGalleryInputProps()} />
          <p className="text-sm text-gray-600">
            Déposez une image de galerie ici ou cliquez
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {(form.imagesGallery || []).map((img, i) => (
            <div key={i} className="relative">
              <Image
                src={img.url}
                alt={img.alt}
                width={100}
                height={70}
                className="rounded shadow"
              />
              <button
                onClick={() => removeGalleryImage(i)}
                className="absolute top-0 right-0 text-red-600 bg-white rounded-full px-1"
                type="button"
                title="Supprimer"
              >
                ×
              </button>
              <input
                type="text"
                placeholder="Texte alt"
                value={img.alt}
                className="block mt-1 text-xs w-full"
                onChange={(e) => {
                  const arr = [...form.imagesGallery];
                  arr[i].alt = e.target.value;
                  setForm((prev) => ({ ...prev, imagesGallery: arr }));
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* PROGRAMME Section */}
      <ProgrammeSection form={form} setForm={setForm} />

      {/* PRIX Section */}
      <PrixForm
        prix={form.prix}
        setPrix={(prix) => setForm((prev) => ({ ...prev, prix }))}
        prixDetail={form.prixDetail}
        setPrixDetail={(prixDetail) =>
          setForm((prev) => ({ ...prev, prixDetail }))
        }
      />

      {/* HEBERGEMENT Section */}
      <HebergementForm
        hebergementTitre={form.hebergementTitre}
        setHebergementTitre={(hebergementTitre) =>
          setForm((prev) => ({ ...prev, hebergementTitre }))
        }
        hebergementDescriptif={form.hebergementDescriptif}
        setHebergementDescriptif={(hebergementDescriptif) =>
          setForm((prev) => ({ ...prev, hebergementDescriptif }))
        }
        hebergementPointsForts={form.hebergementPointsForts}
        setHebergementPointsForts={(hebergementPointsForts) =>
          setForm((prev) => ({ ...prev, hebergementPointsForts }))
        }
        hebergementImages={form.hebergementImages}
        setHebergementImages={(hebergementImages) =>
          setForm((prev) => ({ ...prev, hebergementImages }))
        }
      />

      {/* Boutons */}
      <div className="flex mt-4">
        <button
          onClick={handleSave}
          className="bg-[#009992] text-white px-6 py-2 rounded hover:bg-[#007c78]"
          type="button"
        >
          {isEditing ? "Enregistrer les modifications" : "Créer le séjour"}
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded border ml-4"
          type="button"
        >
          Réinitialiser le formulaire
        </button>
      </div>
    </div>
  );
}

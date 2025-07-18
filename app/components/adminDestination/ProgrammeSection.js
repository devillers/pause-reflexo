"use client";
import ProgrammeDayForm from "./ProgrammeDayForm";

export default function ProgrammeSection({ form, setForm }) {
  // Ajouter un jour
  const addProgDay = () =>
    setForm((prev) => ({
      ...prev,
      programme: [
        ...(Array.isArray(prev.programme) ? prev.programme : []),
        {
          titre: "",
          details: "",
          description: "",
          resume: "",
          petitDej: "",
          dejeuner: "",
          diner: "",
          pointsForts: [],
          images: [],
        },
      ],
    }));

  // Supprimer un jour
  const removeProgDay = (i) =>
    setForm((prev) => ({
      ...prev,
      programme: prev.programme.filter((_, idx) => idx !== i),
    }));

  // Changement dans un champ d’un jour
  const handleDayChange = (idx, field, value) => {
    setForm((prev) => {
      const arr = [...prev.programme];
      arr[idx][field] = value;
      return { ...prev, programme: arr };
    });
  };

  // Upload d’une image pour un jour
  const handleAddImage = async (idx, file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/uploadCloudinary", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const { url } = await res.json();
      setForm((prev) => {
        const arr = [...prev.programme];
        arr[idx].images = [...(arr[idx].images || []), { url, alt: "" }];
        return { ...prev, programme: arr };
      });
    }
  };

  // Suppression d’une image pour un jour
  const handleRemoveImage = (idx, imgIdx) => {
    setForm((prev) => {
      const arr = [...prev.programme];
      arr[idx].images = arr[idx].images.filter((_, i) => i !== imgIdx);
      return { ...prev, programme: arr };
    });
  };

  return (
    <section>
      <label className="font-semibold">Programme - Introduction</label>
      <textarea
        name="programmeDescriptif"
        value={form.programmeDescriptif}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            programmeDescriptif: e.target.value,
          }))
        }
        placeholder="Texte d’introduction du programme"
        className="w-full p-2 border rounded text-sm mb-2"
        rows={2}
      />

      <label className="font-semibold">Programme (par jour)</label>
      {(form.programme || []).map((day, i) => (
        <ProgrammeDayForm
          key={i}
          day={day}
          idx={i}
          onChange={handleDayChange}
          onRemove={removeProgDay}
          onAddImage={handleAddImage}
          onRemoveImage={handleRemoveImage}
        />
      ))}
      <button
        type="button"
        className="text-xs text-[#009992] mt-2"
        onClick={addProgDay}
      >
        + Ajouter un jour
      </button>
    </section>
  );
}


//app/components/adminDestination/ProgrammeForm.js
"use client";
import ProgrammeDayForm from "./ProgrammeForm";

export default function ProgrammeForm({
  programmeDescriptif,
  setProgrammeDescriptif,
  programme,
  setProgramme,
  uploadImage,
}) {
  // Ajouter un jour
  const addProgDay = () =>
    setProgramme([
      ...programme,
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
    ]);

  // Retirer un jour
  const removeProgDay = (i) =>
    setProgramme(programme.filter((_, idx) => idx !== i));

  // Mettre à jour une info d’un jour
  const updateDay = (idx, field, value) => {
    const arr = [...programme];
    arr[idx] = { ...arr[idx], [field]: value };
    setProgramme(arr);
  };

  // Ajouter image à un jour
  const addDayImage = async (idx, file) => {
    const url = await uploadImage(file);
    const arr = [...programme];
    arr[idx].images = [...(arr[idx].images || []), { url, alt: "" }];
    setProgramme(arr);
  };

  // Retirer une image d’un jour
  const removeDayImage = (dayIdx, imgIdx) => {
    const arr = [...programme];
    arr[dayIdx].images = arr[dayIdx].images.filter((_, i) => i !== imgIdx);
    setProgramme(arr);
  };

  return (
    <div className="mb-8">
      <label className="font-semibold">Programme - Introduction</label>
      <textarea
        name="programmeDescriptif"
        value={programmeDescriptif}
        onChange={(e) => setProgrammeDescriptif(e.target.value)}
        placeholder="Texte d’introduction du programme"
        className="w-full p-2 border rounded text-sm mb-2"
        rows={2}
      />
      <label className="font-semibold">Programme (par jour)</label>
      {(programme || []).map((day, i) => (
        <ProgrammeDayForm
          key={i}
          day={day}
          idx={i}
          onChange={updateDay}
          onRemove={removeProgDay}
          onAddImage={addDayImage}
          onRemoveImage={removeDayImage}
        />
      ))}
      <button
        type="button"
        className="text-xs text-[#009992] mt-2"
        onClick={addProgDay}
      >
        + Ajouter un jour
      </button>
    </div>
  );
}

"use client";
import { useState } from "react";
import {
  Users,
  Calendar,
  Euro,
  Percent,
  GlassWater,
  Bus,
  Plane,
  ChefHat,
  Fuel,
  Star,
  Sailboat,
  Bird,
  Heart,
  Briefcase,
  Bike,
} from "lucide-react";

const safeDays = (d) => Math.max(1, d);

export function SeminarCalculator() {
  const [participants, setParticipants] = useState(15);
  const [days, setDays] = useState(2);
  const [pricePerPerson, setPricePerPerson] = useState(140);

  const [costLodging, setCostLodging] = useState(50);
  const [costMeals, setCostMeals] = useState(20);
  const [costWine, setCostWine] = useState(0);
  const [costOrg, setCostOrg] = useState(5);
  const [costFuel, setCostFuel] = useState(0);
  const [costPlane, setCostPlane] = useState(0);

  // Champs à fréquence
  const [costBus, setCostBus] = useState(0);
  const [freqBus, setFreqBus] = useState(1);
  const [costGuide, setCostGuide] = useState(0);
  const [freqGuide, setFreqGuide] = useState(1);
  const [costChef, setCostChef] = useState(0);
  const [freqChef, setFreqChef] = useState(1);
  const [costYoga, setCostYoga] = useState(0);
  const [freqYoga, setFreqYoga] = useState(1);
  const [costQiGong, setCostQiGong] = useState(0);
  const [freqQiGong, setFreqQiGong] = useState(1);
  const [costExtras, setCostExtras] = useState(0);
  const [freqExtras, setFreqExtras] = useState(1);
  const [costActivities, setCostActivities] = useState(0);
  const [freqActivities, setFreqActivities] = useState(1);
  const [costCanyoning, setCostCanyoning] = useState(0);
  const [freqCanyoning, setFreqCanyoning] = useState(1);
  const [costParagliding, setCostParagliding] = useState(0);
  const [freqParagliding, setFreqParagliding] = useState(1);
  const [costBike, setCostBike] = useState(0);
  const [freqBike, setFreqBike] = useState(1);

  const [tvaFr, setTvaFr] = useState(false);
  const [tvaUk, setTvaUk] = useState(false);

  // CALCULS
  const totalLodging = costLodging * participants * safeDays(days);
  const totalMeals = costMeals * participants * safeDays(days);
  const totalFuel = costFuel * participants * safeDays(days);
  const totalWine = costWine;
  const totalBus = costBus * freqBus;
  const totalPlane = costPlane;
  const totalOrg = costOrg * safeDays(days);
  const totalGuide = costGuide * freqGuide;
  const totalChef = costChef * freqChef;
  const totalYoga = costYoga * freqYoga;
  const totalQiGong = costQiGong * freqQiGong;
  const totalExtras = costExtras * freqExtras;
  const totalActivities = costActivities * participants * freqActivities;
  const totalCanyoning = costCanyoning * participants * freqCanyoning;
  const totalParagliding = costParagliding * participants * freqParagliding;
  const totalBike = costBike * participants * freqBike;

  const totalCost =
    totalLodging +
    totalMeals +
    totalWine +
    totalGuide +
    totalChef +
    totalYoga +
    totalQiGong +
    totalOrg +
    totalActivities +
    totalCanyoning +
    totalParagliding +
    totalBike +
    totalBus +
    totalPlane +
    totalFuel +
    totalExtras;

  const totalRevenue = pricePerPerson * participants * safeDays(days);

  let tva = 0,
    tvaRate = 0;
  if (tvaFr) {
    tvaRate = 0.2;
    tva = totalRevenue * tvaRate;
  } else if (tvaUk) {
    tvaRate = 0.05;
    tva = totalRevenue * tvaRate;
  }
  const totalRevenueTTC = totalRevenue + tva;
  const margin = totalRevenue - totalCost;
  const costPerPersonPerDay = totalCost / (participants * safeDays(days));

  return (
    <div className="w-full min-w-5xl mx-auto p-4 sm:p-8 bg-white/95 rounded-2xl shadow-xl border border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne gauche */}
        <div className="space-y-3">
          <div className="flex items-center justify-between w-full bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 hover:border-[#dcc5a2]">
            <div className="flex items-center gap-2 ">
              <Euro size={22} className="text-[#bd9254]" />
              <span className="text-sm  text-gray-700">
                Prix facturé au client (€) / jour
              </span>
            </div>
            <input
              type="number"
              min={0}
              value={pricePerPerson}
              onChange={(e) => setPricePerPerson(Number(e.target.value))}
              className="px-2 py-1 rounded bg-white border border-gray-300 text-right w-28 font-semibold text-md focus:outline-none focus:ring-1 focus:ring-[#bd9254]/60 transition"
            />
          </div>

          <div className="flex gap-4">
            <LabelledInput
              icon={<Users size={20} className="text-[#bd9254]" />}
              label="Participants"
              value={participants}
              setValue={setParticipants}
              min={1}
              className="flex-1 min-w-0"
            />
            <LabelledInput
              icon={<Calendar size={20} className="text-[#bd9254]" />}
              label="Jours"
              value={days}
              setValue={setDays}
              min={1}
              className="flex-1 min-w-0"
            />
          </div>
          <div className="flex gap-4">
            <LabelledInput
              icon={<Euro size={20} className="text-[#bd9254]" />}
              label="Logement (€) / pers/jour"
              value={costLodging}
              setValue={setCostLodging}
              min={0}
              className="flex-1 min-w-0"
            />
            <LabelledInput
              icon={<Euro size={20} className="text-[#bd9254]" />}
              label="Repas (€) / pers/jour"
              value={costMeals}
              setValue={setCostMeals}
              min={0}
              className="flex-1 min-w-0"
            />
          </div>
          <div className="flex gap-4">
            <LabelledInput
              icon={<Fuel size={20} className="text-[#bd9254]" />}
              label="Essence (€) / pers/jour"
              value={costFuel}
              setValue={setCostFuel}
              min={0}
              className="flex-1 min-w-0"
            />
            <LabelledInput
              icon={<GlassWater size={20} className="text-[#bd9254]" />}
              label="Vin (€) / séjour"
              value={costWine}
              setValue={setCostWine}
              min={0}
              className="flex-1 min-w-0"
            />
          </div>
          <div className="flex gap-4">
            <LabelledInput
              icon={<Plane size={20} className="text-[#bd9254]" />}
              label="Transport Avion (€) / séjour"
              value={costPlane}
              setValue={setCostPlane}
              min={0}
              className="flex-1 min-w-0"
            />
            <LabelledInput
              icon={<Briefcase size={20} className="text-[#bd9254]" />}
              label="Organisation (€) / jour"
              value={costOrg}
              setValue={setCostOrg}
              min={0}
              className="flex-1 min-w-0"
            />
          </div>
          <div className="flex gap-4 items-center mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={tvaFr}
                onChange={() => {
                  setTvaFr((v) => !v);
                  if (!tvaFr) setTvaUk(false);
                }}
                className="accent-[#bd9254] w-4 h-4"
              />
              <Percent size={18} className="text-[#bd9254]" />
              <span className="text-sm text-gray-700">TVA française (20%)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={tvaUk}
                onChange={() => {
                  setTvaUk((v) => !v);
                  if (!tvaUk) setTvaFr(false);
                }}
                className="accent-[#bd9254] w-4 h-4"
              />
              <Percent size={18} className="text-[#bd9254]" />
              <span className="text-sm text-gray-700">TVA UK (5%)</span>
            </label>
          </div>
          {/* Résultats */}
          <div className="mt-6 bg-gray-50 rounded-xl p-5 text-gray-800 space-y-2 shadow-inner uppercase italic text-sm">
            <ResultLine label="Coût total (hors TVA)" value={totalCost} />
            <ResultLine
              label="Chiffre d'affaires (hors TVA)"
              value={totalRevenue}
            />
            {tvaRate > 0 && (
              <>
                <ResultLine
                  label={`TVA ${tvaFr ? "FR" : "UK"} (${tvaRate * 100}%)`}
                  value={tva}
                />
                <ResultLine
                  label="Total TTC "
                  value={totalRevenueTTC}
                />
              </>
            )}
            <div className="flex items-center mt-3 text-sm font-light">
              <span className="mr-2">Marge brute totale :</span>
              <span className={margin >= 0 ? "text-green-700" : "text-red-600"}>
                {margin.toLocaleString("fr-FR")} €
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Marge par personne/jour :{" "}
              <span
                className={
                  pricePerPerson - costPerPersonPerDay >= 0
                    ? "text-green-700"
                    : "text-red-600"
                }
              >
                {(pricePerPerson - costPerPersonPerDay).toFixed(2)} €
              </span>
            </div>
          </div>
        </div>
        {/* Colonne droite */}
        <div className="flex flex-col gap-3">
          <InputWithFreq
            icon={<Bus size={20} className="text-[#bd9254]" />}
            label="Transport Bus (€) / trajet"
            value={costBus}
            setValue={setCostBus}
            freq={freqBus}
            setFreq={setFreqBus}
            max={days + 1}
          />
          <InputWithFreq
            icon={<Star size={20} className="text-[#bd9254]" />}
            label="Guide (€) / jour"
            value={costGuide}
            setValue={setCostGuide}
            freq={freqGuide}
            setFreq={setFreqGuide}
            max={days}
          />
          <InputWithFreq
            icon={<ChefHat size={20} className="text-[#bd9254]" />}
            label="Chef (€) / jour"
            value={costChef}
            setValue={setCostChef}
            freq={freqChef}
            setFreq={setFreqChef}
            max={days}
          />
          <InputWithFreq
            icon={<Heart size={20} className="text-[#bd9254]" />}
            label="Yoga (€) / jour"
            value={costYoga}
            setValue={setCostYoga}
            freq={freqYoga}
            setFreq={setFreqYoga}
            max={days}
          />
          <InputWithFreq
            icon={<Heart size={20} className="text-[#bd9254]" />}
            label="Qi Gong (€) / jour"
            value={costQiGong}
            setValue={setCostQiGong}
            freq={freqQiGong}
            setFreq={setFreqQiGong}
            max={days}
          />
          <InputWithFreq
            icon={<Euro size={20} className="text-[#bd9254]" />}
            label="Extras (€) / jour"
            value={costExtras}
            setValue={setCostExtras}
            freq={freqExtras}
            setFreq={setFreqExtras}
            max={days}
          />
          <InputWithFreq
            icon={<Euro size={20} className="text-[#bd9254]" />}
            label="Autres activités (€) / pers"
            value={costActivities}
            setValue={setCostActivities}
            freq={freqActivities}
            setFreq={setFreqActivities}
            max={days}
          />
          <InputWithFreq
            icon={<Sailboat size={20} className="text-[#bd9254]" />}
            label="Canyoning (€) / pers"
            value={costCanyoning}
            setValue={setCostCanyoning}
            freq={freqCanyoning}
            setFreq={setFreqCanyoning}
            max={days}
          />
          <InputWithFreq
            icon={<Bird size={20} className="text-[#bd9254]" />}
            label="Parapente (€) / pers"
            value={costParagliding}
            setValue={setCostParagliding}
            freq={freqParagliding}
            setFreq={setFreqParagliding}
            max={days}
          />
          <InputWithFreq
            icon={<Bike size={20} className="text-[#bd9254]" />}
            label="Vélo (€) / pers"
            value={costBike}
            setValue={setCostBike}
            freq={freqBike}
            setFreq={setFreqBike}
            max={days}
          />
        </div>
      </div>
    </div>
  );
}

function LabelledInput({ icon, label, value, setValue, min, className = "" }) {
  return (
    <label
      className={`flex gap-2 bg-gray-50 rounded-lg px-2 py-1 border border-gray-200 focus-within:ring-2 ring-[#bd9254]/40 transition items-center ${className}`}
    >
      <span>{icon}</span>
      <span className="text-xs font-medium text-gray-600 w-44">{label}</span>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="ml-2 px-2 py-1 rounded bg-white border border-gray-300 text-right w-20 focus:outline-none focus:ring-2 focus:ring-[#bd9254]/60 transition "
      />
    </label>
  );
}
function SelectFrequency({ label, value, setValue, max, className = "" }) {
  return (
    <label
      className={`flex gap-2 bg-gray-50 rounded-lg px-2 py-1 border border-dashed border-gray-200 items-center ${className}`}
    >
      <span
        className="text-xs text-gray-500"
        title="Nombre de jours où l'activité a lieu"
      >
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="ml-2 px-2 py-1 rounded border border-gray-300 bg-white text-gray-700 text-xs focus:outline-none h-full"
        style={{ minWidth: "3rem" }}
      >
        {Array.from({ length: max }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </label>
  );
}
function ResultLine({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm text-gray-600">
      <span>{label} :</span>
      <span className="font-semibold">{value.toLocaleString("fr-FR")} €</span>
    </div>
  );
}
function InputWithFreq({ icon, label, value, setValue, freq, setFreq, max }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <LabelledInput
        icon={icon}
        label={label}
        value={value}
        setValue={setValue}
        min={0}
        className="flex-1"
      />
      <SelectFrequency
        label="Récurrence"
        value={freq}
        setValue={setFreq}
        max={max}
      />
    </div>
  );
}

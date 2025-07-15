"use client";
import { useState, useMemo } from "react";
import { Listbox } from "@headlessui/react";
import DatePicker from "react-datepicker";
import { FiChevronDown, FiCalendar, FiXCircle } from "react-icons/fi";
import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";

// Utilitaire pour extraire valeurs uniques d'un champ
function getUnique(list, key) {
  return [...new Set(list.map((item) => (item[key] || "").trim()).filter(Boolean))];
}

// Select stylé Headless UI avec z-index sur Options
function SelectCustom({ value, onChange, options, label }) {
  return (
    <div className="relative z-0 w-full group">
      <Listbox value={value} onChange={onChange}>
        <Listbox.Label className="block mb-0.5 focus:outline-nonetext-xs font-bold text-[#364054]">{label}</Listbox.Label>
        <div className="relative">
          <Listbox.Button className="w-full py-1  pl-3 pr-8 text-left bg-transparent border-b border-[#a7afbe] focus:outline-none focus:border-pink-400 text-xs cursor-pointer rounded-none">
            {value || <span className="text-gray-400">{label}</span>}
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FiChevronDown className="text-pink-400" size={16} />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 w-full focus:outline-none bg-white border border-gray-100 rounded-xl shadow-lg max-h-56 py-1 z-[99] text-xs">
            <Listbox.Option value="" className={({ active }) =>
              `cursor-pointer select-none relative  focus:outline-none px-4 py-2 rounded-xl ${active ? "bg-white text-pink-400" : "text-gray-900"}`
            }>
              {label}
            </Listbox.Option>
            {options.map((option) => (
              <Listbox.Option key={option} value={option} className={({ active }) =>
                `cursor-pointer select-none relative focus:outline-none px-4 py-2 rounded-xl ${active ? "bg-white text-pink-400" : "text-gray-900"}`
              }>
                {option}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}

export function FiltreSejours({ sejours, onChange, className = "" }) {
  const sports = useMemo(() => getUnique(sejours, "sport"), [sejours]);
  const destinations = useMemo(() => getUnique(sejours, "destination"), [sejours]);
  const niveaux = useMemo(() => getUnique(sejours, "niveau"), [sejours]);

  const [filters, setFilters] = useState({
    dateDebut: "",
    sport: "",
    destination: "",
    niveau: "",
  });

  const selectedDate = filters.dateDebut ? new Date(filters.dateDebut) : null;

  function updateFilter(key, val) {
    const newFilters = { ...filters, [key]: val };
    setFilters(newFilters);
    onChange?.(newFilters);
  }

  function handleDateChange(date) {
    const val = date ? date.toISOString().substring(0, 10) : "";
    updateFilter("dateDebut", val);
  }

  function handleReset(e) {
    e.preventDefault();
    const empty = { dateDebut: "", sport: "", destination: "", niveau: "" };
    setFilters(empty);
    onChange?.(empty);
  }

  return (
    <form
      className={`relative z-[99] w-full mx-auto mb-2 bg-white p-3 md:p-4 shadow-md rounded-2xl text-xs ${className}`}
      autoComplete="off"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 items-end">
        {/* Date de début */}
        <div className="relative z-0 w-full group">
          <label className="block mb-0.5 text-xs font-bold text-[#364054]">Date de début</label>
          <div className="relative flex items-center">
            <DatePicker
              locale={fr}
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="date de début"
              className="block py-1 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b border-[#a7afbe] focus:outline-none focus:ring-0 focus:border-pink-400 rounded-none pr-8"
              calendarClassName="rounded-xl shadow-lg border z-[99] text-xs"
              popperClassName="z-[99]"
              wrapperClassName="w-full"
              todayButton="Aujourd'hui"
              isClearable
              autoComplete="off"
            />
            <FiCalendar className="absolute right-2 text-pink-400 pointer-events-none" size={18} />
          </div>
        </div>
        {/* Sport */}
        <SelectCustom
          value={filters.sport}
          onChange={(val) => updateFilter("sport", val)}
          options={sports}
          label="Sport"
        />
        {/* Destination */}
        <SelectCustom
          value={filters.destination}
          onChange={(val) => updateFilter("destination", val)}
          options={destinations}
          label="Destination"
        />
        {/* Niveau */}
        <SelectCustom
          value={filters.niveau}
          onChange={(val) => updateFilter("niveau", val)}
          options={niveaux}
          label="Niveau"
        />
        {/* Bouton Reset */}
        <div className="flex justify-end w-full xl:w-auto">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 border-1 border-pink-500 text-pink-500 hover:bg-pink-700 hover:text-white font-bold px-3 py-1 rounded-2xl transition shadow-sm w-full xl:w-auto mt-2 xl:mt-0 text-xs"
            style={{ minHeight: 36 }}
          >
            <FiXCircle size={16} />
            Réinitialiser
          </button>
        </div>
      </div>
    </form>
  );
}

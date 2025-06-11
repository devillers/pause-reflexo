"use client";

import React from "react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

export default function StatCard({ label, icon, value, change, direction }) {
  const isPositive = direction === "up";

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm w-full h-full">
      {/* Icône + label */}
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-gray-100 rounded-xl p-3">
          <div className="text-gray-600 text-xl">{icon}</div>
        </div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
      </div>

      {/* Valeur principale */}
      <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{value}</h2>

      {/* Badge de variation */}
      {change !== undefined && (
        <div className="flex justify-end mt-4">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 
              ${isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
          >
            {isPositive ? (
              <FiArrowUpRight className="w-4 h-4" />
            ) : (
              <FiArrowDownRight className="w-4 h-4" />
            )}
            {change}
          </span>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { MdPeople, MdEvent, MdMessage, MdPayments } from "react-icons/md";
import { FaBlog, FaSpa } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import StatCard from "../components/StatCard";

export default function DashboardPage() {
  // on initialise avec 0 ou une valeur par défaut
  const [stats, setStats] = useState({
    usersCount: 0,
    postsCount: 0,
    soinsCount: 0,
    messagesCount: 0,
    appointments: 0, // à remplacer par votre source réelle
    stripe: 0, // idem
  });
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard/stats");
        if (!res.ok) throw new Error(`Stat fetch failed: ${res.status}`);
        const data = await res.json();
        // on ne remplace que les clés existantes, on conserve appointments et stripe
        setStats((prev) => ({
          ...prev,
          usersCount: data.usersCount,
          postsCount: data.postsCount,
          soinsCount: data.soinsCount,
          messagesCount: data.messagesCount,
        }));
      } catch (err) {
        console.error("Erreur récupération stats :", err);
      }
    }
    fetchStats();
  }, []);

  return (
    <main className="p-2 max-w-5xl mx-auto">
      <h1 className="text-3xl font-thin mb-6">Dashboard</h1>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<MdPeople />}
          label="Utilisateurs"
          value={stats.usersCount}
        />
        <StatCard
          icon={<FaBlog />}
          label="Articles"
          value={stats.postsCount}
          change="11.01%"
          direction="up"
        />
        <StatCard
          icon={<FaSpa />}
          label="Soins"
          value={stats.soinsCount}
          change="11.01%"
          direction="up"
        />
        <StatCard
          icon={<MdEvent />}
          label="Rendez-vous"
          value={stats.appointments}
          change="11.01%"
          direction="up"
        />
        <StatCard
          icon={<MdMessage />}
          label="Messages"
          value={stats.messagesCount}
          change="11.01%"
          direction="up"
        />
        <StatCard
          icon={<MdPayments />}
          label="Transactions Stripe"
          value={stats.stripe}
          change="30.01%"
          direction="up"
        />
      </div>

      {/* <div className="grid grid-cols-1 lg:col-span-3  gap-4 mt-10">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-thin mb-4">Calendrier</h2>
          <Calendar onChange={setDate} value={date} />
        </div>
      </div> */}
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { MdPeople, MdEvent, MdMessage, MdPayments } from "react-icons/md";
import { FaBlog, FaSpa } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import StatCard from "../components/StatCard";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    users: 2,
    posts: 4,
    soins: 12,
    appointments: 12,
    messages: 12,
    stripe: 300,
  });
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      setStats(data);
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
          value={stats.users}
         
        />
        <StatCard icon={<FaBlog />} label="Articles" value={stats.posts}  change="11.01%"
          direction="up"/>
        <StatCard icon={<FaSpa />} label="Soins" value={stats.soins} change="11.01%"
          direction="up" />
        <StatCard
          icon={<MdEvent />}
          label="Rendez-vous"
          value={stats.appointments}  change="11.01%"
          direction="up"
        />
        <StatCard
          icon={<MdMessage />}
          label="Messages"
          value={stats.messages}  change="11.01%"
          direction="up"
        />
        <StatCard
          icon={<MdPayments />}
          label="Transactions Stripe"
          value={stats.stripe}  change="30.01%"
          direction="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
        {/* Calendrier */}
        <div className="bg-white p-6 rounded-lg shadow flex-1/3">
          <h2 className="text-xl font-thin mb-4">Calendrier</h2>
          <Calendar onChange={setDate} value={date} />
        </div>

        {/* Bloc Google Analytics */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h2 className="text-xl font-thin mb-4">Google Analytics</h2>
          <p className="text-gray-600">À connecter via Google API...</p>
        </div>
      </div>
    </main>
  );
}

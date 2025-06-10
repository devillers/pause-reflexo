"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import {
  FiMenu,
  FiX,
  FiFileText,
  FiPlus,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(true);

  const isAdmin = session?.user?.role === "admin";

  return (
    <motion.div
      animate={{ width: open ? 240 : 64 }}
      className="bg-[#212b37] shadow-sm flex flex-col min-h-screen transition-all duration-300"
    >
      {/* Top header */}
      <div
        className={`flex items-center p-4 ${
          open ? "justify-between" : "justify-center"
        }`}
      >
        {open && <span className="font-thin uppercase text-white">Admin</span>}
        <button onClick={() => setOpen(!open)} className="text-white">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Navigation */}
      <nav
        className={`flex flex-col mt-4 space-y-2 uppercase font-thin text-white text-[13px] ${
          open ? "items-start pl-2" : "items-center"
        }`}
      >

         <SidebarLink
          icon={<MdDashboard />}
          label="Dashboard"
          href="/admin"
          open={open}
        />
        <SidebarLink
          icon={<FiFileText />}
          label="Posts"
          href="/admin/posts"
          open={open}
        />
        <SidebarLink
          icon={<FiPlus />}
          label="Nouveau post"
          href="/admin/posts/new"
          open={open}
        />
        <SidebarLink
          icon={<FiFileText />}
          label="Soins"
          href="/admin/soins"
          open={open}
        />

        <SidebarLink
          icon={<FiPlus />}
          label="Nouveau soin"
          href="/admin/soins/new"
          open={open}
        />
        {/* {isAdmin && (
          <SidebarLink
            icon={<FiSettings />}
            label="Paramètres"
            href="/admin/settings"
            open={open}
          />
        )} */}
        <SidebarLink
          icon={<FiFileText />}
          label="Retour au site"
          href="/"
          open={open}
        />
      </nav>

      {/* Déconnexion */}
      <div
        className={`mt-auto mb-4 px-4 ${open ? "text-left" : "text-center"}`}
      >
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-red-300 text-sm flex items-center gap-2 hover:underline"
        >
          <FiLogOut />
          {open && <span>Déconnexion</span>}
        </button>
      </div>
    </motion.div>
  );
}

function SidebarLink({ icon, label, href, open }) {
  return (
    <Link
      href={href}
      className={`
        flex items-center w-full transition-colors
        px-4 py-3 text-white hover:bg-[#181f27]
        ${open ? "justify-start" : "justify-center"}
      `}
    >
      <span>{icon}</span>
      {open && <span className="ml-4">{label}</span>}
    </Link>
  );
}

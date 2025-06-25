// components/SideBar.jsx
"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { FiChevronDown, FiChevronRight } from "react-icons/fi";

import Link from "next/link";

import { MdDashboard } from "react-icons/md";
import { TbMassage } from "react-icons/tb";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import {
  FiMenu,
  FiX,
  FiFileText,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar() {
  const [showFrontendLinks, setShowFrontendLinks] = useState(false);
  const { data: session } = useSession();
  // ← passer false pour que la sidebar soit fermée au départ
  const [open, setOpen] = useState(false);
  const isAdmin = session?.user?.role === "admin";
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const [settingsLinks, setSettingsLinks] = useState([]);

useEffect(() => {
  if (!open || !showFrontendLinks) return;

  fetch("/api/admin/settings-pages")
    .then((res) => res.json())
    .then((json) => {
      if (Array.isArray(json)) {
        setSettingsLinks(json);
      } else {
        console.error("❌ Données invalides reçues pour settings-pages :", json);
        setSettingsLinks([]); // pour éviter le crash
      }
    })
    .catch((err) => {
      console.error("Erreur chargement menu settings", err);
      setSettingsLinks([]);
    });
}, [open, showFrontendLinks]);


  return (
    <motion.div
      animate={{ width: open ? 240 : 64 }}
      className="bg-[#212b37] shadow-sm flex flex-col min-h-screen transition-all duration-300"
    >
      {/* Header */}
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

      {/* Nav */}
      <nav
        className={`flex flex-col mt-4 space-y-2 uppercase font-thin text-white text-[13px] ${
          open ? "items-start pl-2" : "items-center"
        }`}
      >
        <SidebarLink
          icon={<MdDashboard className="text-[17px]" />}
          label="Dashboard"
          href="/admin"
          open={open}
        />
        <SidebarLink
          icon={<FiFileText className="text-[17px]" />}
          label="Posts"
          href="/admin/posts"
          open={open}
        />
        <SidebarLink
          icon={<TbMassage className="text-[17px]" />}
          label="Soins"
          href="/admin/soins"
          open={open}
        />
        <SidebarLink
          icon={<CiBookmark className="text-[17px]" />}
          label="All posts"
          href="/admin/allPosts"
          open={open}
        />

        {isAdmin && (
          <SidebarLink
            icon={<FiUsers className="text-[17px]" />}
            label="Utilisateurs"
            href="/admin/users"
            open={open}
          />
        )}
        {isAdmin && (
          <SidebarLink
            icon={<MdOutlineMailOutline className="text-[17px]" />}
            label="Emails"
            href="/admin/emails"
            open={open}
          />
        )}
        {isAdmin && (
          <SidebarLink
            icon={<SiGoogleanalytics className="text-[17px]" />}
            label="Analytics"
            href="/admin/analytics"
            open={open}
          />
        )}
        {isAdmin && (
          <div className="w-full">
            <button
              onClick={() => setShowFrontendLinks((prev) => !prev)}
              className={`
            flex items-center w-full px-4 py-3 text-white hover:bg-[#181f27]
            ${open ? "justify-start" : "justify-center"}
          `}
            >
              <FiSettings className="text-[17px]" />
              {open && (
                <>
                  <span className="ml-4 uppercase">Settings</span>
                  <span className="ml-auto mr-2">
                    {showFrontendLinks ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                </>
              )}
            </button>

            {/* Sous-menu frontend dépliable */}
            {open && showFrontendLinks && (
              <div className="ml-15 mt-1 space-y-1">
                {settingsLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block text-xs text-white px-4 py-3  hover:bg-[#181f27] "
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        <SidebarLink
          icon={<FiFileText className="text-[17px]" />}
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
          onClick={handleSignOut}
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

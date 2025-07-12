"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import menuItems from "../../data/menuItems";

export default function MegaMenu() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [progress, setProgress] = useState(0);

  const progressInterval = useRef(null);
  const menuContainerRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const activeSubmenu = menuItems.find((m) => m.title === activeMenu)?.submenu;
  const colCount = activeSubmenu?.length ?? 0;
  const gridCols = colCount > 5 ? "grid-cols-5" : `grid-cols-${colCount}`;

  const startProgress = () => {
    clearInterval(progressInterval.current);
    setProgress(0);
    progressInterval.current = setInterval(() => {
      setProgress((p) =>
        p + Math.random() * 10 < 90 ? p + Math.random() * 10 : 90
      );
    }, 200);
  };

  const completeProgress = () => {
    clearInterval(progressInterval.current);
    setProgress(100);
    setTimeout(() => setProgress(0), 300);
  };

  const navigate = (href, delay = 0) => {
    startProgress();
    setActiveMenu(null);
    setMobileOpen(false);
    setTimeout(() => router.push(href), delay);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // >10px = considéré "scrolled"
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    completeProgress();
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
   <header
      className={
        `fixed top-0 left-0 w-full z-50 transition-colors duration-300 
        ${scrolled ? 'bg-white/10 shadow-md backdrop-blur' : 'bg-transparent'}`
      }
    >
      <AnimatePresence>
        {progress > 0 && (
          <motion.div
            key="progress"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            exit={{ width: 0 }}
            transition={{ ease: "linear", duration: 0.2 }}
            className="fixed top-0 left-0 h-1 bg-red-500 z-[100]"
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a
            className="text-[30px] lg:text-[20px] italic font-extrabold uppercase text-white hover:text-orange-500"
            href="/"
          >
            Pause Reflexo
          </a>
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden  lg:flex justify-center flex-1">
          <nav className="flex gap-8 items-center">
            {menuItems.map((item, i) => (
              <div
                key={i}
                className="relative group flex items-center gap-1"
                onMouseEnter={() => {
                  if (window.innerWidth >= 1200 && item.submenu) {
                    // <= CORRIGÉ
                    clearTimeout(closeTimeoutRef.current);
                    setActiveMenu(item.title);
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth >= 1200 && item.submenu) {
                    // <= CORRIGÉ
                    closeTimeoutRef.current = setTimeout(
                      () => setActiveMenu(null),
                      500
                    );
                  }
                }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                    }}
                    className={`
                      flex items-center gap-2 text-[20px] uppercase font-extrabold leading-4 hover:text-orange-500
                      ${
                        pathname === item.href ? "text-white" : "text-[#293d4c]"
                      }
                    `}
                  >
                    {item.icon && (
                      <item.icon className="w-4 h-4 text-orange-500" />
                    )}
                    <span>{item.title}</span>
                  </a>
                ) : (
                  <button
                    onClick={() =>
                      setActiveMenu(
                        activeMenu === item.title ? null : item.title
                      )
                    }
                    className="flex items-center gap-2 text-[11px] uppercase leading-4 text-[#293d4c] hover:text-[#009992]"
                  >
                    {item.icon && (
                      <item.icon className="w-4 h-4 text-[#009992]" />
                    )}
                    <span>{item.title}</span>
                  </button>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* BURGER ICON MOBILE */}
        {!mobileOpen && (
          <div className=" lg:hidden p-6">
            <button onClick={() => setMobileOpen(true)}>
              <Menu size={34} color="white" />
            </button>
          </div>
        )}
      </div>

      {/* SOUS-MENU DESKTOP */}
      <AnimatePresence>
        {activeMenu && activeSubmenu && (
          <motion.div
            ref={menuContainerRef}
            onMouseEnter={() => clearTimeout(closeTimeoutRef.current)}
            onMouseLeave={() =>
              (closeTimeoutRef.current = setTimeout(
                () => setActiveMenu(null),
                500
              ))
            }
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white shadow-sm overflow-hidden py-6"
          >
            <div className="max-w-7xl mx-auto px-4">
              <div
                className={`grid ${gridCols} gap-6 text-[10px] text-[#293d4c]`}
              >
                {activeSubmenu.map((col, idx) => (
                  <div key={idx}>
                    {col.title && (
                      <div className="text-[12px] mb-2 text-[#009992] select-none">
                        {col.title}
                      </div>
                    )}
                    <ul className="space-y-1">
                      {col.items?.filter(Boolean).map((subItem, j) => (
                        <li key={j}>
                          <a
                            href={subItem.href}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(subItem.href);
                            }}
                            className="block w-full text-[10px] uppercase hover:text-[#009992]"
                          >
                            {subItem.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.5 }}
              className="fixed top-0 right-0 lg:w-2/5 w-3/5 h-full bg-white/30 shadow-lg z-50"
            >
              <div className="flex justify-end p-8">
                <button onClick={() => setMobileOpen(false)}>
                  <X size={34} color="white" />
                </button>
              </div>
              <nav className="flex flex-col space-y-4 px-4 mt-20 pb-6">
                {menuItems.map((item, i) => (
                  <div key={i}>
                    <button
                      onClick={() =>
                        item.href
                          ? navigate(item.href, 500)
                          : setActiveMenu(
                              activeMenu === item.title ? null : item.title
                            )
                      }
                      className="flex items-center gap-2 font-bold uppercase text-3xl mb-3 cursor-pointer text-white hover:text-orange-500 hover:italic hover:bg-white/80 rounded p-2 text-left w-full"
                    >
                      {item.icon && (
                        <item.icon className="w-4 h-4 text-white" />
                      )}
                      <span>{item.title}</span>
                    </button>
                    {activeMenu === item.title && item.submenu && (
                      <div className="grid grid-cols-2 gap-4 pl-4">
                        {item.submenu.map((col, idx) => (
                          <div key={idx}>
                            {col.title && (
                              <div className="text-sm mb-1 font-thin text-[#009992] uppercase">
                                {col.title}
                              </div>
                            )}
                            <ul className="space-y-1">
                              {col.items.filter(Boolean).map((subItem, j) => (
                                <li key={j}>
                                  <button
                                    onClick={() => navigate(subItem.href, 500)}
                                    className="text-[10px] uppercase text-white hover:text-black hover:bg-[#009992]/80 block leading-7 text-left w-full"
                                  >
                                    {subItem.title}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

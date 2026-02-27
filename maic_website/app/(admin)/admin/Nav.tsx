"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Helper function for active link styling
  const getLinkClass = (href: string) =>
    `text-lg font-kode font-medium transition ${
      pathname === href ? "text-purple-400 font-bold" : "hover:text-purple-400"
    }`;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between py-3 px-6 border-b border-neutral-700 text-white text-sm bg-black relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <a href="/">
          <img src="/logo.jpg" alt="MAIC Logo" className="h-12 w-12" />
        </a>
        <a href="/">
          <span className="font-kode font-bold tracking-wide text-sm md:text-lg">
            Manchester AI Club
          </span>
        </a>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        <a href="/admin/announcements" className={getLinkClass("/admin/announcements")}>
          Announcements
        </a>
        <a href="/admin/committee" className={getLinkClass("/admin/committee")}>
          Committee
        </a>
        <a href="/admin/events" className={getLinkClass("/admin/events")}>
          Events
        </a>
        <a href="/admin/projects" className={getLinkClass("/admin/projects")}>
          Projects
        </a>
      </div>

      {/* Mobile Burger */}
      <button
        className="md:hidden flex flex-col gap-1.5 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
      </button>

      {/* Mobile Slide-Out Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-neutral-900 z-50 p-6 flex flex-col gap-6 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <img src="/logo.jpg" className="h-10 w-10" />
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-2xl cursor-pointer hover:text-purple-300 transition"
          >
            ✕
          </button>
        </div>

        <a
          href="/admin/announcements"
          onClick={() => setIsOpen(false)}
          className={getLinkClass("/admin/announcements") + " text-base"}
        >
          Announcements
        </a>

        <a
          href="/admin/committee"
          onClick={() => setIsOpen(false)}
          className={getLinkClass("/admin/committee") + " text-base"}
        >
          Committee
        </a>

        <a
          href="/admin/events"
          onClick={() => setIsOpen(false)}
          className={getLinkClass("/admin/events") + " text-base"}
        >
          Events
        </a>

        <a
          href="/admin/projects"
          onClick={() => setIsOpen(false)}
          className={getLinkClass("/admin/projects") + " text-base"}
        >
          Projects
        </a>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
}
"use client";

import React, { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnnouncements, setShowAnnouncements] = useState(false);

  return (
    <nav className="flex items-center justify-between py-3 px-6 border-b border-neutral-700 text-white text-sm bg-black relative">
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
        <button
          type="button"
          className="text-lg font-kode hover:text-white transition bg-purple-400 px-3 py-1 rounded-lg text-black font-bold cursor-pointer"
          onClick={() => setShowAnnouncements(true)}
        >
          Announcements
        </button>
        <a
          href="/about"
          className="text-lg font-kode font-medium hover:text-purple-400 transition"
        >
          About Us
        </a>
        <a
          href="/projects"
          className="text-lg font-kode font-medium hover:text-purple-400 transition"
        >
          Projects
        </a>
        <a
          href="/events"
          className="text-lg font-kode font-medium hover:text-purple-400 transition"
        >
          Events
        </a>
        <a
          href="https://manchesterstudentsunion.com/activities/view/Manchester_AI_Club"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-kode font-medium flex items-center gap-1 hover:text-purple-400 transition"
        >
          SU
          <svg
            width="14"
            height="14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block"
          >
            <path
              d="M3 11L11 3M11 3H5M11 3V9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* Menu Icon (Mobile)*/}
      <button
        className="md:hidden flex flex-col gap-1.5 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
      </button>

      {/* Mobile Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-neutral-900 z-50 p-6 flex flex-col gap-6 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <img src="/logo.jpg" alt="MAIC Logo" className="h-10 w-10" />
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-2xl leading-none"
          >
            ✕
          </button>
        </div>
        <button
          type="button"
          className="text-base font-kode font-medium hover:text-purple-400 transition text-left"
          onClick={() => {
            setShowAnnouncements(true);
            setIsOpen(false);
          }}
        >
          Announcements
        </button>
        <a
          href="/about"
          className="text-base font-kode font-medium hover:text-purple-400 transition"
          onClick={() => setIsOpen(false)}
        >
          About Us
        </a>
        <a
          href="/projects"
          className="text-base font-kode font-medium hover:text-purple-400 transition"
          onClick={() => setIsOpen(false)}
        >
          Projects
        </a>
        <a
          href="/events"
          className="text-base font-kode font-medium hover:text-purple-400 transition"
          onClick={() => setIsOpen(false)}
        >
          Events
        </a>
        <a
          href="https://manchesterstudentsunion.com/activities/view/Manchester_AI_Club"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-kode font-medium hover:text-purple-400 transition flex items-center gap-1"
          onClick={() => setIsOpen(false)}
        >
          SU
          <svg
            width="14"
            height="14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block"
          >
            <path
              d="M3 11L11 3M11 3H5M11 3V9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* Backdrop for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Announcements Modal */}
      {showAnnouncements && (
        <div className="fixed inset-0 flex items-center justify-center ">
          {/* Modal Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowAnnouncements(false)}
          ></div>
          {/* Modal Content */}
          <div className="w-[90%] max-w-sm  md:max-w-lg  lg:max-w-2xl relative bg-neutral-900 rounded-xl shadow-2xl p-8  mx-auto flex flex-col gap-6 border border-purple-400">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#C5A3FF] font-kode">
                Announcements 🔊
              </h2>
              <button
                onClick={() => setShowAnnouncements(false)}
                className="text-white text-2xl leading-none cursor-pointer"
                aria-label="Close announcements"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-neutral-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Placeholder Announcement 1
                </h3>
                <p className="text-sm text-neutral-300">
                  This is the first placeholder announcement. Details will go
                  here.
                </p>
              </div>
              <div className="bg-neutral-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Placeholder Announcement 2
                </h3>
                <p className="text-sm text-neutral-300">
                  This is the second placeholder announcement. More info coming
                  soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

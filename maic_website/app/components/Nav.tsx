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
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
            onClick={() => setShowAnnouncements(false)}
          ></div>

          {/* Modal Content */}
          <div
            className="relative w-[92%] max-w-sm md:max-w-lg lg:max-w-2xl 
                 bg-black rounded-2xl shadow-xl border border-purple-300/40 
                 p-6 md:p-8 mx-auto flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl lg:text-[2.2rem] font-bold text-purple-300 font-kode drop-shadow">
                Announcements 🔊
              </h2>

              <button
                onClick={() => setShowAnnouncements(false)}
                className="text-white text-2xl md:text-3xl lg:text-[2.2rem] hover:text-purple-300 transition cursor-pointer"
                aria-label="Close announcements"
              >
                ✕
              </button>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-300/40 to-transparent"></div>

            {/* Cards */}
            <div className="flex flex-col gap-5">
              {/* Announcement Card */}
              <div
                className="bg-neutral-900 border border-neutral-700/70 rounded-xl p-5 
                        shadow-lg hover:shadow-purple-300/20 transition-all duration-300 
                        hover:border-purple-300/40 group"
              >
                <h3 className="text-lg md:text-xl lg:text-[1.3rem] font-semibold text-white mb-2 font-mono">
                  Placeholder Announcement 1
                </h3>

                <p className="font-mono text-sm md:text-base lg:text-[0.95rem] text-neutral-300 leading-relaxed mb-4">
                  This is the first placeholder announcement. Details will go
                  here.
                </p>

                <div className="flex justify-end">
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-medium bg-purple-300 text-black 
                         border border-purple-300 rounded-full 
                         text-xs md:text-sm lg:text-[0.8rem]
                         px-4 md:px-6 py-1 
                         transition-all duration-200 
                         hover:bg-purple-200 hover:border-purple-200 
                         hover:shadow-[0_0_10px_rgba(197,163,255,0.5)] hover:-translate-y-0.5 
                         cursor-pointer"
                  >
                    Brand
                  </a>
                </div>
              </div>

              {/* Announcement Card 2 */}
              <div
                className="bg-neutral-900 border border-neutral-700/70 rounded-xl p-5 
                        shadow-lg hover:shadow-purple-300/20 transition-all duration-300 
                        hover:border-purple-300/40 group"
              >
                <h3 className="text-lg md:text-xl lg:text-[1.3rem] font-semibold text-white mb-2 font-mono">
                  Placeholder Announcement 2
                </h3>

                <p className="font-mono text-sm md:text-base lg:text-[0.95rem] text-neutral-300 leading-relaxed mb-4">
                  This is the second placeholder announcement. Details will go
                  here.
                </p>

                <div className="flex justify-end">
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-medium bg-purple-300 text-black 
                         border border-purple-300 rounded-full 
                         text-xs md:text-sm lg:text-[0.8rem]
                         px-4 md:px-6 py-1 
                         transition-all duration-200 
                         hover:bg-purple-200 hover:border-purple-200 
                         hover:shadow-[0_0_10px_rgba(197,163,255,0.5)] hover:-translate-y-0.5 
                         cursor-pointer"
                  >
                    Brand
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

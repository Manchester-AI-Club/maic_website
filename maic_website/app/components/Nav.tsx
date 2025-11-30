"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname(); // get current path
  const [isOpen, setIsOpen] = useState(false);
  const [showAnnouncements, setShowAnnouncements] = useState(false);

  // Show announcements popup automatically on first visit to main page
  React.useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined") {
      // Only show once per session
      if (!window.sessionStorage.getItem("maic_announcements_shown")) {
        setShowAnnouncements(true);
        window.sessionStorage.setItem("maic_announcements_shown", "true");
      }
    }
  }, [pathname]);

  const announcement_cards = [
    {
      id: 1,
      title: "Placeholder Announcement 1",
      url: "https://example.com",
      url_text: "Apply Now!",
      desc: "Applications are now open for our new project. Click the link below to apply.",
    },
    {
      id: 2,
      title: "Placeholder Announcement 2",
      url: "https://example.com",
      url_text: "Buy Tickets!",
      desc: "Tickets are now available for our upcoming event. Click the link below to purchase.",
    },
    {
      id: 3,
      title: "Placeholder Announcement 3",
      url: "null",
      url_text: "null",
      desc: "Example of an announcement without a link.",
    },
  ];

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
        <button
          type="button"
          className="text-lg font-kode hover:text-white transition bg-purple-400 px-3 py-1 rounded-lg text-black font-bold cursor-pointer"
          onClick={() => setShowAnnouncements(true)}
        >
          Announcements
        </button>
        <a href="/about" className={getLinkClass("/about")}>
          About Us
        </a>
        <a href="/projects" className={getLinkClass("/projects")}>
          Projects
        </a>
        <a href="/events" className={getLinkClass("/events")}>
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

        <button
          className="text-lg font-kode hover:text-white transition bg-purple-400  py-0.5 rounded-lg text-black font-bold cursor-pointer"
          onClick={() => {
            setShowAnnouncements(true);
            setIsOpen(false);
          }}
        >
          Announcements
        </button>

        <a
          href="/about"
          onClick={() => setIsOpen(false)}
          className={getLinkClass("/about") + " text-base"}
        >
          About Us
        </a>
        <a
          href="/projects"
          onClick={() => setIsOpen(false)}
          className={getLinkClass("/projects") + " text-base"}
        >
          Projects
        </a>
        <a
          href="/events"
          onClick={() => setIsOpen(false)}
          className={getLinkClass("/events") + " text-base"}
        >
          Events
        </a>
        <a
          href="https://manchesterstudentsunion.com/activities/view/Manchester_AI_Club"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="text-base font-kode font-medium hover:text-purple-400 transition flex items-center gap-1"
        >
          SU
          <svg width="14" height="14" fill="none">
            <path
              d="M3 11L11 3M11 3H5M11 3V9"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </a>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Announcements Modal */}
      {showAnnouncements && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
            onClick={() => setShowAnnouncements(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-[92%] max-w-sm md:max-w-lg lg:max-w-2xl bg-black rounded-2xl shadow-xl border border-purple-300/40 p-0 mx-auto flex flex-col max-h-[80vh] overflow-hidden">
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-black pb-4 px-6 pt-6 md:px-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl lg:text-[2.2rem] font-bold text-purple-300 font-kode">
                  Announcements 🔊
                </h2>

                <button
                  onClick={() => setShowAnnouncements(false)}
                  className="text-white text-2xl md:text-3xl cursor-pointer hover:text-purple-300 transition"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-300/40 to-transparent mt-4"></div>

            {/* Scrollable Body */}
            <div className="announcement-scroll overflow-y-auto px-6 md:px-8 pb-8 pt-4">
              <div className="flex flex-col gap-5">
                {announcement_cards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-neutral-900 border border-neutral-700/70 rounded-xl p-5 shadow-lg hover:shadow-purple-300/20 transition-all duration-300 hover:border-purple-300/40"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 font-mono">
                      {card.title}
                    </h3>

                    <p className="font-mono text-sm md:text-base text-neutral-300 leading-relaxed mb-4">
                      {card.desc}
                    </p>

                    {card.url !== "null" && card.url_text !== "null" && (
                      <div className="flex justify-end">
                        <a
                          href={card.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono font-medium bg-purple-300 text-black border border-purple-300 rounded-full text-xs md:text-sm px-4 py-1 transition-all hover:bg-purple-200 hover:border-purple-200"
                        >
                          {card.url_text}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

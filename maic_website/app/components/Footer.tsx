import React from "react";
import { FaLinkedin, FaInstagram, FaDiscord } from "react-icons/fa";
import { TbBrandLinktree } from "react-icons/tb";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-700 py-4 md:py-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:block relative min-h-[150px]">
          {/* Navigation Links - Two Columns */}
          <div className="flex justify-center gap-80">
            {/* Left column */}
            <div className="flex flex-col gap-6 text-sm font-kode md:text-lg font-light">
              <a href="#about" className="hover:text-purple-400 transition">
                About Us
              </a>
              <a href="#projects" className="hover:text-purple-400 transition">
                Projects
              </a>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6 text-sm font-kode md:text-lg font-light">
              <a href="#events" className="hover:text-purple-400 transition">
                Events
              </a>
              <a
                href="https://manchesterstudentsunion.com/activities/view/Manchester_AI_Club"
                className="hover:text-purple-400 transition"
              >
                Students' Union
              </a>
            </div>
          </div>

          {/* Social Icons - Bottom Left */}
          <div className="text-gray-400 absolute bottom-0 left-0 flex gap-6 text-2xl pl-4">
            <a
              href="https://www.linkedin.com/company/manchester-artificial-intelligence-club/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-purple-400 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/manchesteraiclub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-purple-400 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#discord"
              aria-label="Discord"
              className="hover:text-purple-400 transition"
            >
              <FaDiscord />
            </a>
            <a
              href="https://linktr.ee/manchester_ai_club"
              aria-label="Linktree"
              className="hover:text-purple-400 transition"
            >
              <TbBrandLinktree />
            </a>
          </div>

          {/* Copyright - Bottom Center */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center text-sm font-kode font-medium md:text-md">
            Copyright © 2025 Manchester AI Club
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Navigation Links - Stacked */}
          <div className="flex flex-col gap-4 mb-8 text-sm pl-12">
            <a
              href="https://manchesterstudentsunion.com/activities/view/Manchester_AI_Club"
              className="hover:text-purple-400 transition font-kode"
            >
              Students' Union
            </a>
            <a
              href="#projects"
              className="hover:text-purple-400 transition font-kode"
            >
              Projects
            </a>
            <a
              href="#events"
              className="hover:text-purple-400 transition font-kode"
            >
              Events
            </a>
            <a
              href="#about"
              className="hover:text-purple-400 transition font-kode"
            >
              About Us
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center font-kode text-sm text-neutral-400">
            Copyright © 2025 Manchester AI Club
          </div>
        </div>
      </div>
    </footer>
  );
}

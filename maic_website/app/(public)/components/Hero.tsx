import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import MaicPolygonAnimation from "@/app/(public)/components/MaicPolygonAnimation";
import { FaLinkedin, FaInstagram, FaDiscord } from "react-icons/fa";
import { TbBrandLinktree } from "react-icons/tb";

export default function Hero() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Nav />
      <main className="min-h-screen flex-1 flex flex-col justify-between px-8 md:px-16 lg:px-24 py-12">
        <div className="w-full flex flex-col md:flex-row justify-between flex-1 items-stretch">
          {/* Left Section - Wider to fit heading on one line */}
          <div className="flex-[2] md:min-w-[60%] lg:max-w-[65%] flex flex-col justify-between md:mt-20">
            <div>
              <h1 className="font-kode font-bold text-2xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white from-10% to-[#791E94] to-80% bg-clip-text text-transparent mb-4 ">
                Learn. Build. Innovate. Together.
              </h1>
              <p className="mt-10 md:mt-15 text-neutral-300 text-lg md:text-xl font-mono max-w-lg">
                [Desc] Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Quisque ut gravida elit, ac porta nisi.
              </p>
            </div>

            {/* Social Icons - Bottom Left */}
            <div className="flex mt-10 gap-6  text-2xl md:text-3xl md:gap-10 lg:text-3xl lg:gap-10 md:mb-30">
              <a
                href="https://www.linkedin.com/company/manchester-artificial-intelligence-club/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-purple-400 transition text-white"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/manchesteraiclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-purple-400 transition text-white"
              >
                <FaInstagram />
              </a>
              <a
                href="#discord"
                aria-label="Discord"
                className="hover:text-purple-400 transition text-white"
              >
                <FaDiscord />
              </a>
              <a
                href="https://linktr.ee/manchester_ai_club"
                aria-label="Linktree"
                className="hover:text-purple-400 transition text-white"
              >
                <TbBrandLinktree />
              </a>
            </div>
          </div>

          {/* Right Section - Three.js Animation */}
          <div className="flex-1 flex items-center justify-center md:justify-end md:min-w-[40%]">
            <div className="w-full h-full flex items-center justify-center md:pl-6">
              <MaicPolygonAnimation />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { FaGithub } from "react-icons/fa";

interface Project {
  _id: string;
  title: string;
  image?: string;
  desc: string;
  url: string;
}

export default function Projects() {
  const [cards, setCards] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setCards(result.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Nav />
      <main className="flex flex-col items-center justify-start px-6 md:px-16 lg:px-24 py-12 gap-8 flex-1">
        <h1 className="text-center font-kode font-bold md:mt-10 text-2xl md:text-4xl lg:text-5xl bg-gradient-to-r from-white from-10% to-[#791E94] to-100% bg-clip-text text-transparent">
          Our Projects
        </h1>
        <p className="text-center text-neutral-300 text-sm md:text-lg font-mono md:max-w-4xl">
          [Brief about projects] Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Quisque ut gravida elit, ac porta nisi. Nulla a
          ligula vel enim ornare egestas in eget velit.
        </p>

        {/* Cards */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-neutral-400 text-lg font-mono">Loading projects...</p>
          </div>
        ) : cards.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-neutral-400 text-lg font-mono">No projects yet</p>
          </div>
        ) : (
        <div className="w-full flex justify-center">
          <div className="w-full max-w-6xl flex flex-col gap-8 my-10 px-2 sm:px-4">
            {cards.map((card) => (
              <div
                key={card._id}
                className=" w-full bg-[#0b0b0b] border border-[#2a2a2a] rounded-3xl shadow-[0_0_25px_#8249ff33] hover:shadow-[0_0_45px_#a473ff88] transition-all duration-500 hover:scale-[1.015] flex flex-col-reverse md:flex-row overflow-hidden "
              >
                {/* LEFT TEXT SECTION */}
                <div className="flex flex-col justify-between p-6 sm:p-8 flex-1 text-white">
                  <div>
                    <h2 className="text-[#C5A3FF] text-xl sm:text-2xl font-bold font-kode mb-3">
                      {card.title}
                    </h2>
                    <p className="text-neutral-300 text-sm sm:text-base font-mono leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="flex justify-end mt-4">
                    <a
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#C5A3FF] transition-colors"
                    >
                      <FaGithub size={28} />
                    </a>
                  </div>
                </div>

                {/* RIGHT IMAGE SECTION */}
                {card.image && (
                <div className="w-full md:w-[45%] h-[200px] md:h-auto relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    className=" absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300 "
                  />
                </div>
                )}
              </div>
            ))}
          </div>
        </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

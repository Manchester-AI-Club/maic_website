import React from "react";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  const cards = [
    {
      id: 1,
      title: "Project Name",
      image:
        "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
      desc: "[Project desc] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut gravida elit, ac porta nisi.",
      url: "https://github.com/project-link",
    },
    {
      id: 2,
      title: "Project Name",
      image:
        "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
      desc: "[Project desc] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut gravida elit, ac porta nisi.",
      url: "https://github.com/project-link",
    },
    {
      id: 3,
      title: "Project Name",
      image:
        "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
      desc: "[Project desc] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut gravida elit, ac porta nisi.",
      url: "https://github.com/project-link",
    },
  ];

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
        <div className="flex flex-col items-center w-full gap-8 my-10">
          {cards.map((card) => (
            <div
              key={card.id}
              className="w-full lg:w-4xl bg-[#0b0b0b] border border-[#2a2a2a] rounded-3xl shadow-[0_0_30px_#8e61ff33] hover:shadow-[0_0_40px_#b58cffaa] transition-all duration-500 hover:scale-[1.01] flex overflow-hidden min-h-[180px] max-h-[220px]"
            >
              {/* LEFT SECTION */}
              <div className="flex flex-col justify-between flex-1 p-6 md:p-8 font-mono text-white">
                <div>
                  <h2 className="text-[#C5A3FF] md:text-2xl font-bold mb-4">
                    {card.title}
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed text-neutral-200">
                    {card.desc}
                  </p>
                </div>
                <div className="flex justify-end mt-2">
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

              {/* RIGHT SECTION */}
              <div className="w-[45%] flex items-center justify-center">
                <div className=" rounded-lg overflow-hidden w-full aspect-[4/3] flex">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="pr-2 object-cover w-full h-full opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

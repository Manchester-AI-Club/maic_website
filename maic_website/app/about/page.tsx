"use client";

import React, { useState } from "react";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export default function AboutUs() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const committee_cards = [
    {
      id: 1,
      title: "Full Name",
      image:
        "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
      subtitle: "Committee Position",
      desc: "[Fun fact, desc] Lorem ipsum dolor sit amet. Etiam ut mauris sit amet velit egestas. ",
    },
    {
      id: 2,
      title: "Full Name",
      image:
        "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
      subtitle: "Committee Position",
      desc: "A brief description about the committee member.",
    },
    {
      id: 3,
      title: "Full Name",
      image:
        "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
      subtitle: "Committee Position",
      desc: "A brief description about the committee member.",
    },
    {
      id: 4,
      title: "Full Name",
      image:
        "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
      subtitle: "Committee Position",
      desc: "A brief description about the committee member.",
    },
    {
      id: 5,
      title: "Full Name",
      image:
        "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
      subtitle: "Committee Position",
      desc: "A brief description about the committee member.",
    },
    {
      id: 6,
      title: "Full Name",
      image:
        "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
      subtitle: "Committee Position",
      desc: "A brief description about the committee member.",
    },
  ];

  const dev_team_cards = [
    {
      id: 1,
      title: "Full Name",
      image:
        "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
      subtitle: "Committee Position",
      desc: "[Fun fact, desc] Lorem ipsum dolor sit amet. Etiam ut mauris sit amet velit egestas. ",
    },
    {
      id: 2,
      title: "Full Name",
      image:
        "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
      subtitle: "Committee Position",
      desc: "A brief description about the committee member.",
    },
    {
      id: 3,
      title: "Full Name",
      image:
        "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
      subtitle: "Committee Position",
      desc: "A brief description about the committee member.",
    },
    {
      id: 4,
      title: "Full Name",
      image:
        "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
      subtitle: "Committee Position",
      desc: "A brief description about the committee member.",
    },
    {
      id: 5,
      title: "Full Name",
      image:
        "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
      subtitle: "Committee Position",
      desc: "A brief description about the committee member.",
    },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Nav />
      <main className="flex flex-col items-center justify-start px-8 md:px-16 lg:px-24 py-12 gap-8 flex-1">
        <h1 className="text-center font-kode font-bold md:mt-10 text-2xl md:text-4xl lg:text-5xl bg-gradient-to-r from-white from-10% to-[#791E94] to-100% bg-clip-text text-transparent">
          The Society
        </h1>
        <p className="text-center text-neutral-300 text-sm md:text-lg font-mono md:max-w-4xl">
          [Society desc] Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. In sit amet sapien ut ipsum placerat tincidunt. Praesent cursus
          quam non massa lacinia, nec suscipit tortor pulvinar. Proin porttitor,
          ex ut tempor vulputate, nisi ex feugiat erat, quis finibus magna mi
          vitae odio. Sed laoreet risus nec turpis iaculis sollicitudin
        </p>

        <h1 className="text-center font-kode font-bold text-2xl md:text-4xl lg:text-5xl bg-gradient-to-r from-white from-10% to-[#791E94] to-100% bg-clip-text text-transparent md:mt-20">
          The Committee
        </h1>

        {/* Committee Grid */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-15 mt-8 max-w-6xl">
          {committee_cards.map((card) => (
            <div
              key={card.id}
              className="relative w-50 h-62.5 md:w-64 md:h-80 bg-[#0b0b0b] rounded-3xl border border-[#2a2a2a] flex flex-col items-center justify-center shadow-[0_0_30px_#8e61ff33] transition-all duration-500 hover:shadow-[0_0_40px_#b58cffaa] hover:scale-[1.02] overflow-hidden"
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Default View */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
                  hoveredCard === card.id ? "opacity-0" : "opacity-100"
                }`}
              >
                <h2 className="text-[#C5A3FF] text-lg font-semibold mb-4 font-mono">
                  {card.title}
                </h2>
                <div className="w-25 h-34 md:w-35 md:h-48 border-2 border-white/60 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                </div>
                <p className="text-white text-sm font-mono mt-4 font-semibold">
                  {card.subtitle}
                </p>
              </div>

              {/* Hover View */}
              <div
                className={`cursor-pointer absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 ${
                  hoveredCard === card.id ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* <h2 className="text-[#C5A3FF] text-base md:text-lg font-bold mb-4 font-mono text-center">
                  {card.title}
                </h2> */}
                <p className="text-white/90 text-sm font-mono text-center leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <h1 className="text-center font-kode font-bold text-2xl md:text-4xl lg:text-5xl bg-gradient-to-r from-white from-10% to-[#791E94] to-100% bg-clip-text text-transparent md:mt-20">
          The Dev Team
        </h1>

        {/* Dev Team Grid */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-15 mt-8 max-w-6xl">
          {dev_team_cards.map((card) => (
            <div
              key={card.id}
              className="relative w-50 h-62.5 md:w-64 md:h-80 bg-[#0b0b0b] rounded-3xl border border-[#2a2a2a] flex flex-col items-center justify-center shadow-[0_0_30px_#8e61ff33] transition-all duration-500 hover:shadow-[0_0_40px_#b58cffaa] hover:scale-[1.02] overflow-hidden"
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Default View */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
                  hoveredCard === card.id ? "opacity-0" : "opacity-100"
                }`}
              >
                <h2 className="text-[#C5A3FF] text-lg font-semibold mb-4 font-mono">
                  {card.title}
                </h2>
                <div className="w-25 h-34 md:w-35 md:h-48 border-2 border-white/60 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                </div>
                <p className="text-white text-sm font-mono mt-4 font-semibold">
                  {card.subtitle}
                </p>
              </div>

              {/* Hover View */}
              <div
                className={`cursor-pointer absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 ${
                  hoveredCard === card.id ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* <h2 className="text-[#C5A3FF] text-base md:text-lg font-bold mb-4 font-mono text-center">
                  {card.title}
                </h2> */}
                <p className="text-white/90 text-sm font-mono text-center leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Nav from "@/app/(public)/components/Nav";
import Footer from "@/app/(public)/components/Footer";

// Use the below calls for getting the data from the table

// // Get any collection
// fetch('/api/data?collection=YourCollectionName')

// // Add to any collection
// fetch('/api/data?collection=YourCollectionName', {
//   method: 'POST',
//   body: JSON.stringify({ field1: 'value1', field2: 'value2' })
// })


type member ={
  _id: number;
  FullName: string;
  ImagePath: string;
  Description: string;
  title?: string;
  subtitle?: string;
  position?: string;

}

export default function AboutUs() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [committeeData, setCommitteeData] = useState<member[]>([]);
  const [devTeamData, setDevTeamData] = useState<member[]>([]);

  useEffect(() => {
    const fetchCommittee = async () => {
      try {
        const response = await fetch('/api/members');
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('API result:', result);
        if (result.success) {
          // Filter members with position NOT 'Developer' for committee
          const committee = result.data.filter((member: member) => member.position !== 'Developer');
          console.log('Committee data:', committee);
          setCommitteeData(committee);
        }
      } catch (error) {
        console.error('Error fetching committee:', error);
      }
    };
    fetchCommittee();
  }, []);

  useEffect(() => {
    const fetchDevTeam = async () => {
      try {
        const response = await fetch('/api/members');
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('API result:', result);
        if (result.success) {
          // Filter members with role 'DevTeam'
          const devTeam = result.data.filter((member: member) => member.position === 'Developer');
          console.log('Dev Team data:', devTeam);
          setDevTeamData(devTeam);
        }
      } catch (error) {
        console.error('Error fetching dev team:', error);
      }
    };
    fetchDevTeam();
  }, []);

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
          {committeeData.map(member => ({
            _id: member._id,
            title: member.FullName || member.title,
            image: member.ImagePath || "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
            subtitle: member.position || member.subtitle || "Committee Member",
            desc: member.Description
          })).map((card) => (
            <div
              key={card._id}
              className="relative w-50 h-62.5 md:w-64 md:h-80 bg-[#0b0b0b] rounded-3xl border border-[#2a2a2a] flex flex-col items-center justify-center shadow-[0_0_30px_#8e61ff33] transition-all duration-500 hover:shadow-[0_0_40px_#b58cffaa] hover:scale-[1.02] overflow-hidden"
              onMouseEnter={() => setHoveredCard(card._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Default View */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
                  hoveredCard === card._id ? "opacity-0" : "opacity-100"
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
                  hoveredCard === card._id ? "opacity-100" : "opacity-0"
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
          {devTeamData.map(member => ({
            _id: member._id,
            title: member.FullName || member.title,
            image: member.ImagePath || "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
            subtitle: member.position || member.subtitle || "Committee Member",
            desc: member.Description
          })).map((card) => (
            <div
              key={card._id}
              className="relative w-50 h-62.5 md:w-64 md:h-80 bg-[#0b0b0b] rounded-3xl border border-[#2a2a2a] flex flex-col items-center justify-center shadow-[0_0_30px_#8e61ff33] transition-all duration-500 hover:shadow-[0_0_40px_#b58cffaa] hover:scale-[1.02] overflow-hidden"
              onMouseEnter={() => setHoveredCard(card._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Default View */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
                  hoveredCard === card._id ? "opacity-0" : "opacity-100"
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
                  hoveredCard === card._id ? "opacity-100" : "opacity-0"
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

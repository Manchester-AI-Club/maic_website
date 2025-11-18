"use client";
import React, { useState } from "react";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { List, Grid3x3 } from "lucide-react";
import { IoIosList } from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";

const eventsData = [
  {
    id: 1,
    name: "Event Name",
    date: "Nov 1",
    day: "Saturday",
    time: "5:00 PM",
    location: "Kilburn",
    description:
      "[Event details] Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat.",
  },
  {
    id: 2,
    name: "Event Name",
    date: "Nov 8",
    day: "Saturday",
    time: "5:00 PM",
    location: "Kilburn",
    description:
      "[Event details] Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat.",
  },
  {
    id: 3,
    name: "Event Name",
    date: "Nov 15",
    day: "Saturday",
    time: "5:00 PM",
    location: "Kilburn",
    description:
      "[Event details] Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat.",
  },
  {
    id: 4,
    name: "Event Name",
    date: "Nov 1",
    day: "Saturday",
    time: "5:00 PM",
    location: "Kilburn",
    description:
      "[Event details] Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat.",
  },
  {
    id: 5,
    name: "Event Name",
    date: "Nov 1",
    day: "Saturday",
    time: "5:00 PM",
    location: "Kilburn",
    description:
      "[Event details] Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat.",
  },
  {
    id: 6,
    name: "Event Name",
    date: "Nov 1",
    day: "Saturday",
    time: "5:00 PM",
    location: "Kilburn",
    description:
      "[Event details] Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat.",
  },
];

export default function Events() {
  const [isGridView, setIsGridView] = useState(false);

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      <Nav />
      <main className="flex-1 px-4 md:px-8 lg:px-16 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-center font-kode font-bold md:mt-10 text-2xl md:text-4xl lg:text-5xl bg-gradient-to-r from-white from-20% to-[#791E94] to-70% bg-clip-text text-transparent">
            Upcoming Events
          </h1>
        </div>

        {/* View Toggle */}
        <div className="mb-8">
          <div className="inline-flex border border-[#C5A3FF] rounded-full overflow-hidden">
            <button
              onClick={() => setIsGridView(false)}
              className={`p-3 px-5 transition-all text-[#C5A3FF] ${
                !isGridView
                  ? "bg-[#C5A3FF] text-black"
                  : "hover:bg-gray-800 hover:cursor-pointer"
              }`}
            >
              <IoIosList size={25} />
            </button>
            <button
              onClick={() => setIsGridView(true)}
              className={`p-3 px-5 transition-all text-[#C5A3FF] ${
                isGridView
                  ? "bg-[#C5A3FF] text-black"
                  : "hover:bg-gray-800 hover:cursor-pointer"
              }`}
            >
              <IoGridOutline size={20} />
            </button>
          </div>
        </div>

        {/* Events Display */}
        {isGridView ? (
          // Grid View
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20">
              {eventsData.map((event) => (
                <div
                  key={event.id}
                  className="bg-[#0b0b0b] border border-[#2a2a2a] rounded-3xl shadow-[0_0_25px_#8249ff33] hover:shadow-[0_0_35px_#a473ff88] transition-all duration-500 hover:scale-[1.015] overflow-hidden shadow-lg max-w-sm"
                >
                  {/* Image Placeholder */}
                  <div className="bg-gray-900 h-48 flex items-center justify-center border-b border-gray-800">
                    <div className="text-gray-700">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <h3 className="text-[#C5A3FF] text-xl font-mono font-semibold mb-2">
                      {event.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 font-mono font-medium">
                      Sat, {event.date} • {event.time} • {event.location}
                    </p>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-3 font-mono font-medium">
                      {event.description}
                    </p>
                    <button className="font-mono font-medium px-6 py-2 bg-transparent border border-[#791E94] text-white rounded-full hover:bg-[#791E94] hover:text-white transition-colors text-sm cursor-pointer">
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // List View
          <div className="flex justify-center">
            <div className="space-y-6">
              {eventsData.map((event, index) => (
                <div key={event.id}>
                  {/* Date Header */}
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="ml-3 text-gray-300 font-mono font-medium">
                      <span className="text-[#C5A3FF]"> {event.date}</span>
                      {", "}
                      {event.day}
                    </span>
                  </div>

                  {/* Event Card */}
                  <div className="ml-6 pl-6 border-l border-gray-800">
                    <div className="max-w-5xl bg-[#0b0b0b] border border-[#2a2a2a] rounded-3xl shadow-[0_0_25px_#8249ff33] hover:shadow-[0_0_35px_#a473ff88] transition-all duration-500 hover:scale-[1.015] overflow-hidden shadow-lg">
                      <div className="flex flex-col md:flex-row">
                        {/* Content Section */}
                        <div className="flex-1 p-6 md:p-8">
                          <h3 className="text-[#C5A3FF] font-mono text-2xl font-semibold mb-2">
                            {event.name}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 font-mono font-medium">
                            Sat, {event.date} • {event.time} • {event.location}
                          </p>
                          <p className="text-gray-500 mb-6 font-mono font-medium">
                            {event.description}
                          </p>
                          <button className="font-mono px-6 py-2 bg-transparent border border border-[#791E94] text-white rounded-full hover:bg-[#791E94] hover:text-white transition-colors cursor-pointer text-sm">
                            Register
                          </button>
                        </div>

                        {/* Image Section */}
                        <div className="w-full md:w-64 h-48 md:h-auto bg-gray-900 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-800">
                          <div className="text-gray-700">
                            <svg
                              width="64"
                              height="64"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                              />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <polyline points="21 15 16 10 5 21" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

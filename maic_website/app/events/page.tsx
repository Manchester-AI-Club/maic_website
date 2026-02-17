"use client";
import React, { useState, useEffect } from "react";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { IoIosList } from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";
import { X, MapPin, Clock, Calendar } from "lucide-react";

interface Event {
  _id: string;
  name: string;
  date: string;
  day: string;
  time: string;
  location: string;
  latitude?: number;
  longitude?: number;
  description: string;
  url: string;
}

export default function Events() {
  const [isGridView, setIsGridView] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setEventsData(result.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const openEventDetails = (event: Event) => {
    setSelectedEvent(event);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      <Nav />
      <main
        className={`flex-1 px-4 md:px-8 lg:px-16 py-8 md:py-12 transition-all duration-300 ${
          selectedEvent ? "blur-sm" : ""
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-center font-kode font-bold md:mt-10 text-2xl md:text-4xl lg:text-5xl bg-gradient-to-r from-white from-23% to-[#791E94] to-70% bg-clip-text text-transparent">
            Upcoming Events
          </h1>
        </div>

        {/* View Toggle */}
        <div className="mb-8 flex w-full justify-start">
          <div className="inline-flex items-center border border-[#C5A3FF] rounded-full overflow-hidden shadow-sm">
            <button
              onClick={() => setIsGridView(false)}
              className={`flex items-center gap-2 px-4 py-2 transition-all text-[#C5A3FF] text-sm 
        ${
          !isGridView
            ? "bg-[#C5A3FF] text-black"
            : "hover:bg-[#1a1a1a] hover:cursor-pointer"
        }`}
            >
              <IoIosList size={18} />
              <span className="hidden sm:inline">List</span>
            </button>

            <button
              onClick={() => setIsGridView(true)}
              className={`flex items-center gap-2 px-4 py-2 transition-all text-[#C5A3FF] text-sm 
        ${
          isGridView
            ? "bg-[#C5A3FF] text-black"
            : "hover:bg-[#1a1a1a] hover:cursor-pointer"
        }`}
            >
              <IoGridOutline size={16} />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>

        {/* Events Display */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-gray-400 text-lg font-mono">
              Loading events...
            </p>
          </div>
        ) : eventsData.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-gray-400 text-lg font-mono">
              No upcoming events
            </p>
          </div>
        ) : isGridView ? (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20">
              {eventsData.map((event) => (
                <div
                  key={event._id}
                  className="bg-[#0b0b0b] border border-[#2a2a2a] rounded-3xl shadow-[0_0_25px_#8249ff33] hover:shadow-[0_0_35px_#a473ff88] transition-all duration-500 hover:scale-[1.015] overflow-hidden shadow-lg max-w-sm"
                >
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
                    <button
                      onClick={() => openEventDetails(event)}
                      className="font-mono font-medium px-6 py-2 bg-transparent border border-[#791E94] text-white rounded-full hover:bg-[#791E94] hover:text-white transition-colors text-sm cursor-pointer"
                    >
                      Event details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="space-y-6 w-full max-w-5xl px-2 sm:px-4">
              {eventsData.map((event) => (
                <div key={event._id}>
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="ml-3 text-gray-300 font-mono font-medium text-sm sm:text-sm md:text-base">
                      <span className="text-[#C5A3FF]"> {event.date}</span>{" "}
                      {event.day}
                    </span>
                  </div>

                  <div className="ml-2 sm:ml-6 pl-2 sm:pl-6 border-l border-gray-800">
                    <div className="ml-2 w-full max-w-sm sm:max-w-2xl md:max-w-5xl bg-[#0b0b0b] border border-[#2a2a2a] rounded-3xl shadow-[0_0_25px_#8249ff33] hover:shadow-[0_0_35px_#a473ff88] transition-all duration-500 hover:scale-[1.015] overflow-hidden shadow-lg">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-4 sm:p-6 md:p-8">
                          <h3 className="text-[#C5A3FF] font-mono text-lg sm:text-xl md:text-2xl font-semibold mb-2">
                            {event.name}
                          </h3>
                          <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-4 font-mono font-medium">
                            Sat, {event.date} • {event.time} • {event.location}
                          </p>
                          <p className="text-gray-500 mb-6 font-mono font-medium text-xs sm:text-sm md:text-base">
                            {event.description}
                          </p>
                          <button
                            onClick={() => openEventDetails(event)}
                            className="font-mono px-4 sm:px-6 py-2 bg-transparent border border-[#791E94] text-white rounded-full hover:bg-[#791E94] hover:text-white transition-colors cursor-pointer text-xs sm:text-sm"
                          >
                            Event details
                          </button>
                        </div>

                        <div className="w-full md:w-64 h-32 sm:h-48 md:h-auto bg-gray-900 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-800">
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

      {/* Side Panel */}
      {selectedEvent && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeEventDetails}
          ></div>

          {/* Side Panel */}
          <div className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-[#0b0b0b] border-l border-[#2a2a2a] shadow-2xl z-50 overflow-y-auto animate-slide-in">
            <div className="p-6 sm:p-8">
              {/* Close Button */}
              <button
                onClick={closeEventDetails}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-800"
              >
                <X size={24} />
              </button>

              {/* Event Name */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[#C5A3FF] mb-6 pr-8 font-mono">
                {selectedEvent.name}
              </h2>

              {/* Event Details */}
              <div className="space-y-6 mb-8">
                {/* Date & Time */}
                <div className="flex items-start gap-3">
                  <Calendar
                    className="text-purple-400 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-gray-400 text-sm font-mono mb-1">
                      Date & Time
                    </p>
                    <p className="text-white font-mono">
                      {selectedEvent.day}, {selectedEvent.date}
                    </p>
                    <p className="text-white font-mono">{selectedEvent.time}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin
                    className="text-purple-400 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-gray-400 text-sm font-mono mb-1">
                      Location
                    </p>
                    <p className="text-white font-mono">
                      {selectedEvent.location}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-gray-400 text-sm font-mono mb-2">
                    Description
                  </p>
                  <p className="text-gray-300 font-mono text-sm leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="mb-8">
                <p className="text-gray-400 text-sm font-mono mb-3">
                  Location on Map
                </p>
                <div className="w-full h-64 bg-gray-900 rounded-xl border border-gray-800 flex items-center justify-center overflow-hidden">
                  {selectedEvent.latitude && selectedEvent.longitude ? (
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                        selectedEvent.longitude - 0.01
                      },${selectedEvent.latitude - 0.01},${
                        selectedEvent.longitude + 0.01
                      },${selectedEvent.latitude + 0.01}&layer=mapnik&marker=${
                        selectedEvent.latitude
                      },${selectedEvent.longitude}`}
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <p className="text-gray-500 font-mono text-sm">Map not available</p>
                  )}
                </div>
              </div>

              {/* Register Button */}
              <button
                className="w-full py-4 bg-[#791E94] hover:bg-[#9333ea] text-white font-mono font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/50 cursor-pointer"
                onClick={() => window.open(selectedEvent.url, "_blank")}
              >
                Register for Event
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        /* Blur effect for main content when side panel is open */
        .blur-sm {
          filter: blur(6px);
        }
      `}</style>
    </div>
  );
}

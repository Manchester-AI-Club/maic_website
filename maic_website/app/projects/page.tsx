import React from "react";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export default function Projects() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Nav />
      <main className="min-h-screen flex-1 flex flex-col justify-between px-8 md:px-16 lg:px-24 py-12">
        <div className="w-full flex flex-col md:flex-row justify-between flex-1 items-stretch">
          <h1>Projects Page</h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}

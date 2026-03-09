import Image from "next/image";
import MaicPolygonAnimation from "@/app/(public)/components/MaicPolygonAnimation";
import Nav from "./Nav";
import Footer from "@/app/(public)/components/Footer";
import Hero from "@/app/(public)/components/Hero";

export default function Home() {
  // TODO: Admin dashboard with heading saying "Welcome, Admin!"
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Nav />
      <main className="min-h-screen flex-1 flex flex-col justify-between px-8 md:px-16 lg:px-24 py-12">
        <h1 className="font-kode font-bold text-2xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white from-10% to-[#791E94] to-80% bg-clip-text text-transparent mb-4 ">
          Welcome, Admin!
        </h1>
        {/* Add admin dashboard components here */}
      </main>
      <Footer />
    </div>
  );
}

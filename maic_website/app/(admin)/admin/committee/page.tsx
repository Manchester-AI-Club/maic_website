import Nav from "../Nav";

export default function AdminCommittee() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Nav />
      <main className="min-h-screen flex-1 flex flex-col justify-between px-8 md:px-16 lg:px-24 py-12">
        <h1 className="font-kode font-bold text-2xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white from-10% to-[#791E94] to-80% bg-clip-text text-transparent mb-4 ">
          Committee Admin Panel
        </h1>
        {/* Add admin dashboard components here */}
      </main>
    </div>
  );
}
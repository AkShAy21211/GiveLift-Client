import Image from "next/image";
import Hero from "./components/hero/Hero";
import DisasterCard from "./components/card/DisasterCard";

export default function Home() {
  return (
    <main className={`h-auto w-full`}>
      {/* Hero Section */}
      <Hero />
      {/* Disaster Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        <DisasterCard title={""} imageUrl={""} status={""} severity={""} />
        <DisasterCard title={""} imageUrl={""} status={""} severity={""} />

        <DisasterCard title={""} imageUrl={""} status={""} severity={""} />

        <DisasterCard title={""} imageUrl={""} status={""} severity={""} />
      </div>
    </main>
  );
}

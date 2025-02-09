import Hero from "./components/hero/Hero";
import DisasterCard from "./components/card/DisasterCard";

export default function Home() {
  return (
    <main className={`h-auto w-full`}>
      {/* Hero Section */}
      <Hero />
      {/* Disaster Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 p-4  justify-items-center mt-10 ">
        <DisasterCard
          title={"Severe Flood in Mumbai helpo needs help"} 
          imageUrl={
            "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          status={"Active"}
          severity={"High"}
        />

        <DisasterCard
          title={"Severe Flood in Mumbai"}
          imageUrl={
            "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          status={"Active"}
          severity={"High"}
        />

        <DisasterCard
          title={"Severe Flood in Mumbai"}
          imageUrl={
            "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          status={"Active"}
          severity={"High"}
        />

        <DisasterCard
          title={"Severe Flood in Mumbai"}
          imageUrl={
            "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          status={"Active"}
          severity={"High"}
        />
      </div>
    </main>
  );
}

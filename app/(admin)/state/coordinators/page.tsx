import { Suspense } from "react";
import { getCoordinators } from "./actions";
import CoordinatorsClient from "./coordinators-client";

// Server Component - handles data fetching
export default async function CoordinatorsPage() {
  // Fetch data on the server
  const coordinators = await getCoordinators();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coordinators</h1>
      </div>

      <CoordinatorsClient initialCoordinators={coordinators} />
    </div>
  );
}

import { Suspense } from "react";
import DisasterReportsClient from "./disaster-reports-client";
import { DisasterReportsLoading } from "@/components/ui/CustomSkleton";
import { headers } from "next/headers";
import { getDisasters } from "./actions";

export default async function DisasterReportsPage() {
  // Fetch data on the server
  const headersConfig = await headers();
  const disasters = await getDisasters(headersConfig);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Disaster Reports</h1>
          <p className="text-gray-600 mt-2">
            Report and manage disaster incidents in your area
          </p>
        </div>
      </div>

      <Suspense fallback={<DisasterReportsLoading />}>
        <DisasterReportsClient initialReports={disasters} />
      </Suspense>
    </div>
  );
}

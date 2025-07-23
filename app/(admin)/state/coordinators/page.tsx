import { Suspense } from "react";
import CoordinatorsClient from "./coordinators-client";
import { CustomTableLoading } from "@/components/ui/CustomSkleton";

export default async function CoordinatorsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coordinators</h1>
      </div>

      <Suspense
        fallback={
          <CustomTableLoading
            columns={["Name", "Email", "Phone", "District", "Status"]}
            rows={8}
            title="Coordinators"
          />
        }
      >
        <CoordinatorsClient />
      </Suspense>
    </div>
  );
}

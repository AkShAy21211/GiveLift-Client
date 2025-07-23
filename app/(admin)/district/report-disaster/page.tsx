import DisasterReportsClient from "./disaster-reports-client";


export default async function DisasterReportsPage() {

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

        <DisasterReportsClient  />
    </div>
  );
}

import { Suspense } from 'react'
import DisasterReportsClient from './disaster-reports-client'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { DisasterReportsLoading } from '@/components/ui/CustomSkleton'
import { headers } from 'next/headers'
import { createSSRApi } from '@/lib/api/server'

// Server Component - handles data fetching

export async function getDisasters(header: Headers) {
  try {
    const api = await createSSRApi(header);
    const response = await api.get("/disaster")
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

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

      {/* Emergency Alert */}
      <Alert className="mb-6 border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Emergency Hotline:</strong> For immediate life-threatening emergencies, 
          call 911 or your local emergency number before filing a report.
        </AlertDescription>
      </Alert>

      <Suspense fallback={<DisasterReportsLoading />}>
        <DisasterReportsClient initialReports={disasters} />
      </Suspense>
    </div>
  )
}


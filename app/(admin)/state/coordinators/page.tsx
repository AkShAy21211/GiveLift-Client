import { Suspense } from 'react'
import { getCoordinators } from './actions'
import CoordinatorsClient from './coordinators-client'


// Server Component - handles data fetching
export default async function CoordinatorsPage() {
  // Fetch data on the server
  const coordinators = await getCoordinators()

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coordinators</h1>
      </div>

      <Suspense fallback={<CoordinatorsLoading />}>
        <CoordinatorsClient initialCoordinators={coordinators} />
      </Suspense>
    </div>
  )
}

function CoordinatorsLoading() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">
      </div>
      <p className="ml-4">Loading coordinators...</p>
    </div>
  )
}
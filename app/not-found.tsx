import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <h2 className="text-4xl font-bold text-red-500">404 - Not Found</h2>
      <p className="mt-4 text-lg text-gray-300">Oops! The page you're looking for does not exist.</p>
      <Link 
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300"
      >
        Return Home
      </Link>
    </div>
  );
}
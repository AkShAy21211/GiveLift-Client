import LoginForm from "@/components/ui/forms/LoginForm";
import { Metadata } from "next";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: 'Login',
}
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Form */}
        <div className="bg-white py-8 px-6 shadow sm:rounded-lg">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-8">
            Login
          </h2>

         <LoginForm />

        </div>

        {/* Right Column - Text */}
        <div className="flex flex-col justify-center items-center md:items-start p-6">
          <div className="max-w-md">
            <p className="text-3xl md:text-4xl font-light leading-tight text-gray-800 mb-8">
              Lift lives by logging in — your next action could change someone's
              day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

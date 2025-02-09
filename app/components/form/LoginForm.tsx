import Link from "next/link";
import React from "react";

interface LoginFormProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (event: React.FormEvent<HTMLFormElement>) => void;
}

function LoginForm({ }: LoginFormProps) {
  return (
    <div className="w-full md:w-1/3 bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Sign In</h2>
      <form className="space-y-2">
        {/* Email & pasword */}
        <div className="flex flex-col gap-4 ">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="e.g. john@example.com"
              className="w-full p-3 border border-black rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="e.g. ********"
              className="w-full p-3 border border-black rounded-lg"
            />
          </div>
        </div>
        <Link className="text-right  float-right text-blue-500" href={"/forgot-password"}>Forgot Password?</Link>
        {/* Submit Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-md">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

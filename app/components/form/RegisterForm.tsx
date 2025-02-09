import React from 'react'


interface RegisterFormProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (event: React.FormEvent<HTMLFormElement>) => void;
}
function RegisterForm({}:RegisterFormProps) {
  return (
    <div className="w-full md:w-1/3 bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Sign Up</h2>
        <form className="space-y-2">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                className="w-full p-3 border border-black rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="e.g. john@example.com"
                className="w-full p-3 border border-black rounded-lg"
              />
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="e.g. ********"
                className="w-full p-3 border border-black rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter your password"
                className="w-full p-3 border border-black rounded-lg"
              />
            </div>
          </div>

          {/* Home Address */}
          <div>
            <label className="block text-gray-700 mb-1">Home Address</label>
            <input
              type="text"
              placeholder="e.g. 123 Street Name, Apartment 4B"
              className="w-full p-3 border border-black rounded-lg"
            />
          </div>

          {/* District, City & PIN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">District</label>
              <select className="w-full p-3 border border-black rounded-lg">
                <option>Select district</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">City</label>
              <select className="w-full p-3 border border-black rounded-lg">
                <option>Select city</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">PIN Code</label>
              <input
                type="text"
                placeholder="e.g. 123456"
                className="w-full p-3 border border-black rounded-lg"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-700 mb-1">Mobile Number</label>
            <input
              type="text"
              placeholder="e.g. +91 9876543210"
              className="w-full p-3 border border-black rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-md">
            Sign Up
          </button>
        </form>
      </div>
  )
}

export default RegisterForm
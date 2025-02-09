import LoginForm from '@/app/components/form/LoginForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function SignIn() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-around min-h-screen p-4 bg-gray-100">
      {/* Left Side - Image */}
      <div className=" hidden md:flex relative w-full md:w-1/2 h-screen ">
        <Image
          src="https://images.unsplash.com/photo-1558522195-e1201b090344?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Disaster Relief"
          layout="fill"
          objectFit="cover"
          className="rounded-lg md:rounded-none"
        />
        <div className="absolute bottom-4 left-4 bg-gray-900 bg-opacity-75 text-white px-4 py-2 rounded-lg flex items-center">
          <p className="mr-2">Already have an account?</p>
          <Link href={'/sign-up'} className="bg-blue-500 px-4 py-1 rounded-md">Sign In</Link>
        </div>
      </div>

      {/* Right Side - Form */}
      <LoginForm />
    </div>
  )
}

export default SignIn
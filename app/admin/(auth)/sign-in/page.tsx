"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginHandler, LoginType } from "@/lib/api/auth";
import { loginValidationSchema } from "@/lib/validation";
import { loginSuccess } from "@/store/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Settig title for the page
  useEffect(() => {
    document.title = "Sign in";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (userData: LoginType) => {
    try {
      const response = await loginHandler(userData);
      toast.success(response.data.message);
      dispatch(loginSuccess(response.data.role));
      router.push("/admin/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-around min-h-screen p-4 bg-gray-100">
      {/* Left Side - Image */}

      {/* Sign-in Form */}
      <div className=" bg-auth bg-no-repeat bg-cover bg-center  md:bg-none w-full md:w-1/2 space-y-4 px-3 md:px-0  h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2"
        >
          <div className="flex justify-center">
            <h1 className="text-2xl font-semibold">Admin Panel</h1>
          </div>
          <div>
            <Input
              name="email"
              alt="email"
              label="Email"
              type="email"
              register={register}
              error={errors.email?.message}
            />
          </div>
          <div>
            <Input
              name="password"
              alt="password"
              label="Password"
              type="password"
              register={register}
              error={errors.password?.message}
            />
          </div>
          <div className="  mt-3  text-end ">
            <Link
              aria-label="Forget password"
              href={"/sign-up"}
              className=" px-3  rounded-md text-blue-500"
            >
              Forget password
            </Link>
          </div>
          <Button
            variant={"default"}
            type="submit"
            className="w-full bg-blue-500  text-white hover:bg-blue-600 mt-3"
          >
            Sign In
          </Button>
          <div className=" md:hidden  mt-3  text-center ">
            Don't have an account?
            <Link
              aria-label="Sign up"
              href={"/sign-up"}
              className=" px-3  rounded-md text-blue-500"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;

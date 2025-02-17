"use client";
import { registerHandler, RegisterType } from "@/lib/api/auth";
import { USER_ROLE } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/authSlice";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
export default function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Settig title for the page
  useEffect(() => {
    document.title = "Sign up";
  }, []);

  const onSubmit = async (userData: RegisterType) => {
    try {
      userData.role = USER_ROLE.USER;
      const { confirmPassword, ...data } = userData;
      const response = await registerHandler(data);
      toast.success(response.data.message);
      dispatch(loginSuccess(response.data.role));
      router.push("/");
      return;
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error(error);
      return;
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
    },
  });

  return (
    <div className="flex flex-col md:flex-row items-center justify-between h-screen  bg-gray-100">
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
          <Link
            aria-label="Sign in"
            href={"/sign-in"}
            className="bg-blue-500 px-4 py-1 rounded-md"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Sign-in Form */}
      <div className=" bg-auth bg-no-repeat bg-cover bg-center  mb-10 md:mt-20  md:bg-none w-full md:w-2/3 space-y-4 px-3 md:px-0  h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-lg w-full  md:w-1/2"
        >
          <div className="flex justify-center">
            <Image
              alt="logo"
              width={150}
              height={30}
              objectFit="cover"
              src={"/img/logo.png"}
            />
          </div>{" "}
          <div className="flex flex-col md:flex-row gap-5">
            <Input
              name="name"
              label="Name"
              alt="Name"
              type="text"
              register={register}
              error={errors.name?.message}
            />
            <Input
              name="email"
              label="Email"
              alt="Email"
              type="email"
              register={register}
              error={errors.email?.message}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <Input
              name="phone"
              label="Phone"
              type="text"
              alt="Phone"
              register={register}
              error={errors.password?.message}
            />
            <Input
              name="password"
              label="Password"
              type="password"
              register={register}
              error={errors.password?.message}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <Input
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              alt="Confirm Password"
              register={register}
              error={errors.confirmPassword?.message}
            />
          </div>
          <Button
            variant={"default"}
            type="submit"
            aria-label="Sign in"
            className="w-full bg-blue-500 text-white hover:bg-blue-600 mt-5"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

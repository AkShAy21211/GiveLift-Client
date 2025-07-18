"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/app/(auth)/validation";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginAction } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { ROLES } from "@/lib/types";
import { loginHandler } from "@/app/(auth)/api";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<string>("regular");
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: {
    email: string;
    password: string;
    userType?: string;
  }) => {
    const response = await loginHandler(data);

    if (response) {
      const role = response?.data?.role as string;
      dispatch(loginAction({ role }));

      if (role === ROLES.STATE_COORDINATOR) {
        router.push("/state/dashboard");
      } else if (role === ROLES.DISTRICT_COORDINATOR) {
        router.push("/district/dashboard");
      } else {
        router.push("/");
      }
    }

    reset();
  };



  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          placeholder="Enter your email"
          className="mt-1"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            {...register("password")}
            placeholder="Enter your password"
            className="mt-1 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        {/* Only show register option for regular login */}
        {(!userType || userType !== "state-coordinator") && (
          <div className="text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link href="/register" className="text-gray-800 underline">
              Register
            </Link>
          </div>
        )}

        <div className="text-sm">
          <Link href={"/forgot-password"} className="text-gray-800 underline">
            Forgot password?
          </Link>
        </div>
      </div>

      <div className="space-y-2">
        <Button
          type="submit"
          className="w-full bg-[#1A5F7A] hover:bg-[#235163] text-white"
        >
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/lib/validation";
import { loginHandler } from "../../../lib/api/auth";
import { Eye, EyeOff } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from "react-redux";
import { loginAction } from "@/store/authSlice";
function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<string>("regular");
  const dispatch = useDispatch();
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
    try {
      const response = await loginHandler({
        ...data,
      });
      dispatch(loginAction({ role: response.role }));
      toast.success(response.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });

      reset();
    } catch (error: any) {
      console.log('fdfdfdfdfdfdfd',error);
      toast.error( error?.response?.data?.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* User Type Selection (only shown if not explicitly set via props) */}
      <div>
        <Label>Login as</Label>
        <RadioGroup
          defaultValue="state-coordinator"
          className="flex gap-4 mt-2"
          onValueChange={(value: "state-coordinator" | "regular") =>
            setUserType(value)
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="regular" id="regular" />
            <Label htmlFor="regular">Regular</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="state-coordinator" id="state-coordinator" />
            <Label htmlFor="state-coordinator">State Coordinator</Label>
          </div>
        </RadioGroup>
      </div>

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

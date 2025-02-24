"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTPDemo } from "@/components/ui/input-otp";
import { passwordSchema, phoneSchema } from "@/lib/validation";
import {
  forgetPassword,
  resetPasswordOtp,
  verifyForgetPasswordOtp,
} from "@/lib/api/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function ForgetPassword() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const router = useRouter();

  useEffect(() => {
    document.title = "Forget Password";
  }, []);

  const handleSendOTP = async () => {
    phoneSchema
      .validate(phone)
      .then((value) => {
        setPhone(value);
        setValidationError("");
      })
      .catch((error) => {
        return setValidationError(error.message);
      });
    try {
      const response = await forgetPassword(phone);
      if (response.data) {
        toast.success(response.data.message);
        setIsOTPSent(true);
        return;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setIsOTPSent(false);
      return;
    }
  };

  const handleOTPChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    setOtp(numericValue);
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await verifyForgetPasswordOtp(otp);
      if (response.data) {
        toast.success(response.data.message);
        setIsVerified(true);
        return;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setIsVerified(false);
    }
  };

  const handlePasswordSubmit = async () => {
    passwordSchema
      .validate(newPassword)
      .then((value) => setNewPassword(value))
      .catch((err) => {
        return setValidationError(err.message);
      });

    try {
      const response = await resetPasswordOtp(newPassword);
      if (response.data) {
        toast.success(response.data.message);
        router.push("/sign-in");
        return;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-gray-100">
      <div className="hidden md:flex relative w-full md:w-1/2 h-screen">
        <Image
          src="https://images.unsplash.com/photo-1558522195-e1201b090344?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D"
          alt="Disaster Relief"
          layout="fill"
          objectFit="cover"
          className="rounded-lg md:rounded-none"
        />
      </div>

      <div className="bg-auth bg-no-repeat bg-cover bg-center md:bg-none w-full md:w-1/2 space-y-4 px-3 md:px-0 h-screen flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
          <div className="flex justify-center">
            <Image alt="logo" width={150} height={150} src="/img/logo.png" />
          </div>
          {!isOTPSent ? (
            <div className="flex flex-col space-y-4">
              <Input
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full"
                label={"Phone"}
                name={"phone"}
              />
              <div className="text-red-600">{validationError}</div>
              <Button
                onClick={handleSendOTP}
                disabled={phone.length !== 10}
                className="w-full bg-blue-500 text-white hover:bg-blue-600"
              >
                Send OTP
              </Button>
            </div>
          ) : !isVerified ? (
            <div className="flex flex-col items-center space-y-4">
              <InputOTPDemo otp={otp} onChange={handleOTPChange} />
              <Button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6}
                className="w-full bg-blue-500 text-white hover:bg-blue-600"
              >
                Verify OTP
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <Input
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full"
                label={"Password"}
                name={"password"}
              />
              <div className="text-red-600">{validationError}</div>
              <Button
                onClick={handlePasswordSubmit}
                disabled={newPassword.length < 4}
                className="w-full bg-green-500 text-white hover:bg-green-600"
              >
                Reset Password
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;

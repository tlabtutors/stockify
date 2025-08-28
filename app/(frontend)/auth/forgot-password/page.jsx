"use client";
import { useState } from "react";
import Link from "next/link";
import EmailValidation from "@/utils/EmailValidation";
import Button from "@/components/custom/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  return (
    <div className="flex flex-col space-y-3 items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-[500px] w-full p-4 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-4">
          <img src="/images/logo.png" alt="Stockiffy Logo" className="h-16" />
        </div>
        <h2 className="text-[16px] font-semibold mb-4 text-center">
          Forgot Password? Request Password Reset Code
        </h2>
        <EmailValidation
          value={email}
          onChange={setEmail}
          placeholder="Enter Email associated with account!"
          className="text-xs"
          onValidationChange={setIsEmailValid}
        />
        <h6 className="text-sm font-normal text-center my-2">
          We'll send you a reset code right away!
        </h6>

        <Button
          className={`w-full bg-[#009688] text-white py-2 rounded mb-4 hover:bg-[#0db4a3] ${
            !isEmailValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isEmailValid}
        >
          Request Now!
        </Button>
        <Link
          href="/auth/login"
          className="text-gray-700 hover:underline text-center block text-xs"
        >
          Remember Password? Login instead
        </Link>
      </div>
      <Link
        href="/"
        className="text-gray-700 hover:underline text-center block text-xs"
      >
        Cancel
      </Link>
    </div>
  );
};

export default ForgotPassword;

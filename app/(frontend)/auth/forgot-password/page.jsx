"use client";

import { useState } from "react";
import Link from "next/link";
import EmailValidation from "@/utils/EmailValidation";
import Button from "@/components/custom/Button";
import { forgotPassword } from "@/actions/forgotPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRequest = async () => {
    if (!isEmailValid) return;
    setLoading(true);
    setMessage("");

    try {
      const res = await forgotPassword({ email });

      if (res?.success) {
        setMessage(res.message);
      } else {
        setMessage(res.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-3 items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-[300px] w-full p-4 bg-white shadow-lg rounded-lg">
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

        {message && (
          <p
            className={`text-center text-xs mb-2 ${
              message.toLowerCase().includes("not found") ||
              message.toLowerCase().includes("error")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}

        <Button
          onClick={handleRequest}
          className={`w-full bg-[#009688] text-white py-2 rounded mb-4 hover:bg-[#0db4a3] ${
            !isEmailValid || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isEmailValid || loading}
        >
          {loading ? "Sending..." : "Request Now!"}
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
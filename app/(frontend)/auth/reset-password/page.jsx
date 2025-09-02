"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/custom/Button";
import { resetPassword } from "@/actions/resetPasword";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      setMessage("Please fill in both fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await resetPassword({ token, newPassword });

      if (res?.success) {
        setMessage(res.success);
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } else {
        setMessage(res?.error || "Something went wrong.");
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
          Reset Your Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 rounded mb-2 text-xs"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full border p-2 rounded mb-2 text-xs"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {message && (
          <p
            className={`text-center text-xs mb-2 ${
              message.toLowerCase().includes("success")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <Button
          onClick={handleReset}
          className={`w-full bg-[#009688] text-white py-2 rounded mb-4 hover:bg-[#0db4a3] ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>

        <Link
          href="/auth/login"
          className="text-gray-700 hover:underline text-center block text-xs"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;

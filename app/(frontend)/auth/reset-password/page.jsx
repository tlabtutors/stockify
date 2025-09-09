"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "@/components/custom/Button";
import { resetPassword } from "@/actions/resetPasword";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

        {/* New Password Field with Show/Hide */}
        <div className="relative mb-2">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            className="w-full border p-2 rounded text-xs pr-10"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showNewPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        </div>

        {/* Confirm Password Field with Show/Hide */}
        <div className="relative mb-2">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            className="w-full border p-2 rounded text-xs pr-10"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? (
              <FaEyeSlash size={16} />
            ) : (
              <FaEye size={16} />
            )}
          </button>
        </div>

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

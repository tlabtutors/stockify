"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, getSession } from "next-auth/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "@/components/custom/Button";
import { changePassword } from "@/actions/changePassword";

const ChangePassword = () => {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const session = await getSession();
      if (!session?.user?.sub) {
        setMessage("You must be logged in.");
        setLoading(false);
        return;
      }

      const res = await changePassword({
        currentPassword,
        newPassword,
        token: session.user.sub, // pass JWT sub/id
      });

      if (res?.success) {
        setMessage(res.success);

        // logout and redirect after success
        setTimeout(async () => {
          await signOut({ redirect: false });
          router.push("/auth/login");
        }, 1500);
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
      <div className="max-w-[320px] w-full p-4 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-4">
          <img src="/images/logo.png" alt="Stockiffy Logo" className="h-16" />
        </div>
        <h2 className="text-[16px] font-semibold mb-4 text-center">
          Change Password
        </h2>

        {/* Current Password */}
        <div className="relative">
          <input
            type={showCurrent ? "text" : "password"}
            placeholder="Current Password"
            className="w-full border p-2 rounded pr-10 text-xs mb-2"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showCurrent ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>

        {/* New Password */}
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            placeholder="New Password"
            className="w-full border p-2 rounded pr-10 text-xs mb-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showNew ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm New Password"
            className="w-full border p-2 rounded pr-10 text-xs mb-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirm ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
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
          onClick={handleChangePassword}
          className={`w-full bg-[#009688] text-white py-2 rounded mb-4 hover:bg-[#0db4a3] ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Change Password"}
        </Button>

        <Link
          href="/dashboard"
          className="text-gray-700 hover:underline text-center block text-xs"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ChangePassword;

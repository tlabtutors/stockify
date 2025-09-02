"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "@/components/custom/Button";
import { register } from "@/actions/register"; // Import your server action
import { GoogleLogin } from "@/components/GoogleLogin";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = {
      email,
      phoneNumber,
      companyName,
      password,
      passwordConfirmation: passwordConfirm,
      name: email.split("@")[0], // optional: default name
    };

    try {
      const result = await register(data); // Call server action
      if (result.error) {
        setMessage(result.error);
      } else {
        setMessage(result.success);
        // Optionally redirect to login page
        // router.push("/auth/login");
      }
    } catch (err) {
      console.error(err);
      setMessage("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6 items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-[400px] p-4 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-4">
          <img src="/images/logo.png" alt="Stockiffy Logo" className="h-16" />
        </div>
        <h2 className="text-[16px] font-semibold mb-4 text-center">
          Sign up for access
        </h2>

        {message && (
          <div className="mb-4 text-center text-sm text-red-500">{message}</div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
              className="w-full p-2 border rounded text-xs"
              required
            />
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className="w-full p-2 border rounded text-xs"
              required
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address or mobile number"
              className="w-full p-2 border rounded text-xs"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="w-full p-2 border rounded pr-10 text-xs"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="Confirm Your Password"
                className="w-full p-2 border rounded pr-10 text-xs"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        <div className="flex justify-center space-x-2 mt-4 mb-4">
          <GoogleLogin text={`Sign Up with Google`} />
        </div>

        <Link
          href="/auth/login"
          className="text-gray-700 hover:underline text-center block text-xs"
        >
          Already have an account? Login instead
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

export default Signup;

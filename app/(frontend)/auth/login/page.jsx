"use client";
import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "@/components/custom/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col space-y-3 items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-[800px] p-4 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-4">
          <img src="/images/logo.png" alt="Stockiffy Logo" className="h-16" />
        </div>
        <h2 className="text-[16px] font-semibold mb-4 text-center">
          Login for access
        </h2>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address or mobile number"
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            className="w-full p-2 border rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
        <Button className="w-full mb-1">Login</Button>
        <div className="flex justify-center space-x-2 mb-4">
          <button className="bg-emerald-100 p-2 rounded-sm flex gap-x-2 w-full justify-center items-center">
            <FcGoogle size={20} className="text-[#009688]" />
            <span>Sign In with Google</span>
          </button>
        </div>
        <Link
          href="/auth/signup"
          className="text-gray-700 hover:underline text-center block text-xs"
        >
          Don't have a Stockiffy account? Sign up now
        </Link>
        <Link
          href="/auth/forgot-password"
          className="text-gray-800 hover:underline text-center block mt-2 text-xs"
        >
          Forgot Password?
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

export default Login;

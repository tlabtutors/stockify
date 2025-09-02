"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "@/components/custom/Button";
import { login } from "@/actions/login";
import { GoogleLogin } from "@/components/GoogleLogin";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [redirecting, setRedirecting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const res = await login({ email, password });

      if (res?.error) {
        setMessage({ type: "error", text: res.error });
      } else if (res?.success) {
        setMessage({ type: "success", text: res.success });
        setRedirecting(true);
        router.push("/dashboard/home");
      }
    });
  };

  if (redirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-700">
            Authenticated. Preparing your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3 items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-[400px] p-4 bg-white shadow-lg rounded-lg w-full">
        <div className="flex justify-center mb-4">
          <img src="/images/logo.png" alt="Stockiffy Logo" className="h-16" />
        </div>
        <h2 className="text-[16px] font-semibold mb-4 text-center">
          Login for access
        </h2>

        {message && (
          <p
            className={`text-center mb-4 text-sm ${
              message.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address or mobile number"
            className="w-full p-2 mb-4 border rounded"
            required
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="w-full p-2 border rounded pr-10"
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

          <Button type="submit" className="w-full mb-1" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="flex justify-center space-x-2 mt-4 mb-4">
          <GoogleLogin text={`Sign In with Google`} />
        </div>

        <Link
          href="/auth/signup"
          className="text-gray-700 hover:underline text-center block text-xs"
        >
          Don&apos;t have a Stockiffy account? Sign up now
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

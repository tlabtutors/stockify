"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No token provided.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/auth/verify-email?token=${token}`
        );
        const data = await res.json();
        console.log("DATA: ", data);

        if (res.ok) {
          setStatus("success");
          setMessage(
            "Your email has been verified successfully. Redirecting..."
          );
          setTimeout(() => router.push("/auth/login"), 5000);
        } else {
          setStatus("error");
          setMessage(data.message || "Email verification failed.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg text-center">
        {status === "loading" && (
          <p className="text-gray-600">Verifying your email...</p>
        )}

        {status === "success" && (
          <p className="text-green-600 font-semibold">{message}</p>
        )}

        {status === "error" && (
          <>
            <p className="text-red-600 font-semibold mb-4">{message}</p>
            <Link
              href="/auth/login"
              className="text-blue-600 hover:underline text-sm"
            >
              Go to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

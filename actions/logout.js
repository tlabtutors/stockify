"use client";
import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="bg-red-700 text-white py-1 px-3 pb-1 rounded-md cursor-pointer flex justify-center items-center"
    >
      Logout
    </button>
  );
}

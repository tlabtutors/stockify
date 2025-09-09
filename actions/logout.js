"use client";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

export default function Logout() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex space-x-3 bg-red-500 text-white py-1 px-3 pb-1 rounded-md cursor-pointer  justify-center items-center"
    >
      <FiLogOut size={16} />
      Logout
    </button>
  );
}

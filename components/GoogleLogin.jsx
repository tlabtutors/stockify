"use client";
import { googleAuthenticate } from "@/actions/google-login";
import { useActionState } from "react";
import { FcGoogle } from "react-icons/fc";

export const GoogleLogin = ({ text }) => {
  const [errorMsgGoogle, dispatchedGoogle] = useActionState(
    googleAuthenticate,
    undefined
  );
  return (
    <form className="flex mt-2 text-sm" action={dispatchedGoogle}>
      <button className="p-2 rounded-sm flex gap-x-2 w-full justify-center items-center">
        <FcGoogle size={20} />
        <span>{text}</span>
      </button>
      <p>{errorMsgGoogle}</p>
    </form>
  );
};

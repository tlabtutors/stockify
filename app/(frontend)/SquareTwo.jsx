// app/components/DriverPromo.tsx
"use client";
import Image from "next/image";
import Button from "@/components/custom/Button";

export default function SquareTwo() {
  return (
    <section className="flex flex-col md:w-[1000px] m-auto md:flex-row items-center justify-center md:justify-between gap-10 px-6 md:px-16 py-12">
      {/* Left Image */}

      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
          Control your stock, <br className="hidden md:block" /> maximize your
          profits
        </h1>
        <p className="text-gray-600 mb-6">
          Save time and reduce errors with smart inventory management. Track
          sales, manage purchases, and keep your stock levels accurate—all in
          one simple system.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button href={`/auth/signup`}>Get Started</Button>
          {/* <a
            href="#"
            className="text-black underline underline-offset-2 hover:text-gray-700"
          >
            Already have an account? Sign in
          </a> */}
        </div>
      </div>
      {/* Right Content */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/images/2.jpg" // replace with your uploaded image in /public
          alt="Driver illustration"
          width={600}
          height={400}
          className="rounded-2xl shadow-md"
          priority
        />
      </div>
    </section>
  );
}

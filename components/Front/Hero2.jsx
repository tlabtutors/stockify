import Link from "next/link";

const Hero = () => {
  return (
    <section className="flex min-h-[450px] justify-center items-center bg-[#80ebe0] py-16 text-center text-gray-800">
      <div className="container mx-auto">
        <h1 className="w-full text-3xl font-bold mb-4 p-auto md:px-64">
          Smart Inventory Management, Simplified for Business Growth.
        </h1>

        <p className="mb-6 p-auto md:px-64">
          Track your stock, sales, and supply chain effortlessly—while keeping
          costs low.
        </p>
        <div className="mt-10 space-x-4">
          <button className="bg-[#009688] text-white px-4 py-1 transition-all duration-150 rounded hover:bg-[#1fe7d3]">
            Get Started for Free
          </button>
          <Link
            href="/demo"
            className="bg-white border border-white text-gray-700 px-4 py-1.5 rounded-[5px] hover:bg-[#1fe7d3] hover:border-[#1fe7d3]"
          >
            Try Demo Account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import Link from "next/link";
import Button from "../custom/Button";

const Navigation = () => {
  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="w-full mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex h-6 justify-between items-center space-x-1">
            <img src="/images/logo.png" alt="Stockiffy" className="h-8" />{" "}
            <span className="text-[#009688] font-bold text-[18px]">
              Stockify
            </span>
          </div>

          <Link href="/book" className="text-gray-700 hover:text-[#0db4a3]">
            Book
          </Link>
          <Link href="/invoice" className="text-gray-700 hover:text-[#0db4a3]">
            Invoice
          </Link>
          <Link href="/billing" className="text-gray-700  hover:text-[#0db4a3]">
            Billing
          </Link>
          <div className="relative">
            <Link
              href="/all-products"
              className="text-gray-700 hover:text-[#0db4a3]"
            >
              Products
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <select className="border-none focus:outline-none">
            <option>English</option>
            <option>French</option>
          </select>

          <Button href={`/auth/login`} variant="btnLink">
            Sign In
          </Button>

          <Button href={`/auth/signup`} variant="btnRectangle">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

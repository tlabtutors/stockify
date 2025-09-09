import React from "react";
import Image from "next/image";
import mobileImage from "@/public/images/mobile-carousel1.png";
import mobileQr from "@/public/images/inventory_mobile_qr.png";
import Link from "next/link";
import { FiPhone } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";

const DashboardFooter = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 text-sm border-t border-neutral-300 ">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-8 bg-gray-100">
        {/* Left Section: 1/4 width on md and up */}
        <div className="w-full md:w-[30%] justify-between text-gray-800 bg-gray-200">
          <div className="py-7 px-10  text-center">
            <h3 className="w-full text-lg font-semibold mb-2 justify-center">
              Manage your inventory on the go!
            </h3>
            <p className="text-gray-800">
              Experience the ease of managing your inventory with the Stockiffy
              Inventory mobile app for Android & iOS.
            </p>
          </div>
          <div className="relative flex flex-row gap-x-5 pt-6 justify-center items-center">
            <Image
              src={mobileImage}
              alt="mobile-image"
              width={150}
              height={250}
            />
            <div className="flex flex-col items-start gap-y-5">
              <Image src={mobileQr} alt="QR code" width={70} height={70} />
              <Link
                href={"/dashboard/home"}
                className="flex text-blue-500 text-nowrap gap-x-0.25 items-center"
              >
                Learn More <FaArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section: 3/4 width on md and up */}
        <div className="w-full md:w-3/4 flex flex-col gap-6 px-5 py-7 text-gray-500">
          {/* 3 Responsive Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold mb-1 uppercase">
                Other Stockiffy Apps
              </h4>
              <nav className="space-y-3 mt-5">
                <Link href="/dashboard/home" className="block text-sm ">
                  Accounting Software
                </Link>
                <Link href="/dashboard/home" className="block text-sm ">
                  Ecommerce Software
                </Link>
                <Link href="/dashboard/home" className="block text-sm ">
                  Subscription Software
                </Link>
                <Link href="/dashboard/home" className="block text-sm ">
                  100% Free Invoicing Solution
                </Link>
                <Link href="/dashboard/home" className="block text-sm ">
                  Expense Reporting
                </Link>
                <Link href="/dashboard/home" className="block text-sm ">
                  Simple Online Payment
                </Link>
                <Link href="/dashboard/home" className="block text-sm ">
                  SRM & Other Apps
                </Link>
              </nav>
            </div>
            <div>
              <h4 className="font-semibold mb-1 uppercase">Help & Support</h4>
              <nav className="space-y-3 mt-5">
                <Link href="/dashboard/home" className="block text-sm ">
                  Contact Support
                </Link>
                <Link href="/dashboard/home" className="block text-sm ">
                  Help Documentation
                </Link>
                <Link href="/dashboard/home" className="block text-sm ">
                  Register for webinars
                </Link>
                <Link href="/dashboard/home" className="block text-sm ">
                  FAQ
                </Link>
              </nav>
            </div>
            <div>
              <h4 className="font-semibold mb-1 uppercase">QUICK LINKS</h4>
              <nav className="space-y-3 mt-5">
                <Link href="/dashboard/home" className="block text-sm ">
                  Getting Started
                </Link>
                <Link href="/dashboard/home" className="block text-sm ">
                  Mobile apps
                </Link>
                <Link href="/dashboard/home" className="block text-sm ">
                  Add-ons
                </Link>
                <Link href="/dashboard/home" className="block text-sm ">
                  What's New?
                </Link>
              </nav>
            </div>
          </div>

          {/* Bottom content spanning 3 columns */}
          <div className="flex flex-row p-4 text-center gap-x-4 border-t border-neutral-300">
            <div className="flex w-12 h-12 rounded-full bg-blue-200 text-blue-500 justify-center items-center">
              <FiPhone size={25} />
            </div>
            <div className="flex flex-col items-start gap-y-1 text-normal text-gray-800">
              <span>
                You can directly talk to us every{" "}
                <b>Monday to Friday 8:00 AM to 5:00 PM</b>
              </span>
              <span>
                Stockiffy Inventory Helpline: <b>27 0000 0000</b> (Toll Free)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-200 py-4 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Stockiffy Inventory App. All rights
        reserved.
      </div>
    </footer>
  );
};

export default DashboardFooter;

import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1>Stockify Inventory Management System</h1>
      <Link href={"/dashboard/home"} className="flex justify-center">
        Dashboard
      </Link>
    </div>
  );
}

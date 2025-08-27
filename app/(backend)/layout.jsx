import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
export default function BackendLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-[15%] w-[85%] max-w-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

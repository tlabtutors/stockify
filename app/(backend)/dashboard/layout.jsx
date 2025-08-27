import Welcome from "@/components/Welcome";
import DashboardFooter from "@/components/DashboardFooter";
export default function DashboardLayout({ children }) {
  return (
    <div>
      <Welcome />
      {children}
      <DashboardFooter />
    </div>
  );
}

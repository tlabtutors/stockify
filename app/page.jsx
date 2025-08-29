import DashboardFooter from "@/components/DashboardFooter";
import Hero from "@/components/Front/Hero";
import Navigation from "@/components/Front/Navigation";
import SquareOne from "./(frontend)/SquareOne";
import SquareTwo from "./(frontend)/SquareTwo";
import PricingPlans from "@/components/Front/PricingPlans";
export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <Navigation />
      <Hero />
      <SquareOne />
      <SquareTwo />
      <PricingPlans />
      <DashboardFooter />
    </div>
  );
}

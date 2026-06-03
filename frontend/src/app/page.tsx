import Navigation from "@/components/navigation/Navigation";
import Hero from "@/sections/hero/Hero";
import WhyThisProperty from "@/sections/why-this-property/WhyThisProperty";
import RetailLuxury from "@/sections/retail-luxury/RetailLuxury";
import DiningEntertainment from "@/sections/dining-entertainment/DiningEntertainment";
import EventsSponsorship from "@/sections/events-sponsorship/EventsSponsorship";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-background text-foreground">
      <Navigation />
      <Hero />
      <WhyThisProperty />
      <RetailLuxury />
      <DiningEntertainment />
      <EventsSponsorship />
    </main>
  );
}

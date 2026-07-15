import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Classes from "@/components/Classes";
import Trainers from "@/components/Trainers";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import ScrollBand from "@/components/ScrollBand";

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <Navbar />
      <main className="relative z-10 overflow-x-hidden">
        <Hero />
        <Stats />
        <About />
        <ScrollBand variant="green" />
        <Services />
        <Classes />
        <Trainers />
        <ScrollBand variant="dark" />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

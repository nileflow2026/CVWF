import React from "react";
import Navigation from "../src/components/Navigation";
import HeroSection from "../src/components/HeroSection";
import ImpactStats from "../src/components/ImpactStats";
import FeaturedPrograms from "../src/components/FeaturedPrograms";
import TestimonialsSection from "../src/components/TestimonialsSection";
import VolunteerCTA from "../src/components/VolunteerCTA";
import Footer from "../src/components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/*  <Navigation /> */}
        <HeroSection />
        <ImpactStats />
        <FeaturedPrograms />
        <TestimonialsSection />
        <VolunteerCTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

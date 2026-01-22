import React from "react";
import Header from "../../components/home/HomeMainHeader";
import Hero from "../../components/home/Hero";
import TrustLogos from "../../components/home/TrustLogos";
import Pricing from "../../components/home/Pricing";
import FAQ from "../../components/home/FAQ";
import Footer from "../../components/home/Footer";

import LearnerOutcomes from "../../components/home/LearnerOutcomes";
import CareerSkills from "../../components/home/CareerSkills";
import ProgramSearch from "../../components/home/ProgramSearch";
import Testimonials from "../../components/home/Testimonials";
import PlusBanner from "../../components/home/PlusBanner";

const Home: React.FC = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <Hero />
        <TrustLogos />
        <LearnerOutcomes />
        <CareerSkills />
        <ProgramSearch />

        <Testimonials />
        <div className="container mx-auto px-4 md:px-8">
          <Pricing />
        </div>
        <FAQ />
        <PlusBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

import React from "react";
import { IMAGES } from "../../constants/images"; 

const TrustLogos: React.FC = () => (
  <section className="bg-white py-12 md:py-16 border-b border-border-muted overflow-hidden">
    <div className="container mx-auto px-4 md:px-8">
      <h2 className="text-[20px] md:text-[31px] font-normal text-text-primary mb-8 text-center md:text-left">
        Learn from 350+ top universities and companies
      </h2>

      {}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap items-center justify-center lg:justify-between gap-y-8 gap-x-8 md:gap-12 opacity-80">
        <img
          src={IMAGES.LOGOS.ILLINOIS}
          alt="Illinois"
          className="h-8 md:h-10 w-35 object-contain mx-auto"
        />
        <img
          src={IMAGES.LOGOS.DUKE}
          alt="Duke"
          className="h-8 md:h-10 w-auto object-contain mx-auto"
        />
        <img
          src={IMAGES.LOGOS.GOOGLE}
          alt="Google"
          className="h-8 md:h-10 w-auto object-contain mx-auto"
        />
        <img
          src={IMAGES.LOGOS.UMICH}
          alt="Michigan"
          className="h-10 md:h-12 w-auto object-contain mx-auto"
        />
        <img
          src={IMAGES.LOGOS.IBM}
          alt="IBM"
          className="h-8 md:h-10 w-auto object-contain mx-auto"
        />
        <img
          src={IMAGES.LOGOS.VANDERBILT}
          alt="Vanderbilt"
          className="h-8 md:h-10 w-auto object-contain mx-auto"
        />
        <img
          src={IMAGES.LOGOS.PENN}
          alt="Penn"
          className="h-8 md:h-10 w-auto object-contain mx-auto"
        />
      </div>
    </div>
  </section>
);

export default TrustLogos;


















































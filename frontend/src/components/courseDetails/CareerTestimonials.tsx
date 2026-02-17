import React from "react";
import { IMAGES } from "../../constants/images";

const CareerTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Felipe M.",
      title: "Learner since 2018",
      quote:
        "To be able to take courses at my own pace and rhythm has been an amazing experience. I can learn whenever it fits my schedule and mood.",
      image: IMAGES.TESTIMONIALS.T1,
    },
    {
      name: "Jennifer J.",
      title: "Learner since 2020",
      quote:
        "I directly applied the concepts and skills I learned from my courses to an exciting new project at work.",
      image: IMAGES.TESTIMONIALS.T2,
    },
    {
      name: "Larry W.",
      title: "Learner since 2021",
      quote:
        "When I need courses on topics that my university doesn't offer, Coursera is one of the best places to go.",
      image: IMAGES.TESTIMONIALS.T3,
    },
    {
      name: "Chaitanya A.",
      title: "Learner since 2021",
      quote:
        "Learning isn't just about being better at your job: it's so much more than that. Coursera allows me to learn without limits.",
      image: IMAGES.TESTIMONIALS.T4,
    },
  ];

  return (
    <section>
      <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-normal text-gray-dark-3 mb-6 sm:mb-8">
        Why people choose Coursera for their career
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-[10px] p-4 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-[56px] h-[56px] rounded-full overflow-hidden">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-[13px] font-semibold text-gray-dark-3">
                  {t.name}
                </h4>
                <span className="text-[11px] text-gray-500">{t.title}</span>
              </div>
            </div>
            <p className="text-[14px] sm:text-[15px] text-shade-11-alt leading-relaxed italic">
              "{t.quote}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerTestimonials;



















































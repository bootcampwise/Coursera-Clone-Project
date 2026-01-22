import React from "react";

const CareerTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Kelly M.",
      title: "Learner since 2022",
      quote:
        "The specialization was well-structured and the material was engaging. I feel much more confident in my ability to use AI tools at work.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    },
    {
      name: "Daniel S.",
      title: "Learner since 2023",
      quote:
        "Great insights into how LLMs work. The hands-on projects helped me apply the concepts immediately to my daily tasks.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    },
    {
      name: "Sarah L.",
      title: "Learner since 2021",
      quote:
        "The instructors were very knowledgeable. I appreciate the practical approach to prompting and effective communication with AI.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    },
    {
      name: "Michael R.",
      title: "Learner since 2024",
      quote:
        "This course provided a thorough understanding of Prompt Engineering. Highly recommended for anyone looking to upskill in AI.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    },
  ];

  return (
    <section>
      <h2 className="text-[28px] font-bold text-[#1f1f1f] mb-12">
        Why people choose Coursera for their career
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden mb-6 border-4 border-blue-50 shadow-sm">
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-[16px] font-bold text-[#1f1f1f]">{t.name}</h4>
            <span className="text-[13px] text-gray-500 mb-4">{t.title}</span>
            <p className="text-[14px] text-gray-700 leading-relaxed italic">
              "{t.quote}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerTestimonials;

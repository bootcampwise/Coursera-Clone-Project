import React from "react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Abigail P.",
      quote:
        '"I have a full-time job and 3 kids. I needed the flexibility offered by Coursera Plus in order to achieve my goals. My Coursera Plus subscription motivated me to keep learning."',
      image:
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/60SA8pTxPiCoz7qCq18jJ/b8add10e53a25dcb5623049b7754f24c/Abigail_P.png?auto=format%2Ccompress&dpr=1&w=200&h=200",
    },
    {
      name: "Shi Jie F.",
      quote:
        '"Coursera Plus keeps me motivated to learn. With each course, I\'m getting more value out of my subscription. I can access almost anything with Coursera Plus!"',
      image:
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/779G1pM8vdYwW8g8Yc8k8/4dcb109e4468d60d5754407515152528/Shi_Jie_F.png?auto=format%2Ccompress&dpr=1&w=200&h=200",
    },
    {
      name: "Inés K.",
      quote:
        '"I really appreciate the flexibility I get with Coursera Plus. I can try any course and switch to another one for no additional cost. This motivates me to learn even more!"',
      image:
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/2J14j94j79447444/782d44964648488e788484444988/Ines_K.png?auto=format%2Ccompress&dpr=1&w=200&h=200",
    },
  ];

  return (
    <section className="bg-white pb-24">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-[24px] md:text-[32px] font-semibold text-text-primary mb-8 md:mb-12 font-sans text-center md:text-left">
          What subscribers are achieving through learning
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-border-muted p-8 shadow-sm h-full flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div className="flex items-center gap-4 mb-6 w-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[60px] h-[60px] rounded-full object-cover"
                />
                <span className="font-bold text-text-primary text-[14px]">
                  {item.name}
                </span>
              </div>
              <p className="text-[14px] leading-relaxed text-text-primary">
                {item.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


















































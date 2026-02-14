
import { IMAGES } from "../../constants/images";
const INVEST_CARDS = [
  {
    icon: IMAGES.GOAL,
    title: "Explore new skills",
    description:
      "Access 10,000+ courses in AI, business, technology, and more.",
  },
  {
    icon: IMAGES.EARN,
    title: "Earn valuable credentials",
    description:
      "Get certificates for every course you finish and boost your chances of getting hired after your trial ends at no additional cost.",
  },
  {
    icon: IMAGES.STAR,
    title: "Learn from the best",
    description:
      "Take your skills to the next level with expert-led courses and Coursera Coach, your AI-powered guide.",
  },
];

const InvestCareer = () => {
  return (
    <section className="w-full min-h-[296px] bg-blue-ultra-light flex items-center py-12 md:py-0">
      <div className="container px-4 md:px-8 mx-auto w-full">
        {}
        <h2 className="font-normal text-[25.49px] leading-[24.74px] text-brown-dark mb-10">
          Invest in your career
        </h2>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {INVEST_CARDS.map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-start text-left  max-w-[320px] mx-auto"
            >
              {}
              <img
                src={card.icon}
                alt={card.title}
                className="h-[32px] w-auto object-contain mb-4"
              />

              {}
              <h3 className="font-normal text-[17.24px] leading-[18.74px] text-dark-purple mb-2">
                {card.title}
              </h3>

              {}
              <p className="font-normal text-[13.49px] leading-[14.24px] text-dark-brown">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestCareer;

















































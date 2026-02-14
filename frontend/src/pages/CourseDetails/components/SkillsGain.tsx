import React from "react";

const SkillsGain: React.FC = () => {
  const skills = [
    "Fine-Tuning",
    "Creative Writing",
    "Cognition",
    "Prompt Engineering",
    "Prompting",
    "Gemini",
    "Critical Thinking",
    "Machine Learning",
    "Generative AI",
    "Personalization",
    "Problem Solving",
    "Communication",
  ];

  return (
    <section>
      <h2 className="text-[20px] font-normal text-gray-dark-3 mb-4">
        Skills you'll gain
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 bg-gray-100/80 rounded-full text-[12px] font-normal text-shade-5-alt hover:bg-gray-200 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
      <button className="mt-3 text-[12px] text-primary font-semibold hover:underline">
        View all skills
      </button>
    </section>
  );
};

export default SkillsGain;



















































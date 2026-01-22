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
      <h2 className="text-[24px] font-bold text-[#1f1f1f] mb-6">
        Skills you'll gain
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 bg-gray-100/80 rounded-full text-[13px] font-medium text-gray-700 hover:bg-gray-200 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SkillsGain;

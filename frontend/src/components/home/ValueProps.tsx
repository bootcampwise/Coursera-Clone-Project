import React from "react";

const ValueProps: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-surface">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-[24px] md:text-[32px] font-medium text-text-primary mb-12">
          Invest in your career
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {}
          <div className="flex flex-col gap-4">
            {}
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mb-2">
              {}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
            </div>

            <h3 className="text-[20px] font-semibold text-text-primary">
              Explore new skills
            </h3>
            <p className="text-[16px] text-text-primary leading-relaxed">
              Access 10,000+ courses in AI, business, technology, and more.
            </p>
          </div>

          {}
          <div className="flex flex-col gap-4">
            {}
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>
            </div>

            <h3 className="text-[20px] font-semibold text-text-primary">
              Earn valuable <span className="text-blue-accent">credentials</span>
            </h3>
            <p className="text-[16px] text-text-primary leading-relaxed">
              Get certificates for every course you finish and boost your
              chances <span className="text-blue-accent">of getting hired</span>{" "}
              <span className="text-blue-accent">after your trial</span> ends at
              no additional cost.
            </p>
          </div>

          {}
          <div className="flex flex-col gap-4">
            {}
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </div>

            <h3 className="text-[20px] font-semibold text-text-primary">
              Learn from the best
            </h3>
            <p className="text-[16px] text-text-primary leading-relaxed">
              Take your skills to <span className="text-blue-accent">the</span>{" "}
              next level with expert-led courses and Coursera Coach, your
              AI-powered guide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProps;


















































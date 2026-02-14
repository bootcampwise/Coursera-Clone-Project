export interface Accomplishment {
  id: number;
  title: string;
  type: "Course" | "Specialization" | "Professional Certificate";
  grade?: string;
  completedAt?: string;
  image: string;
}

export interface Recommendation {
  id: number;
  title: string;
  partner: string;
  partnerLogo: string;
  image: string;
  type: "Course" | "Specialization" | "Professional Certificate";
  rating?: number;
  students?: string;
}

export const accomplishments: Accomplishment[] = [
  {
    id: 1,
    title: "Google Data Analytics",
    type: "Professional Certificate",
    grade: "96.55%",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/specialization_icon/google-data-analytics-professional-certificate.png?auto=format%2Ccompress&dpr=1&w=150&h=150",
  },
  {
    id: 2,
    title: "Ask Questions to Make Data-Driven Decisions",
    type: "Course",
    grade: "97.45%",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/c6/1330307ee8473da5951d3844697966/Ask-Questions-to-Make-Data-Driven-Decisions.png?auto=format%2Ccompress&dpr=1&w=150&h=150",
  },
  {
    id: 3,
    title: "Foundations: Data, Data, Everywhere",
    type: "Course",
    grade: "98.25%",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/12/48622c368d4004900a0be989a19cda/Foundations--Data-Data-Everywhere.png?auto=format%2Ccompress&dpr=1&w=150&h=150",
  },
  {
    id: 4,
    title: "Prepare Data for Exploration",
    type: "Course",
    grade: "99.00%",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/7b/062837330744fb9a6e6040858e37a8/Prepare-Data-for-Exploration.png?auto=format%2Ccompress&dpr=1&w=150&h=150",
  },
  {
    id: 5,
    title: "Process Data from Dirty to Clean",
    type: "Course",
    grade: "98.75%",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/39/e43701389e4726b27d532b26090c23/Process-Data-from-Dirty-to-Clean.png?auto=format%2Ccompress&dpr=1&w=150&h=150",
  },
];

export const googlePromoRecommendations: Recommendation[] = [
  {
    id: 1,
    title: "Google Project Management: Professional Certificate",
    partner: "Google",
    partnerLogo:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/4a/cb36835ae3421187080898a7eb9a2d/google-logo.png?auto=format%2Ccompress&dpr=1&w=25&h=25",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/specialization_icon/google-project-management.png?auto=format%2Ccompress&dpr=1&w=300&h=300",
    type: "Professional Certificate",
  },
  {
    id: 2,
    title: "Google UX Design: Professional Certificate",
    partner: "Google",
    partnerLogo:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/4a/cb36835ae3421187080898a7eb9a2d/google-logo.png?auto=format%2Ccompress&dpr=1&w=25&h=25",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/specialization_icon/google-ux-design.png?auto=format%2Ccompress&dpr=1&w=300&h=300",
    type: "Professional Certificate",
  },
  {
    id: 3,
    title: "Google IT Support: Professional Certificate",
    partner: "Google",
    partnerLogo:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/4a/cb36835ae3421187080898a7eb9a2d/google-logo.png?auto=format%2Ccompress&dpr=1&w=25&h=25",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/specialization_icon/google-it-support.png?auto=format%2Ccompress&dpr=1&w=300&h=300",
    type: "Professional Certificate",
  },
];

export const topPicks: Recommendation[] = [
  {
    id: 1,
    title: "Python for Everybody",
    partner: "University of Michigan",
    partnerLogo:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/73/e00b10e97211e4b85c29215904836e/University-of-Michigan.png?auto=format%2Ccompress&dpr=1&w=25&h=25",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/specialization_icon/python-for-everybody.png?auto=format%2Ccompress&dpr=1&w=300&h=300",
    type: "Specialization",
  },
  {
    id: 2,
    title: "IBM Data Science",
    partner: "IBM",
    partnerLogo:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/bb/f5a6300d8f11e6878c895240523e05/IBM-Logo-Blk---Rect.png?auto=format%2Ccompress&dpr=1&w=25&h=25",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/specialization_icon/ibm-data-science.png?auto=format%2Ccompress&dpr=1&w=300&h=300",
    type: "Professional Certificate",
  },
  {
    id: 3,
    title: "Machine Learning",
    partner: "Stanford University",
    partnerLogo:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/70/7311707dcc11e59265213601815d96/Stanford_Coursera_200x200.png?auto=format%2Ccompress&dpr=1&w=25&h=25",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/specialization_icon/machine-learning-specialization.png?auto=format%2Ccompress&dpr=1&w=300&h=300",
    type: "Specialization",
  },
];

export interface Degree {
  id: number;
  title: string;
  university: string;
  logo: string;
  image: string;
  description: string;
}

export const recentlyViewed: Recommendation[] = [
  {
    id: 1,
    title: "Google UX Design",
    partner: "Google",
    partnerLogo:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/4a/cb36835ae3421187080898a7eb9a2d/google-logo.png?auto=format%2Ccompress&dpr=1&w=25&h=25",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/specialization_icon/google-ux-design.png?auto=format%2Ccompress&dpr=1&w=300&h=300",
    type: "Professional Certificate",
    rating: 4.8,
    students: "100k",
  },
  {
    id: 2,
    title: "IBM Data Analyst",
    partner: "IBM",
    partnerLogo:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/bb/f5a6300d8f11e6878c895240523e05/IBM-Logo-Blk---Rect.png?auto=format%2Ccompress&dpr=1&w=25&h=25",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/specialization_icon/ibm-data-analyst.png?auto=format%2Ccompress&dpr=1&w=300&h=300",
    type: "Professional Certificate",
    rating: 4.7,
    students: "50k",
  },
  {
    id: 3,
    title: "Machine Learning",
    partner: "Stanford University",
    partnerLogo:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/70/7311707dcc11e59265213601815d96/Stanford_Coursera_200x200.png?auto=format%2Ccompress&dpr=1&w=25&h=25",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/specialization_icon/machine-learning-specialization.png?auto=format%2Ccompress&dpr=1&w=300&h=300",
    type: "Specialization",
    rating: 4.9,
    students: "200k",
  },
];

export const degrees: Degree[] = [
  {
    id: 1,
    title: "Master of Computer Science",
    university: "University of Illinois",
    logo: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/53/788d748f3b497b8764b7327d6326e0/University-of-Illinois-Urbana-Champaign.png?auto=format%2Ccompress&dpr=1&w=25&h=25",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/degree_icon/illinois-mcs.png?auto=format%2Ccompress&dpr=1&w=300&h=300",
    description: "100% Online Master's Degree",
  },
  {
    id: 2,
    title: "Bachelor of Science in Computer Science",
    university: "University of London",
    logo: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/86/3c0540a97a11e793e795c613e527f3/University-of-London.png?auto=format%2Ccompress&dpr=1&w=25&h=25",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/degree_icon/london-bsc-cs.png?auto=format%2Ccompress&dpr=1&w=300&h=300",
    description: "100% Online Bachelor's Degree",
  },
  {
    id: 3,
    title: "Master of Business Administration (iMBA)",
    university: "University of Illinois",
    logo: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/53/788d748f3b497b8764b7327d6326e0/University-of-Illinois-Urbana-Champaign.png?auto=format%2Ccompress&dpr=1&w=25&h=25",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/degree_icon/illinois-imba.png?auto=format%2Ccompress&dpr=1&w=300&h=300",
    description: "100% Online Master's Degree",
  },
];



















































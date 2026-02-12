import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const courses = [
  {
    title: "Python Programming Masterclass",
    subtitle: "Master Python from beginner to advanced with hands-on projects",
    category: "Development",
    difficulty: "Beginner",
    language: "English",
    price: 49.99,
    status: "Published",
    description:
      "Learn Python programming from scratch with practical examples and real-world projects. Perfect for beginners who want to start their coding journey.",
    outcomes:
      "Build Python applications, Understand OOP concepts, Work with databases, Create web applications with Flask",
    thumbnail:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Advanced JavaScript & ES6+",
    subtitle: "Deep dive into modern JavaScript features and best practices",
    category: "Development",
    difficulty: "Advanced",
    language: "English",
    price: 0,
    status: "Published",
    description:
      "Master advanced JavaScript concepts including ES6+, async programming, closures, and modern development patterns.",
    outcomes:
      "Master ES6+ features, Understand async/await, Work with Promises, Build scalable applications",
    thumbnail:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Data Science Fundamentals",
    subtitle: "Learn data analysis, visualization, and machine learning basics",
    category: "Data Science",
    difficulty: "Intermediate",
    language: "English",
    price: 79.99,
    status: "Published",
    description:
      "Comprehensive introduction to data science covering Python, pandas, NumPy, and basic machine learning algorithms.",
    outcomes:
      "Analyze data with Python, Create visualizations, Build ML models, Work with real datasets",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "React & Redux Complete Guide",
    subtitle: "Build modern web applications with React and Redux",
    category: "Development",
    difficulty: "Intermediate",
    language: "English",
    price: 59.99,
    status: "Published",
    description:
      "Learn to build professional React applications with Redux state management, hooks, and modern development practices.",
    outcomes:
      "Build React apps, Manage state with Redux, Use React Hooks, Deploy production apps",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Digital Marketing Strategy",
    subtitle: "Master SEO, content marketing, and social media strategies",
    category: "Business",
    difficulty: "Beginner",
    language: "English",
    price: 39.99,
    status: "Published",
    description:
      "Learn comprehensive digital marketing strategies to grow your business online through SEO, content marketing, and social media.",
    outcomes:
      "Plan marketing campaigns, Master SEO basics, Create content strategies, Analyze marketing metrics",
    thumbnail:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Machine Learning A-Z",
    subtitle: "Complete hands-on machine learning course with Python",
    category: "Data Science",
    difficulty: "Advanced",
    language: "English",
    price: 89.99,
    status: "Published",
    description:
      "Master machine learning algorithms from linear regression to deep learning with practical implementations in Python.",
    outcomes:
      "Build ML models, Understand algorithms, Work with neural networks, Deploy ML solutions",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "UI/UX Design Principles",
    subtitle: "Create beautiful and user-friendly interfaces",
    category: "Design",
    difficulty: "Beginner",
    language: "English",
    price: 0,
    status: "Published",
    description:
      "Learn the fundamentals of UI/UX design, from wireframing to prototyping, and create stunning user interfaces.",
    outcomes:
      "Design user interfaces, Create wireframes, Build prototypes, Conduct user research",
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Node.js & Express Backend Development",
    subtitle: "Build scalable server-side applications with Node.js",
    category: "Development",
    difficulty: "Intermediate",
    language: "English",
    price: 54.99,
    status: "Published",
    description:
      "Learn to build robust RESTful APIs and server-side applications using Node.js, Express, and MongoDB.",
    outcomes:
      "Build REST APIs, Work with databases, Implement authentication, Deploy Node apps",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Business Analytics & Intelligence",
    subtitle: "Transform data into actionable business insights",
    category: "Business",
    difficulty: "Intermediate",
    language: "English",
    price: 69.99,
    status: "Published",
    description:
      "Learn to analyze business data, create dashboards, and make data-driven decisions using modern analytics tools.",
    outcomes:
      "Analyze business metrics, Create dashboards, Generate insights, Make data-driven decisions",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Cloud Computing with AWS",
    subtitle: "Master Amazon Web Services from basics to advanced",
    category: "Information Technology",
    difficulty: "Advanced",
    language: "English",
    price: 99.99,
    status: "Published",
    description:
      "Comprehensive guide to AWS cloud services including EC2, S3, Lambda, and cloud architecture best practices.",
    outcomes:
      "Deploy cloud infrastructure, Use AWS services, Design scalable systems, Implement cloud security",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
  },
];

async function seedCourses() {
  try {
    console.log("🌱 Starting course seeding...\n");

    const instructor = await prisma.user.findUnique({
      where: { email: "instructor12@gmail.com" },
    });

    if (!instructor) {
      console.error(
        "❌ Instructor with email instructor12@gmail.com not found!",
      );
      console.log(
        "Please create the instructor first or provide the correct email.",
      );
      return;
    }

    console.log(
      `✅ Found instructor: ${instructor.name} (ID: ${instructor.id})\n`,
    );

    let createdCount = 0;

    for (const courseData of courses) {
      const course = await prisma.course.create({
        data: {
          ...courseData,
          instructorId: instructor.id,
        },
      });
      createdCount++;
      console.log(`✅ Created: ${course.title} (${course.difficulty})`);
    }

    console.log(`\n🎉 Successfully created ${createdCount} courses!`);
  } catch (error) {
    console.error("❌ Error seeding courses:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCourses();

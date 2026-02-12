import { PrismaClient, LessonType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // 1. Create Instructor
  const instructorEmail = "instructor@example.com";
  let instructor = await prisma.user.findUnique({
    where: { email: instructorEmail },
  });

  if (!instructor) {
    instructor = await prisma.user.create({
      data: {
        name: "John Doe",
        email: instructorEmail,
        passwordHash: "hashed_password_123", // In a real app, hash this properly
        role: "instructor",
        avatarUrl: "https://i.pravatar.cc/150?u=instructor",
      },
    });
    console.log(`Created instructor: ${instructor.name}`);
  } else {
    console.log(`Using existing instructor: ${instructor.name}`);
  }

  // 2. Create Course
  const course = await prisma.course.create({
    data: {
      title: "The Complete Web Development Bootcamp",
      subtitle: "Become the full-stack developer",
      description:
        "Learn Web Development by building 25 websites and mobile apps using HTML, CSS, Javascript, React, Node.js, and more!",
      outcomes:
        "Build any website you want;Master backend development with Node;Build full-stack apps with React",
      category: "Web Development",
      difficulty: "Beginner",
      language: "English",
      thumbnail:
        "https://img-c.udemycdn.com/course/750x422/1565838_e54e_18.jpg", // Placeholder
      price: 19.99,
      status: "Published",
      instructorId: instructor.id,
      modules: {
        create: [
          {
            title: "Introduction to HTML",
            order: 1,
            lessons: {
              create: [
                {
                  title: "What is HTML?",
                  type: LessonType.VIDEO,
                  description: "Introduction to HyperText Markup Language",
                  videoUrl: "https://www.youtube.com/watch?v=kUMe1FH4CHE", // Sample video
                  duration: 600,
                  order: 1,
                },
                {
                  title: "HTML Tags & Elements",
                  type: LessonType.READING,
                  content:
                    "<h1>HTML Tags</h1><p>Tags are the building blocks...</p>",
                  duration: 300,
                  order: 2,
                },
              ],
            },
          },
          {
            title: "CSS Styling",
            order: 2,
            lessons: {
              create: [
                {
                  title: "CSS Selectors",
                  type: LessonType.VIDEO,
                  description: "Learn how to select elements",
                  videoUrl: "https://www.youtube.com/watch?v=1PnVor36_40",
                  duration: 900,
                  order: 1,
                },
              ],
            },
          },
          {
            title: "Javascript Basics",
            order: 3,
            lessons: {
              create: [
                {
                  title: "Variables and Data Types",
                  type: LessonType.VIDEO,
                  duration: 1200,
                  order: 1,
                },
              ],
            },
          },
        ],
      },
      assessments: {
        create: [
          {
            title: "Web Dev Basics Quiz",
            questions: {
              create: [
                {
                  text: "What does HTML stand for?",
                  options: [
                    "Hyper Text Markup Language",
                    "Home Tool Markup Language",
                    "Hyperlinks and Text Markup Language",
                  ],
                  correctIndex: 0,
                },
                {
                  text: "Which character is used to indicate an end tag?",
                  options: ["^", "/", "*"],
                  correctIndex: 1,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`Created course: ${course.title}`);

  // 3. Create another course (Data Science)
  const dsCourse = await prisma.course.create({
    data: {
      title: "Data Science A-Z™: Real-Life Data Science Exercises Included",
      subtitle:
        "Learn Data Science step by step through real Analytics examples. Data Mining, Modeling, Tableau Visualization and more!",
      description:
        "Learn Data Science step by step through real Analytics examples.",
      category: "Data Science",
      difficulty: "Intermediate",
      language: "English",
      thumbnail: "https://img-c.udemycdn.com/course/750x422/903744_8eb2.jpg",
      price: 24.99,
      status: "Published",
      instructorId: instructor.id,
      modules: {
        create: [
          {
            title: "Data Visualization",
            order: 1,
            lessons: {
              create: [
                {
                  title: "Intro to Tableau",
                  type: LessonType.VIDEO,
                  duration: 1500,
                  order: 1,
                },
              ],
            },
          },
        ],
      },
    },
  });
  console.log(`Created course: ${dsCourse.title}`);

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Find ALL video lessons
  const lessons = await prisma.lesson.findMany({
    where: {
      type: "VIDEO",
    },
  });

  if (lessons.length === 0) {
    console.log("No video lessons found. Please create a course first.");
    return;
  }

  console.log(
    `Found ${lessons.length} video lessons. Seeding Figma mock transcripts...`,
  );

  const transcriptLines = [
    {
      startTime: 1,
      endTime: 38,
      text: "Welcome back. We're moments away from checking out an example of a crit session in action. A standard design critique session is at least 30 minutes, and the designer usually spends five to ten of those minutes presenting. But keep in mind, the session length will depend on the amount of feedback requested and the number of reviewers involved. We don't have time to share a full crit session with you. So the upcoming video is just a snapshot of what usually happens. In the mock crit session, I'll play the role of the presenter, sharing some of the mockups for the dog walker app with two colleagues who were the reviewers.",
      order: 1,
    },
    {
      startTime: 38,
      endTime: 78,
      text: "There will also be a facilitator guiding the flow of the interaction. While you've been working on your mockups throughout this course, so have I. The mockups I'll present in the design critique session are my current iteration of the dog walker app. As the presenter, I'll ask for feedback on two parts of this design, the scheduling flow and the call-to-action buttons. Remember, call-to-action buttons are elements in the design that tell the user to take action. In the dog walker app, the call-to-action buttons are labeled things like \"book appointment\" and \"next.\" You'll have a chance to watch how the flow of ideas and communication happens as I present my work and receive feedback.",
      order: 2,
    },
    {
      startTime: 78,
      endTime: 109,
      text: "As you watch, take note of how I, as the presenter, respond to the feedback I'm receiving. Ask yourself, is the presenter actively listening? Is the presenter taking notes? What types of follow-up questions is the presenter asking? You should also focus on the way that reviewers share their feedback and opinions. Ask yourself, do the reviewers share the reasoning behind their feedback? Do the reviewers focus on problems with the design instead of offering solutions?",
      order: 3,
    },
    {
      startTime: 109,
      endTime: 150,
      text: "Do the reviewers connect their feedback to the objectives of the design critique session? With these questions in mind, let's join the crit session. Meet you there.",
      order: 4,
    },
  ];

  for (const lesson of lessons) {
    console.log(
      `Seeding transcript for lesson: ${lesson.title} (${lesson.id})`,
    );

    // Clear existing transcript for this lesson
    await prisma.transcriptLine.deleteMany({
      where: { lessonId: lesson.id },
    });

    // Create new transcript lines
    for (const line of transcriptLines) {
      await prisma.transcriptLine.create({
        data: {
          ...line,
          lessonId: lesson.id,
        },
      });
    }
  }

  console.log(
    "Figma mock transcripts for ALL video lessons successfully seeded!",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function fixInstructor() {
  const email = "instructor12@gmail.com";
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    console.log(`User ${email} not found. Please register first.`);
    return;
  }

  console.log(`Current role for ${email}: ${user.role}`);

  if (user.role !== "instructor") {
    await prisma.user.update({
      where: { email },
      data: { role: "instructor" },
    });
    console.log(`Updated role to 'instructor' for ${email}`);
  } else {
    console.log(`${email} already has the 'instructor' role.`);
  }

  await prisma.$disconnect();
}

fixInstructor().catch(console.error);

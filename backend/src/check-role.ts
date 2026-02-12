import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userId = "69776dce74746b5bd85801f6";

async function main() {
  console.log(`Checking role for user ${userId}...`);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true },
    });
    console.log("User found:", JSON.stringify(user, null, 2));
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

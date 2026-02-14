import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userId = "69776dce74746b5bd85801f6"; 

async function main() {
  console.log(`Promoting user ${userId} to admin...`);
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: "admin" },
    });
    console.log("Success! User updated:", user);
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

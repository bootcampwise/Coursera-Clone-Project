import { prisma } from "../config/prisma";

async function main() {
  

  try {
    const collections = ["User", "users"];

    for (const collectionName of collections) {
      

      
      try {
        const result1 = await prisma.$runCommandRaw({
          update: collectionName,
          updates: [
            {
              q: { createdAt: null },
              u: {
                $set: {
                  createdAt: { $date: new Date().toISOString() },
                  updatedAt: { $date: new Date().toISOString() },
                },
              },
              multi: true,
            },
          ],
        });
        
        } catch (e: unknown) {
        const error = e as { message?: string };
      }

      
      try {
        const result2 = await prisma.$runCommandRaw({
          update: collectionName,
          updates: [
            {
              q: { createdAt: { $exists: false } },
              u: {
                $set: {
                  createdAt: { $date: new Date().toISOString() },
                  updatedAt: { $date: new Date().toISOString() },
                },
              },
              multi: true,
            },
          ],
        });
        
      } catch (e: unknown) {
        const error = e as { message?: string };
      }
    }
  } catch (error) {
    console.error("Error backfilling data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

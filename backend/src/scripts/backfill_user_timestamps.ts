import { prisma } from "../config/prisma";

async function main() {
  console.log("Starting backfill of createdAt and updatedAt...");

  try {
    const collections = ["User", "users"];

    for (const collectionName of collections) {
      console.log(`Attempting update on collection: ${collectionName}`);

      
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
        console.log(
          `Update ${collectionName} (createdAt: null) result:`,
          result1,
        );
      } catch (e: any) {
        console.log(
          `Skipping ${collectionName} (null check) due to error/missing: ${e.message}`,
        );
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
        console.log(
          `Update ${collectionName} (createdAt: missing) result:`,
          result2,
        );
      } catch (e: any) {
        console.log(
          `Skipping ${collectionName} (exists check) due to error/missing: ${e.message}`,
        );
      }
    }
  } catch (error) {
    console.error("Error backfilling data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

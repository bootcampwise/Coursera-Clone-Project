const { PrismaClient } = require('@prisma/client');

try { require('dotenv').config(); } catch (e) {}

const prisma = new PrismaClient();

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
                    updatedAt: { $date: new Date().toISOString() }
                    }
                },
                multi: true
                }
            ]
            });
            
        } catch (e) {
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
                        updatedAt: { $date: new Date().toISOString() }
                    }
                    },
                    multi: true
                }
                ]
            });
            
           } catch (e) {
           }
    }

  } catch (error) {
    console.error('Error backfilling data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

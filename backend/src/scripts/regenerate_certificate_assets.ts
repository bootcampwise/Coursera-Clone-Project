import { prisma } from "../config/prisma";
import { regenerateCertificateAssets } from "../services/certificate.service";

const run = async () => {
  const certificates = await prisma.certificate.findMany({
    select: { id: true },
  });

  for (const cert of certificates) {
    try {
      await regenerateCertificateAssets(cert.id);
      console.log(`Regenerated assets for certificate ${cert.id}`);
    } catch (err) {
      console.error(`Failed to regenerate certificate ${cert.id}`, err);
    }
  }
};

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../config/prisma");
const certificate_service_1 = require("../services/certificate.service");
const run = async () => {
    const certificates = await prisma_1.prisma.certificate.findMany({
        select: { id: true },
    });
    for (const cert of certificates) {
        try {
            await (0, certificate_service_1.regenerateCertificateAssets)(cert.id);
            console.log(`Regenerated assets for certificate ${cert.id}`);
        }
        catch (err) {
            console.error(`Failed to regenerate certificate ${cert.id}`, err);
        }
    }
};
run()
    .then(async () => {
    await prisma_1.prisma.$disconnect();
})
    .catch(async (err) => {
    console.error(err);
    await prisma_1.prisma.$disconnect();
    process.exit(1);
});

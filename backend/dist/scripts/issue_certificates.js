"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../config/prisma");
const certificate_service_1 = require("../services/certificate.service");
const run = async () => {
    const completed = await prisma_1.prisma.enrollment.findMany({
        where: { completed: true },
        select: { id: true },
    });
    for (const e of completed) {
        try {
            await (0, certificate_service_1.issueCertificateForEnrollment)(e.id);
        }
        catch (err) {
            console.error(`Failed to issue for enrollment ${e.id}`, err);
        }
    }
};
run()
    .then(() => {
    console.log("Certificate issuance completed");
    return prisma_1.prisma.$disconnect();
})
    .catch(async (err) => {
    console.error(err);
    await prisma_1.prisma.$disconnect();
    process.exit(1);
});

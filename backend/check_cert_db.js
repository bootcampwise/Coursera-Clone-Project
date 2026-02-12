
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const certId = '698b029507f126f7c15b1cdd';
  try {
    const cert = await prisma.certificate.findUnique({
      where: { id: certId },
    });
    console.log('CERT_RECORD:', JSON.stringify(cert, null, 2));
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}

check();

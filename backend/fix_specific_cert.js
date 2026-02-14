
const { PrismaClient } = require('@prisma/client');
const { issueCertificateForEnrollment } = require('./src/services/certificate.service');
const prisma = new PrismaClient();

async function fix() {
  const certId = '698b029507f126f7c15b1cdd';
  try {
    const cert = await prisma.certificate.findUnique({
      where: { id: certId },
    });

    if (!cert) {
      console.log('CERT_NOT_FOUND:', certId);
      return;
    }

    console.log('Found certificate:', cert.id, 'for enrollment:', cert.enrollmentId);
    
    
    
    const updated = await issueCertificateForEnrollment(cert.enrollmentId);
    console.log('Update result:', JSON.stringify(updated, null, 2));

  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}

fix();

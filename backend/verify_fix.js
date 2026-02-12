
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { name: { contains: 'Ahmad', mode: 'insensitive' } },
          { email: { contains: 'ahmad', mode: 'insensitive' } }
        ]
      }
    });

    if (!user) {
      console.log('USER_NOT_FOUND');
      return;
    }

    console.log('USER_FOUND:', user.id, user.name);

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: user.id },
      include: { course: { select: { title: true } } }
    });

    console.log('ENROLLMENTS:', JSON.stringify(enrollments.map(e => ({
      id: e.id,
      course: e.course.title,
      completed: e.completed
    })), null, 2));

    const certs = await prisma.certificate.findMany({
      where: { userId: user.id },
    });

    console.log('CERTIFICATES:', JSON.stringify(certs, null, 2));

  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}

check();

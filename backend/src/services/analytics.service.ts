import { prisma } from "../config/prisma";

export const getAdminAnalytics = async () => {
  const [
    totalUsers,
    totalCourses,
    totalEnrollments,
    totalReviews,
    recentSignups,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.enrollment.count(),
    prisma.review.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),
  ]);

  // Calculate revenue (sum of price of enrolled courses)
  // This is a simplified calculation assuming all enrollments are paid full price
  // In a real app, you'd track transactions separately
  const paidEnrollments = await prisma.enrollment.findMany({
    include: { course: { select: { price: true } } },
  });

  const totalRevenue = paidEnrollments.reduce(
    (acc, curr) => acc + (curr.course.price || 0),
    0,
  );

  return {
    overview: {
      totalUsers,
      totalCourses,
      totalEnrollments,
      totalReviews,
      totalRevenue,
    },
    recentSignups,
  };
};

export const getInstructorAnalytics = async (instructorId: string) => {
  // Get courses by instructor
  const courses = await prisma.course.findMany({
    where: { instructorId },
    select: { id: true, title: true, price: true },
  });

  const courseIds = courses.map((c) => c.id);

  const [totalEnrollments, totalReviews, enrollmentsByCourse, reviews] =
    await Promise.all([
      prisma.enrollment.count({ where: { courseId: { in: courseIds } } }),
      prisma.review.count({ where: { courseId: { in: courseIds } } }),
      prisma.enrollment.groupBy({
        by: ["courseId"],
        where: { courseId: { in: courseIds } },
        _count: true,
      }),
      prisma.review.findMany({
        where: { courseId: { in: courseIds } },
        select: { rating: true },
      }),
    ]);

  // Calculate total revenue for instructor
  // Assuming 100% share for now, or implement platform fee logic
  // Enrollments need to be fetched with course price to calculate accurately if prices changed
  // Simplified: price * enrollment count
  const revenue = courses.reduce((acc, course) => {
    const enrollment = enrollmentsByCourse.find(
      (e) => e.courseId === course.id,
    );
    const count = enrollment?._count || 0;
    return acc + course.price * count;
  }, 0);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return {
    overview: {
      totalCourses: courses.length,
      totalStudents: totalEnrollments,
      totalReviews,
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalRevenue: revenue,
    },
    courses: courses.map((c) => {
      const enrollment = enrollmentsByCourse.find((e) => e.courseId === c.id);
      return {
        ...c,
        students: enrollment?._count || 0,
      };
    }),
  };
};

import { prisma } from "../config/prisma";

interface CreateCourseData {
  title: string;
  subtitle?: string;
  description: string;
  outcomes?: string;
  category?: string;
  difficulty?: string;
  language?: string;
  thumbnail?: string;
  price?: number;
  status?: string;
  instructorId: string;
}

interface UpdateCourseData {
  title?: string;
  subtitle?: string;
  description?: string;
  outcomes?: string;
  category?: string;
  difficulty?: string;
  language?: string;
  thumbnail?: string;
  price?: number;
  status?: string;
}

interface CourseFilters {
  category?: string;
  difficulty?: string;
  language?: string;
  search?: string;
  status?: string;
}

export const getAllCourses = async (
  page: number = 1,
  limit: number = 10,
  filters: CourseFilters = {},
) => {
  const skip = (page - 1) * limit;

  const where: any = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.category) {
    where.category = filters.category;
  }

  if (filters.difficulty) {
    where.difficulty = filters.difficulty;
  }

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: "insensitive" } },
      { subtitle: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
      { category: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters.language) {
    where.language = filters.language;
  }

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      skip,
      take: limit,
      include: {
        instructor: {
          select: { id: true, name: true, avatarUrl: true },
        },
        _count: {
          select: { enrollments: true, reviews: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.course.count({ where }),
  ]);

  return {
    courses,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getCourseById = async (id: string) => {
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      instructor: {
        select: { id: true, name: true, avatarUrl: true, email: true },
      },
      modules: {
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      },
      reviews: {
        include: {
          user: { select: { id: true, name: true, avatarUrl: true } },
        },
        orderBy: { id: "desc" },
        take: 10,
      },
      _count: {
        select: { enrollments: true, reviews: true },
      },
    },
  });

  if (!course) throw new Error("Course not found");

  return course;
};

export const createCourse = async (data: CreateCourseData) => {
  const course = await prisma.course.create({
    data: {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      outcomes: data.outcomes,
      category: data.category,
      difficulty: data.difficulty,
      language: data.language,
      thumbnail: data.thumbnail,
      price: data.price || 0,
      instructorId: data.instructorId,
      status: data.status || "Draft",
    },
    include: {
      instructor: {
        select: { id: true, name: true, avatarUrl: true },
      },
    },
  });

  return course;
};

export const updateCourse = async (
  id: string,
  userId: string,
  userRole: string,
  data: UpdateCourseData,
) => {
  const course = await prisma.course.findUnique({ where: { id } });

  if (!course) throw new Error("Course not found");

  // Check ownership (instructor can only update their own courses, admin can update any)
  if (userRole.toLowerCase() !== "admin" && course.instructorId !== userId) {
    throw new Error("Not authorized to update this course");
  }

  const updatedCourse = await prisma.course.update({
    where: { id },
    data,
    include: {
      instructor: {
        select: { id: true, name: true, avatarUrl: true },
      },
    },
  });

  return updatedCourse;
};

export const deleteCourse = async (
  id: string,
  userId: string,
  userRole: string,
) => {
  const course = await prisma.course.findUnique({ where: { id } });

  if (!course) throw new Error("Course not found");

  // Check ownership (instructor can only delete their own courses, admin can delete any)
  if (userRole.toLowerCase() !== "admin" && course.instructorId !== userId) {
    throw new Error("Not authorized to delete this course");
  }

  await prisma.course.delete({ where: { id } });

  return { message: "Course deleted successfully" };
};

export const getInstructorCourses = async (instructorId: string) => {
  const courses = await prisma.course.findMany({
    where: { instructorId },
    include: {
      _count: {
        select: { enrollments: true, reviews: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return courses;
};

// --- Module & Lesson Services ---

export const createModule = async (
  courseId: string,
  title: string,
  order: number,
) => {
  return await prisma.module.create({
    data: {
      title,
      order,
      courseId,
    },
  });
};

export const createLesson = async (
  moduleId: string,
  data: {
    title: string;
    order: number;
    videoUrl?: string;
    content?: string;
    duration?: number;
  },
) => {
  return await prisma.lesson.create({
    data: {
      ...data,
      moduleId,
    },
  });
};

export const getCourseContent = async (courseId: string) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!course) throw new Error("Course not found");
  return course.modules;
};

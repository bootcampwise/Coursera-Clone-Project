import { prisma } from "../config/prisma";

interface GoogleUserData {
  email: string;
  name: string;
  providerId: string;
  avatarUrl?: string;
}

export const upsertGoogleUser = async (userData: GoogleUserData) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (existingUser) {
    // Always update user details (avatar, name) to keep sync with Google
    return await prisma.user.update({
      where: { email: userData.email },
      data: {
        provider: "google",
        providerId: userData.providerId,
        avatarUrl: userData.avatarUrl,
        name: userData.name, // Also sync name in case it changed
      },
    });
  }

  // Create new Google user
  const newUser = await prisma.user.create({
    data: {
      email: userData.email,
      name: userData.name,
      provider: "google",
      providerId: userData.providerId,
      avatarUrl: userData.avatarUrl,
      role: "student",
    },
  });

  return newUser;
};

export const getAllUsers = async (
  page: number = 1,
  limit: number = 10,
  role?: string,
) => {
  const skip = (page - 1) * limit;
  const where: any = {};

  if (role) {
    where.role = { equals: role, mode: "insensitive" };
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarUrl: true,
        createdAt: true,
        _count: {
          select: { courses: true, enrollments: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      courses: { select: { id: true, title: true } },
      enrollments: {
        include: { course: { select: { id: true, title: true } } },
      },
    },
  });

  if (!user) throw new Error("User not found");

  // Exclude password hash
  const { passwordHash, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const updateUserRole = async (id: string, role: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");

  const normalizedRole = role.toLowerCase();
  const validRoles = ["student", "instructor", "admin"];

  if (!validRoles.includes(normalizedRole)) {
    throw new Error("Invalid role");
  }

  return await prisma.user.update({
    where: { id },
    data: { role: normalizedRole },
    select: { id: true, name: true, email: true, role: true },
  });
};

export const updateUserProfile = async (
  id: string,
  data: { name?: string; avatarUrl?: string },
) => {
  return await prisma.user.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true, role: true, avatarUrl: true },
  });
};

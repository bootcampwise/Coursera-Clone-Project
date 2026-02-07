import { prisma } from "../config/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

interface GoogleUserData {
  email: string;
  name: string;
  providerId: string;
  avatarUrl?: string;
}

export interface WorkExperienceInput {
  title: string;
  company: string;
  location?: string;
  employmentType?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
}

export interface WorkExperience extends WorkExperienceInput {
  id: string;
  createdAt: string;
}

export interface EducationInput {
  instituteName: string;
  degreeDetails: string;
  startDate: string;
  endDate: string;
}

export interface Education extends EducationInput {
  id: string;
  createdAt: string;
}

export interface ProfileCertificateInput {
  certificateName: string;
  completionDate: string;
}

export interface ProfileCertificate extends ProfileCertificateInput {
  id: string;
  createdAt: string;
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

export const getMyWorkExperiences = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { workExperiences: true },
  });

  if (!user) throw new Error("User not found");

  return (user.workExperiences as WorkExperience[] | null) || [];
};

export const addMyWorkExperience = async (
  userId: string,
  data: WorkExperienceInput,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { workExperiences: true },
  });

  if (!user) throw new Error("User not found");

  const current = (user.workExperiences as WorkExperience[] | null) || [];
  const newItem: WorkExperience = {
    id: crypto.randomUUID(),
    title: data.title.trim(),
    company: data.company.trim(),
    location: data.location?.trim() || "",
    employmentType: data.employmentType?.trim() || "",
    startDate: data.startDate,
    endDate: data.endDate || "",
    isCurrent: Boolean(data.isCurrent),
    description: data.description?.trim() || "",
    createdAt: new Date().toISOString(),
  };

  await prisma.user.update({
    where: { id: userId },
    data: {
      workExperiences: [newItem, ...current] as any,
    },
  });

  return newItem;
};

export const updateMyWorkExperience = async (
  userId: string,
  experienceId: string,
  data: WorkExperienceInput,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { workExperiences: true },
  });

  if (!user) throw new Error("User not found");

  const current = (user.workExperiences as WorkExperience[] | null) || [];
  const idx = current.findIndex((item) => item.id === experienceId);
  if (idx === -1) throw new Error("Work experience not found");

  const existing = current[idx];
  const updatedItem: WorkExperience = {
    ...existing,
    title: data.title.trim(),
    company: data.company.trim(),
    location: data.location?.trim() || "",
    employmentType: data.employmentType?.trim() || "",
    startDate: data.startDate,
    endDate: data.endDate || "",
    isCurrent: Boolean(data.isCurrent),
    description: data.description?.trim() || "",
  };

  const updatedList = [...current];
  updatedList[idx] = updatedItem;

  await prisma.user.update({
    where: { id: userId },
    data: { workExperiences: updatedList as any },
  });

  return updatedItem;
};

export const deleteMyWorkExperience = async (
  userId: string,
  experienceId: string,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { workExperiences: true },
  });

  if (!user) throw new Error("User not found");

  const current = (user.workExperiences as WorkExperience[] | null) || [];
  const exists = current.some((item) => item.id === experienceId);
  if (!exists) throw new Error("Work experience not found");

  const updatedList = current.filter((item) => item.id !== experienceId);

  await prisma.user.update({
    where: { id: userId },
    data: { workExperiences: updatedList as any },
  });

  return { id: experienceId };
};

export const getMyEducations = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { educations: true },
  });

  if (!user) throw new Error("User not found");

  return (user.educations as Education[] | null) || [];
};

export const addMyEducation = async (
  userId: string,
  data: EducationInput,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { educations: true },
  });

  if (!user) throw new Error("User not found");

  const current = (user.educations as Education[] | null) || [];
  const newItem: Education = {
    id: crypto.randomUUID(),
    instituteName: data.instituteName.trim(),
    degreeDetails: data.degreeDetails.trim(),
    startDate: data.startDate,
    endDate: data.endDate,
    createdAt: new Date().toISOString(),
  };

  await prisma.user.update({
    where: { id: userId },
    data: {
      educations: [newItem, ...current] as any,
    },
  });

  return newItem;
};

export const updateMyEducation = async (
  userId: string,
  educationId: string,
  data: EducationInput,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { educations: true },
  });

  if (!user) throw new Error("User not found");

  const current = (user.educations as Education[] | null) || [];
  const idx = current.findIndex((item) => item.id === educationId);
  if (idx === -1) throw new Error("Education not found");

  const existing = current[idx];
  const updatedItem: Education = {
    ...existing,
    instituteName: data.instituteName.trim(),
    degreeDetails: data.degreeDetails.trim(),
    startDate: data.startDate,
    endDate: data.endDate,
  };

  const updatedList = [...current];
  updatedList[idx] = updatedItem;

  await prisma.user.update({
    where: { id: userId },
    data: { educations: updatedList as any },
  });

  return updatedItem;
};

export const deleteMyEducation = async (
  userId: string,
  educationId: string,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { educations: true },
  });

  if (!user) throw new Error("User not found");

  const current = (user.educations as Education[] | null) || [];
  const exists = current.some((item) => item.id === educationId);
  if (!exists) throw new Error("Education not found");

  const updatedList = current.filter((item) => item.id !== educationId);

  await prisma.user.update({
    where: { id: userId },
    data: { educations: updatedList as any },
  });

  return { id: educationId };
};

export const getMyProfileCertificates = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { profileCertificates: true },
  });

  if (!user) throw new Error("User not found");

  return (user.profileCertificates as ProfileCertificate[] | null) || [];
};

export const addMyProfileCertificate = async (
  userId: string,
  data: ProfileCertificateInput,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { profileCertificates: true },
  });

  if (!user) throw new Error("User not found");

  const current = (user.profileCertificates as ProfileCertificate[] | null) || [];
  const newItem: ProfileCertificate = {
    id: crypto.randomUUID(),
    certificateName: data.certificateName.trim(),
    completionDate: data.completionDate,
    createdAt: new Date().toISOString(),
  };

  await prisma.user.update({
    where: { id: userId },
    data: {
      profileCertificates: [newItem, ...current] as any,
    },
  });

  return newItem;
};

export const updateMyProfileCertificate = async (
  userId: string,
  certificateId: string,
  data: ProfileCertificateInput,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { profileCertificates: true },
  });

  if (!user) throw new Error("User not found");

  const current = (user.profileCertificates as ProfileCertificate[] | null) || [];
  const idx = current.findIndex((item) => item.id === certificateId);
  if (idx === -1) throw new Error("Profile certificate not found");

  const existing = current[idx];
  const updatedItem: ProfileCertificate = {
    ...existing,
    certificateName: data.certificateName.trim(),
    completionDate: data.completionDate,
  };

  const updatedList = [...current];
  updatedList[idx] = updatedItem;

  await prisma.user.update({
    where: { id: userId },
    data: { profileCertificates: updatedList as any },
  });

  return updatedItem;
};

export const deleteMyProfileCertificate = async (
  userId: string,
  certificateId: string,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { profileCertificates: true },
  });

  if (!user) throw new Error("User not found");

  const current = (user.profileCertificates as ProfileCertificate[] | null) || [];
  const exists = current.some((item) => item.id === certificateId);
  if (!exists) throw new Error("Profile certificate not found");

  const updatedList = current.filter((item) => item.id !== certificateId);

  await prisma.user.update({
    where: { id: userId },
    data: { profileCertificates: updatedList as any },
  });

  return { id: certificateId };
};

export const deleteUser = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");

  return await prisma.user.delete({
    where: { id },
    select: { id: true, name: true, email: true },
  });
};

export const adminCreateUser = async (userData: {
  name: string;
  email: string;
  password?: string;
  role: string;
}) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const normalizedRole = userData.role.toLowerCase();
  const validRoles = ["student", "instructor", "admin"];
  if (!validRoles.includes(normalizedRole)) {
    throw new Error("Invalid role");
  }

  let passwordHash = null;
  if (userData.password) {
    passwordHash = await bcrypt.hash(userData.password, 10);
  }

  return await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      passwordHash,
      role: normalizedRole,
      provider: "email",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

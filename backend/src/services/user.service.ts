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

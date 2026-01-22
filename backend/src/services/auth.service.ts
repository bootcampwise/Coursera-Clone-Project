import { prisma } from '../config/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '../config/jwt';

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw new Error('Invalid credentials');
  const token = signToken({ sub: user.id, role: user.role });
  return { user: { id: user.id, name: user.name, email: user.email }, token };
};

export const registerUser = async ({ name, email, password }: { name: string; email: string; password: string }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('User already exists');
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, passwordHash, role: 'STUDENT' } as any });
  return { message: 'User registered successfully' , user: { id: user.id, name: user.name, email: user.email }, };
};

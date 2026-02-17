"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCreateUser = exports.deleteUser = exports.deleteMyProfileCertificate = exports.updateMyProfileCertificate = exports.addMyProfileCertificate = exports.getMyProfileCertificates = exports.deleteMyEducation = exports.updateMyEducation = exports.addMyEducation = exports.getMyEducations = exports.deleteMyWorkExperience = exports.updateMyWorkExperience = exports.addMyWorkExperience = exports.getMyWorkExperiences = exports.updateUserProfile = exports.updateUserRole = exports.getUserById = exports.getAllUsers = exports.upsertGoogleUser = void 0;
const prisma_1 = require("../config/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const upsertGoogleUser = async (userData) => {
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: { email: userData.email },
    });
    if (existingUser) {
        return await prisma_1.prisma.user.update({
            where: { email: userData.email },
            data: {
                provider: "google",
                providerId: userData.providerId,
                avatarUrl: userData.avatarUrl,
                name: userData.name,
            },
        });
    }
    const newUser = await prisma_1.prisma.user.create({
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
exports.upsertGoogleUser = upsertGoogleUser;
const getAllUsers = async (page = 1, limit = 10, role) => {
    const skip = (page - 1) * limit;
    const where = {};
    if (role) {
        where.role = { equals: role, mode: "insensitive" };
    }
    const [users, total] = await Promise.all([
        prisma_1.prisma.user.findMany({
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
        prisma_1.prisma.user.count({ where }),
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
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id },
        include: {
            courses: { select: { id: true, title: true } },
            enrollments: {
                include: { course: { select: { id: true, title: true } } },
            },
        },
    });
    if (!user)
        throw new Error("User not found");
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
exports.getUserById = getUserById;
const updateUserRole = async (id, role) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { id } });
    if (!user)
        throw new Error("User not found");
    const normalizedRole = role.toLowerCase();
    const validRoles = ["student", "instructor", "admin"];
    if (!validRoles.includes(normalizedRole)) {
        throw new Error("Invalid role");
    }
    return await prisma_1.prisma.user.update({
        where: { id },
        data: { role: normalizedRole },
        select: { id: true, name: true, email: true, role: true },
    });
};
exports.updateUserRole = updateUserRole;
const updateUserProfile = async (id, data) => {
    return await prisma_1.prisma.user.update({
        where: { id },
        data,
        select: { id: true, name: true, email: true, role: true, avatarUrl: true },
    });
};
exports.updateUserProfile = updateUserProfile;
const getMyWorkExperiences = async (userId) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: { workExperiences: true },
    });
    if (!user)
        throw new Error("User not found");
    return user.workExperiences || [];
};
exports.getMyWorkExperiences = getMyWorkExperiences;
const addMyWorkExperience = async (userId, data) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: { workExperiences: true },
    });
    if (!user)
        throw new Error("User not found");
    const current = user.workExperiences || [];
    const newItem = {
        id: crypto_1.default.randomUUID(),
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
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: {
            workExperiences: [newItem, ...current],
        },
    });
    return newItem;
};
exports.addMyWorkExperience = addMyWorkExperience;
const updateMyWorkExperience = async (userId, experienceId, data) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: { workExperiences: true },
    });
    if (!user)
        throw new Error("User not found");
    const current = user.workExperiences || [];
    const idx = current.findIndex((item) => item.id === experienceId);
    if (idx === -1)
        throw new Error("Work experience not found");
    const existing = current[idx];
    const updatedItem = {
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
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { workExperiences: updatedList },
    });
    return updatedItem;
};
exports.updateMyWorkExperience = updateMyWorkExperience;
const deleteMyWorkExperience = async (userId, experienceId) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: { workExperiences: true },
    });
    if (!user)
        throw new Error("User not found");
    const current = user.workExperiences || [];
    const exists = current.some((item) => item.id === experienceId);
    if (!exists)
        throw new Error("Work experience not found");
    const updatedList = current.filter((item) => item.id !== experienceId);
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { workExperiences: updatedList },
    });
    return { id: experienceId };
};
exports.deleteMyWorkExperience = deleteMyWorkExperience;
const getMyEducations = async (userId) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: { educations: true },
    });
    if (!user)
        throw new Error("User not found");
    return user.educations || [];
};
exports.getMyEducations = getMyEducations;
const addMyEducation = async (userId, data) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: { educations: true },
    });
    if (!user)
        throw new Error("User not found");
    const current = user.educations || [];
    const newItem = {
        id: crypto_1.default.randomUUID(),
        instituteName: data.instituteName.trim(),
        degreeDetails: data.degreeDetails.trim(),
        startDate: data.startDate,
        endDate: data.endDate,
        createdAt: new Date().toISOString(),
    };
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: {
            educations: [newItem, ...current],
        },
    });
    return newItem;
};
exports.addMyEducation = addMyEducation;
const updateMyEducation = async (userId, educationId, data) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: { educations: true },
    });
    if (!user)
        throw new Error("User not found");
    const current = user.educations || [];
    const idx = current.findIndex((item) => item.id === educationId);
    if (idx === -1)
        throw new Error("Education not found");
    const existing = current[idx];
    const updatedItem = {
        ...existing,
        instituteName: data.instituteName.trim(),
        degreeDetails: data.degreeDetails.trim(),
        startDate: data.startDate,
        endDate: data.endDate,
    };
    const updatedList = [...current];
    updatedList[idx] = updatedItem;
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { educations: updatedList },
    });
    return updatedItem;
};
exports.updateMyEducation = updateMyEducation;
const deleteMyEducation = async (userId, educationId) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: { educations: true },
    });
    if (!user)
        throw new Error("User not found");
    const current = user.educations || [];
    const exists = current.some((item) => item.id === educationId);
    if (!exists)
        throw new Error("Education not found");
    const updatedList = current.filter((item) => item.id !== educationId);
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { educations: updatedList },
    });
    return { id: educationId };
};
exports.deleteMyEducation = deleteMyEducation;
const getMyProfileCertificates = async (userId) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: { profileCertificates: true },
    });
    if (!user)
        throw new Error("User not found");
    return user.profileCertificates || [];
};
exports.getMyProfileCertificates = getMyProfileCertificates;
const addMyProfileCertificate = async (userId, data) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: { profileCertificates: true },
    });
    if (!user)
        throw new Error("User not found");
    const current = user.profileCertificates || [];
    const newItem = {
        id: crypto_1.default.randomUUID(),
        certificateName: data.certificateName.trim(),
        completionDate: data.completionDate,
        createdAt: new Date().toISOString(),
    };
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: {
            profileCertificates: [newItem, ...current],
        },
    });
    return newItem;
};
exports.addMyProfileCertificate = addMyProfileCertificate;
const updateMyProfileCertificate = async (userId, certificateId, data) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: { profileCertificates: true },
    });
    if (!user)
        throw new Error("User not found");
    const current = user.profileCertificates || [];
    const idx = current.findIndex((item) => item.id === certificateId);
    if (idx === -1)
        throw new Error("Profile certificate not found");
    const existing = current[idx];
    const updatedItem = {
        ...existing,
        certificateName: data.certificateName.trim(),
        completionDate: data.completionDate,
    };
    const updatedList = [...current];
    updatedList[idx] = updatedItem;
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { profileCertificates: updatedList },
    });
    return updatedItem;
};
exports.updateMyProfileCertificate = updateMyProfileCertificate;
const deleteMyProfileCertificate = async (userId, certificateId) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: { profileCertificates: true },
    });
    if (!user)
        throw new Error("User not found");
    const current = user.profileCertificates || [];
    const exists = current.some((item) => item.id === certificateId);
    if (!exists)
        throw new Error("Profile certificate not found");
    const updatedList = current.filter((item) => item.id !== certificateId);
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { profileCertificates: updatedList },
    });
    return { id: certificateId };
};
exports.deleteMyProfileCertificate = deleteMyProfileCertificate;
const deleteUser = async (id) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { id } });
    if (!user)
        throw new Error("User not found");
    return await prisma_1.prisma.user.delete({
        where: { id },
        select: { id: true, name: true, email: true },
    });
};
exports.deleteUser = deleteUser;
const adminCreateUser = async (userData) => {
    const existingUser = await prisma_1.prisma.user.findUnique({
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
        passwordHash = await bcryptjs_1.default.hash(userData.password, 10);
    }
    return await prisma_1.prisma.user.create({
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
exports.adminCreateUser = adminCreateUser;

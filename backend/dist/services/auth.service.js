"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.registerUser = exports.loginUser = void 0;
const prisma_1 = require("../config/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../config/jwt");
const loginUser = async (email, password) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
        throw new Error("Invalid credentials");
    }
    const match = await bcryptjs_1.default.compare(password, user.passwordHash);
    if (!match)
        throw new Error("Invalid credentials");
    const token = (0, jwt_1.signToken)({ sub: user.id, role: user.role });
    return {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token,
    };
};
exports.loginUser = loginUser;
const registerUser = async ({ name, email, password, }) => {
    const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (existing)
        throw new Error("User already exists");
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    const user = await prisma_1.prisma.user.create({
        data: {
            name,
            email,
            passwordHash,
            role: "student",
            provider: "email",
        },
    });
    return {
        message: "User registered successfully",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};
exports.registerUser = registerUser;
const changePassword = async (userId, currentPassword, newPassword) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.passwordHash) {
        throw new Error("User not found or using social login");
    }
    const match = await bcryptjs_1.default.compare(currentPassword, user.passwordHash);
    if (!match) {
        throw new Error("Current password doesn't match");
    }
    const newPasswordHash = await bcryptjs_1.default.hash(newPassword, 10);
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { passwordHash: newPasswordHash },
    });
    return { message: "Password updated successfully" };
};
exports.changePassword = changePassword;

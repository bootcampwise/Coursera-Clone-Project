"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.deleteMyProfileCertificateItem = exports.updateMyProfileCertificateItem = exports.addMyProfileCertificateItem = exports.getMyProfileCertificateItems = exports.deleteMyEducationItem = exports.updateMyEducationItem = exports.addMyEducationItem = exports.getMyEducationItems = exports.deleteMyWorkExperienceItem = exports.updateMyWorkExperienceItem = exports.addMyWorkExperienceItem = exports.getMyWorkExperience = exports.createUser = exports.updateProfile = exports.updateRole = exports.getMe = exports.getUser = exports.getUsers = exports.syncGoogleUser = void 0;
const user_service_1 = require("../services/user.service");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
exports.syncGoogleUser = (0, asyncHandler_1.default)(async (req, res) => {
    const { email, name, providerId, avatarUrl } = req.body;
    if (!email || !name || !providerId) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    const user = await (0, user_service_1.upsertGoogleUser)({ email, name, providerId, avatarUrl });
    res.status(200).json({
        message: "User synced successfully",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatarUrl: user.avatarUrl,
            role: user.role,
        },
    });
});
exports.getUsers = (0, asyncHandler_1.default)(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const role = req.query.role;
    const result = await (0, user_service_1.getAllUsers)(page, limit, role);
    res.json(result);
});
exports.getUser = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = await (0, user_service_1.getUserById)(id);
    res.json(user);
});
exports.getMe = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const user = await (0, user_service_1.getUserById)(userId);
    res.json(user);
});
exports.updateRole = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    if (!role) {
        res.status(400).json({ message: "Role is required" });
        return;
    }
    const user = await (0, user_service_1.updateUserRole)(id, role);
    res.json(user);
});
exports.updateProfile = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    const { name, avatarUrl } = req.body;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const user = await (0, user_service_1.updateUserProfile)(userId, { name, avatarUrl });
    res.json(user);
});
exports.createUser = (0, asyncHandler_1.default)(async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !role) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    const user = await (0, user_service_1.adminCreateUser)({ name, email, password, role });
    res.status(201).json(user);
});
exports.getMyWorkExperience = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const workExperiences = await (0, user_service_1.getMyWorkExperiences)(userId);
    res.json(workExperiences);
});
exports.addMyWorkExperienceItem = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const { title, company, location, employmentType, startDate, endDate, isCurrent, description, } = req.body;
    if (!title || !company || !startDate) {
        res
            .status(400)
            .json({ message: "title, company and startDate are required" });
        return;
    }
    const created = await (0, user_service_1.addMyWorkExperience)(userId, {
        title,
        company,
        location,
        employmentType,
        startDate,
        endDate,
        isCurrent,
        description,
    });
    res.status(201).json(created);
});
exports.updateMyWorkExperienceItem = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    const { experienceId } = req.params;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const { title, company, location, employmentType, startDate, endDate, isCurrent, description, } = req.body;
    if (!title || !company || !startDate) {
        res
            .status(400)
            .json({ message: "title, company and startDate are required" });
        return;
    }
    const updated = await (0, user_service_1.updateMyWorkExperience)(userId, experienceId, {
        title,
        company,
        location,
        employmentType,
        startDate,
        endDate,
        isCurrent,
        description,
    });
    res.json(updated);
});
exports.deleteMyWorkExperienceItem = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    const { experienceId } = req.params;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const deleted = await (0, user_service_1.deleteMyWorkExperience)(userId, experienceId);
    res.json({ message: "Work experience deleted", ...deleted });
});
exports.getMyEducationItems = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const educations = await (0, user_service_1.getMyEducations)(userId);
    res.json(educations);
});
exports.addMyEducationItem = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const { instituteName, degreeDetails, startDate, endDate } = req.body;
    if (!instituteName || !degreeDetails || !startDate || !endDate) {
        res.status(400).json({
            message: "instituteName, degreeDetails, startDate and endDate are required",
        });
        return;
    }
    const created = await (0, user_service_1.addMyEducation)(userId, {
        instituteName,
        degreeDetails,
        startDate,
        endDate,
    });
    res.status(201).json(created);
});
exports.updateMyEducationItem = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    const { educationId } = req.params;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const { instituteName, degreeDetails, startDate, endDate } = req.body;
    if (!instituteName || !degreeDetails || !startDate || !endDate) {
        res.status(400).json({
            message: "instituteName, degreeDetails, startDate and endDate are required",
        });
        return;
    }
    const updated = await (0, user_service_1.updateMyEducation)(userId, educationId, {
        instituteName,
        degreeDetails,
        startDate,
        endDate,
    });
    res.json(updated);
});
exports.deleteMyEducationItem = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    const { educationId } = req.params;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const deleted = await (0, user_service_1.deleteMyEducation)(userId, educationId);
    res.json({ message: "Education deleted", ...deleted });
});
exports.getMyProfileCertificateItems = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const certificates = await (0, user_service_1.getMyProfileCertificates)(userId);
    res.json(certificates);
});
exports.addMyProfileCertificateItem = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const { certificateName, completionDate } = req.body;
    if (!certificateName || !completionDate) {
        res.status(400).json({
            message: "certificateName and completionDate are required",
        });
        return;
    }
    const created = await (0, user_service_1.addMyProfileCertificate)(userId, {
        certificateName,
        completionDate,
    });
    res.status(201).json(created);
});
exports.updateMyProfileCertificateItem = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    const { certificateId } = req.params;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const { certificateName, completionDate } = req.body;
    if (!certificateName || !completionDate) {
        res.status(400).json({
            message: "certificateName and completionDate are required",
        });
        return;
    }
    const updated = await (0, user_service_1.updateMyProfileCertificate)(userId, certificateId, {
        certificateName,
        completionDate,
    });
    res.json(updated);
});
exports.deleteMyProfileCertificateItem = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    const { certificateId } = req.params;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const deleted = await (0, user_service_1.deleteMyProfileCertificate)(userId, certificateId);
    res.json({ message: "Profile certificate deleted", ...deleted });
});
exports.deleteUserById = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = await (0, user_service_1.deleteUser)(id);
    res.json({ message: "User deleted successfully", user });
});

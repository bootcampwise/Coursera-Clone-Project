"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const requireRole = (allowedRoles) => (req, res, next) => {
    const userRole = req.user?.role?.toLowerCase();
    const normalizedAllowedRoles = allowedRoles.map((r) => r.toLowerCase());
    if (normalizedAllowedRoles.includes("admin")) {
        normalizedAllowedRoles.push("administrator");
    }
    if (!userRole || !normalizedAllowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};
exports.requireRole = requireRole;
exports.default = exports.requireRole;

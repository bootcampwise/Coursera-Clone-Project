import { Request, Response, NextFunction } from "express";

export const requireRole =
  (allowedRoles: string[]) =>
  (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const userRole = req.user?.role?.toLowerCase();

    // Normalize allowed roles
    const normalizedAllowedRoles = allowedRoles.map((r) => r.toLowerCase());

    // If "admin" is allowed, also allow "administrator"
    if (normalizedAllowedRoles.includes("admin")) {
      normalizedAllowedRoles.push("administrator");
    }

    if (!userRole || !normalizedAllowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };

export default requireRole;

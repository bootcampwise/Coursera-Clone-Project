import { Request, Response, NextFunction } from "express";

export const requireRole =
  (roles: string[]) =>
  (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const userRole = req.user?.role?.toLowerCase();
    const normalizedRoles = roles.map((r) => r.toLowerCase());

    if (!userRole || !normalizedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };

export default requireRole;
